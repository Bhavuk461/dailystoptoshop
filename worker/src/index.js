/* dailystoptoshop - API (Cloudflare Worker)
   Endpoints:
     Payments:  /api/order  /api/verify  /api/webhook
     Reviews:   /api/reviews (GET/POST)  /api/reviews/:id/like (POST)  /api/reviews/:id (DELETE)
     Spin Wheel:/api/wheel-email

   Secrets (set via `wrangler secret put`):
     RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, RAZORPAY_WEBHOOK_SECRET,
     RESEND_API_KEY, SHEETS_WEBAPP_URL, SHEETS_TOKEN
   Vars (wrangler.toml): ALLOWED_ORIGIN, ORDER_EMAIL_TO, ORDER_EMAIL_FROM, GOOGLE_CLIENT_ID
   Bindings: DB (D1 — dailystoptoshop-reviews)
*/

// TRUSTED PRODUCT CATALOGUE (server-side source of truth).
// Mirror of the prices in main.js. NEVER trust client-sent prices.
const CATALOGUE = {
  'stanley-quencher-flowttls': { name: 'Stanley x Flowttls Quencher ProTour Tumbler', price: 1800 },
  'black-cat':                 { name: 'Black Cat Plushie',    price: 725 },
  'happy-puppy':               { name: 'Happy Puppy Plushie',  price: 725 },
  'cute-rabbit':               { name: 'Cute Rabbit Plushie',  price: 725 },
  'sleeping-bear':             { name: 'Sleeping Bear Plushie', price: 725 },
  'owala-midnight-garden':     { name: 'Owala | Midnight Garden | FreeSip - 800ml | 27oz', price: 1499 },
  'owala-cherry-blossom':      { name: 'Owala | Cherry Blossom | FreeSip - 950ml | 32oz', price: 1599 },
  'owala-cherry-special':      { name: 'Owala | Cherry Special Edition | FreeSip - 950ml | 32oz', price: 1599 },
  'owala-flower-crown':        { name: 'Owala | Flower Crown | FreeSip - 950ml | 32oz', price: 1599 }
};

const FREE_SHIPPING_THRESHOLD = 999;
// TODO: confirm the real shipping fee with the business. Placeholder = 49 INR.
const SHIPPING_FEE = 49;
const CURRENCY = 'INR';

// Valid product IDs for review validation
const VALID_PRODUCT_IDS = new Set(Object.keys(CATALOGUE));

// Google JWT public keys cache
let googleKeysCache = null;
let googleKeysCacheExpiry = 0;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders(env) });

    try {
      // Payment endpoints
      if (path === '/api/order' && request.method === 'POST') return await handleCreateOrder(request, env);
      if (path === '/api/verify' && request.method === 'POST') return await handleVerify(request, env);
      if (path === '/api/webhook' && request.method === 'POST') return await handleWebhook(request, env);

      // Spin the Wheel — email capture
      if (path === '/api/wheel-email' && request.method === 'POST') return await handleWheelEmail(request, env);

      // Review endpoints
      if (path === '/api/reviews' && request.method === 'GET') return await handleGetReviews(request, env);
      if (path === '/api/reviews' && request.method === 'POST') return await handlePostReview(request, env);

      // /api/reviews/:id/like and /api/reviews/:id (DELETE)
      const likeMatch = path.match(/^\/api\/reviews\/([a-f0-9-]+)\/like$/);
      if (likeMatch && request.method === 'POST') return await handleLikeReview(likeMatch[1], env);

      const deleteMatch = path.match(/^\/api\/reviews\/([a-f0-9-]+)$/);
      if (deleteMatch && request.method === 'DELETE') return await handleDeleteReview(deleteMatch[1], request, env);

      return json({ error: 'Not found' }, 404, env);
    } catch (err) {
      console.error('Unhandled error:', err && err.stack ? err.stack : err);
      return json({ error: 'Internal error' }, 500, env);
    }
  }
};

async function handleCreateOrder(request, env) {
  const body = await request.json().catch(() => null);
  if (!body || !Array.isArray(body.items) || body.items.length === 0) return json({ error: 'Cart is empty or invalid' }, 400, env);

  const lineItems = [];
  let subtotal = 0;
  for (const item of body.items) {
    const product = CATALOGUE[item.productId];
    const qty = parseInt(item.quantity, 10);
    if (!product || !Number.isInteger(qty) || qty < 1 || qty > 50) return json({ error: `Invalid cart item: ${item && item.productId}` }, 400, env);
    const lineTotal = product.price * qty;
    subtotal += lineTotal;
    lineItems.push({ productId: item.productId, name: product.name, price: product.price, quantity: qty, lineTotal });
  }

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

  // Apply spin-the-wheel discount if provided (1–10% only, server-validated range)
  const d = body.delivery || {};
  const rawDiscountPct = parseFloat(d.discount_pct || 0);
  const discountPct = (Number.isFinite(rawDiscountPct) && rawDiscountPct >= 1 && rawDiscountPct <= 10)
    ? rawDiscountPct : 0;
  const discountAmt = discountPct > 0 ? Math.round(subtotal * discountPct / 100) : 0;
  const total = Math.max(1, subtotal + shipping - discountAmt); // Razorpay min = ₹1

  for (const f of ['name', 'phone', 'address', 'pincode']) {
    if (!d[f] || String(d[f]).trim().length === 0) return json({ error: `Missing delivery field: ${f}` }, 400, env);
  }
  if (!/^[0-9]{6}$/.test(d.pincode)) {
    return json({ error: 'Pincode must be exactly 6 digits' }, 400, env);
  }

  const notes = {
    name: String(d.name).slice(0, 120),
    phone: String(d.phone).slice(0, 30),
    email: String(d.email || '').slice(0, 120),
    address: String(d.address).slice(0, 480),
    pincode: String(d.pincode).slice(0, 12),
    items: JSON.stringify(lineItems).slice(0, 480),
    subtotal: String(subtotal),
    shipping: String(shipping),
    discount_pct: String(discountPct),
    discount_amt: String(discountAmt)
  };

  const auth = 'Basic ' + btoa(`${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`);
  const rzpRes = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: { 'Authorization': auth, 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: total * 100, currency: CURRENCY, receipt: `rcpt_${Date.now()}`, notes })
  });

  if (!rzpRes.ok) {
    console.error('Razorpay order creation failed:', rzpRes.status, await rzpRes.text());
    return json({ error: 'Could not create order' }, 502, env);
  }

  const order = await rzpRes.json();
  return json({ orderId: order.id, amount: order.amount, currency: order.currency, keyId: env.RAZORPAY_KEY_ID, summary: { subtotal, shipping, discountPct, discountAmt, total } }, 200, env);
}

async function handleVerify(request, env) {
  const body = await request.json().catch(() => null);
  if (!body) return json({ error: 'Invalid body' }, 400, env);
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) return json({ error: 'Missing fields' }, 400, env);
  const expected = await hmacSha256Hex(env.RAZORPAY_KEY_SECRET, `${razorpay_order_id}|${razorpay_payment_id}`);
  const valid = timingSafeEqual(expected, razorpay_signature);
  return json({ verified: valid }, valid ? 200 : 400, env);
}

async function handleWebhook(request, env) {
  const raw = await request.text();
  const signature = request.headers.get('X-Razorpay-Signature') || '';
  const expected = await hmacSha256Hex(env.RAZORPAY_WEBHOOK_SECRET, raw);
  if (!timingSafeEqual(expected, signature)) { console.warn('Webhook signature mismatch'); return new Response('invalid signature', { status: 401 }); }

  let payload;
  try { payload = JSON.parse(raw); } catch { return new Response('bad json', { status: 400 }); }
  if (payload.event !== 'payment.captured') return new Response('ignored', { status: 200 });

  const payment = payload.payload && payload.payload.payment && payload.payload.payment.entity;
  const notes = (payment && payment.notes) || {};
  let items = [];
  try { items = JSON.parse(notes.items || '[]'); } catch { items = []; }

  const subtotal = Number(notes.subtotal || 0);
  const shipping = Number(notes.shipping || 0);
  const total = (payment && payment.amount ? payment.amount / 100 : subtotal + shipping);

  const order = {
    orderId: payment && payment.order_id, paymentId: payment && payment.id,
    items, subtotal, shipping, total,
    name: notes.name || '', phone: notes.phone || '', email: notes.email || '',
    address: notes.address || '', pincode: notes.pincode || ''
  };

  const results = await Promise.allSettled([sendOrderEmail(order, env), appendToSheet(order, env)]);
  results.forEach((r, i) => { if (r.status === 'rejected') console.error(`Notification ${i} failed:`, r.reason); });
  return new Response('ok', { status: 200 });
}

async function sendOrderEmail(order, env) {
  const itemsText = order.items.map(i => `  - ${i.name} x${i.quantity} = INR ${i.lineTotal}`).join('\n');
  const itemsHtml = order.items.map(i => `<tr><td>${esc(i.name)}</td><td align="center">${i.quantity}</td><td align="right">&#8377;${i.lineTotal}</td></tr>`).join('');
  const text = `New order received!\n\nOrder ID: ${order.orderId}\nPayment ID: ${order.paymentId}\n\nItems:\n${itemsText}\n\nSubtotal: INR ${order.subtotal}\nShipping: INR ${order.shipping}\nTotal:    INR ${order.total}\n\nDeliver to:\n  ${order.name}\n  ${order.phone}\n  ${order.email}\n  ${order.address}\n  Pincode: ${order.pincode}`;
  const html = `<h2>New order received</h2><p><strong>Order ID:</strong> ${esc(order.orderId)}<br><strong>Payment ID:</strong> ${esc(order.paymentId)}</p><table cellpadding="6" border="1" style="border-collapse:collapse"><tr><th align="left">Item</th><th>Qty</th><th>Line total</th></tr>${itemsHtml}</table><p>Subtotal: &#8377;${order.subtotal}<br>Shipping: &#8377;${order.shipping}<br><strong>Total: &#8377;${order.total}</strong></p><h3>Delivery details</h3><p>${esc(order.name)}<br>${esc(order.phone)}<br>${esc(order.email)}<br>${esc(order.address)}<br>Pincode: ${esc(order.pincode)}</p>`;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: env.ORDER_EMAIL_FROM, to: [env.ORDER_EMAIL_TO], subject: `New order ${order.orderId} - INR ${order.total}`, text, html })
  });
  if (!res.ok) throw new Error(`Resend failed: ${res.status} ${await res.text()}`);
}

async function appendToSheet(order, env) {
  if (!env.SHEETS_WEBAPP_URL) return;
  const res = await fetch(env.SHEETS_WEBAPP_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: env.SHEETS_TOKEN, order }) });
  if (!res.ok) throw new Error(`Sheets append failed: ${res.status} ${await res.text()}`);
}

// POST /api/wheel-email  { email, pct }
// Sends a notification to connect@dailystoptoshop.com with the customer's spin result.
async function handleWheelEmail(request, env) {
  const body = await request.json().catch(() => null);
  if (!body || !body.email || !body.pct) return json({ error: 'Missing email or pct' }, 400, env);

  const email = String(body.email).trim().slice(0, 200);
  const pct   = parseFloat(body.pct);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'Invalid email' }, 400, env);
  if (!Number.isFinite(pct) || pct < 1 || pct > 10) return json({ error: 'Invalid pct' }, 400, env);

  const subject = `🎡 New spin result — ${email} won ${pct}% OFF`;
  const text    = `A visitor spun the wheel and won a discount!\n\nEmail: ${email}\nDiscount: ${pct}% OFF\n\nThis discount will be auto-applied to their next order this session.`;
  const html    = `
    <h2 style="color:#FF5D8F;">🎡 New Spin the Wheel Result</h2>
    <p>A visitor just spun the wheel on <strong>dailystoptoshop</strong>!</p>
    <table cellpadding="8" style="border-collapse:collapse;margin-top:12px;">
      <tr><td style="font-weight:600;">Email</td><td>${esc(email)}</td></tr>
      <tr><td style="font-weight:600;">Discount Won</td><td style="color:#FF5D8F;font-size:20px;font-weight:700;">${pct}% OFF</td></tr>
    </table>
    <p style="color:#85737B;font-size:13px;margin-top:16px;">The discount is auto-applied to their session purchase.</p>
  `;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: env.ORDER_EMAIL_FROM,
        to: ['connect@dailystoptoshop.com'],
        reply_to: email,
        subject, text, html
      })
    });
    if (!res.ok) {
      console.error('Resend wheel email failed:', res.status, await res.text());
      return json({ ok: false }, 500, env);
    }
  } catch (err) {
    console.error('Wheel email error:', err);
    return json({ ok: false }, 500, env);
  }

  return json({ ok: true }, 200, env);
}


// ───────────────────────────────────────────
// REVIEW ENDPOINTS
// ───────────────────────────────────────────

// GET /api/reviews?product_id=xxx
async function handleGetReviews(request, env) {
  const url = new URL(request.url);
  const productId = url.searchParams.get('product_id');
  if (!productId || !VALID_PRODUCT_IDS.has(productId)) {
    return json({ error: 'Invalid or missing product_id' }, 400, env);
  }
  const { results } = await env.DB.prepare(
    'SELECT id, product_id, user_name, user_pic, rating, body, likes, created_at FROM reviews WHERE product_id = ? ORDER BY created_at DESC'
  ).bind(productId).all();
  return json({ reviews: results || [] }, 200, env);
}

// POST /api/reviews  { product_id, rating, body } + Authorization: Bearer <google_id_token>
async function handlePostReview(request, env) {
  const user = await verifyGoogleToken(request, env);
  if (!user) return json({ error: 'Invalid or missing Google token' }, 401, env);

  const body = await request.json().catch(() => null);
  if (!body) return json({ error: 'Invalid JSON' }, 400, env);

  const productId = body.product_id;
  const rating = parseInt(body.rating, 10);
  const reviewBody = typeof body.body === 'string' ? body.body.trim().slice(0, 1000) : '';

  if (!productId || !VALID_PRODUCT_IDS.has(productId)) return json({ error: 'Invalid product_id' }, 400, env);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) return json({ error: 'Rating must be 1-5' }, 400, env);
  if (reviewBody.length < 10) return json({ error: 'Review must be at least 10 characters' }, 400, env);

  const id = generateUUID();
  try {
    await env.DB.prepare(
      'INSERT INTO reviews (id, product_id, user_sub, user_name, user_pic, rating, body) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).bind(id, productId, user.sub, esc(user.name), user.picture, rating, esc(reviewBody)).run();
  } catch (err) {
    // UNIQUE constraint violation = user already reviewed this product
    if (err.message && err.message.includes('UNIQUE')) {
      return json({ error: 'You have already reviewed this product' }, 409, env);
    }
    throw err;
  }

  return json({
    review: { id, product_id: productId, user_name: esc(user.name), user_pic: user.picture, rating, body: esc(reviewBody), likes: 0, created_at: new Date().toISOString() }
  }, 201, env);
}

// POST /api/reviews/:id/like  (anonymous)
async function handleLikeReview(reviewId, env) {
  const result = await env.DB.prepare(
    'UPDATE reviews SET likes = likes + 1 WHERE id = ?'
  ).bind(reviewId).run();
  if (!result.meta.changes) return json({ error: 'Review not found' }, 404, env);
  return json({ ok: true }, 200, env);
}

// DELETE /api/reviews/:id  + Authorization: Bearer <google_id_token>
async function handleDeleteReview(reviewId, request, env) {
  const user = await verifyGoogleToken(request, env);
  if (!user) return json({ error: 'Invalid or missing Google token' }, 401, env);

  // Only the author can delete their own review
  const result = await env.DB.prepare(
    'DELETE FROM reviews WHERE id = ? AND user_sub = ?'
  ).bind(reviewId, user.sub).run();
  if (!result.meta.changes) return json({ error: 'Review not found or not yours' }, 404, env);
  return json({ ok: true }, 200, env);
}


// ───────────────────────────────────────────
// GOOGLE JWT VERIFICATION
// ───────────────────────────────────────────

async function verifyGoogleToken(request, env) {
  const authHeader = request.headers.get('Authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return null;

  // Check if this is a JWT (3 dot-separated parts) or an access token
  const parts = token.split('.');
  if (parts.length === 3) {
    // Try JWT ID token verification
    try {
      const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));

      const now = Math.floor(Date.now() / 1000);
      if (payload.exp < now) return null;
      if (payload.aud !== env.GOOGLE_CLIENT_ID) return null;
      if (payload.iss !== 'accounts.google.com' && payload.iss !== 'https://accounts.google.com') return null;

      const keys = await getGooglePublicKeys();
      const key = keys[header.kid];
      if (!key) return null;

      const cryptoKey = await crypto.subtle.importKey(
        'jwk', key, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']
      );
      const signatureBytes = base64UrlDecode(parts[2]);
      const dataBytes = new TextEncoder().encode(parts[0] + '.' + parts[1]);
      const valid = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', cryptoKey, signatureBytes, dataBytes);
      if (!valid) return null;

      return { sub: payload.sub, name: payload.name || 'Anonymous', picture: payload.picture || '' };
    } catch (err) {
      console.error('JWT verification failed:', err);
      return null;
    }
  }

  // Fallback: treat as an access token — validate via Google's userinfo endpoint
  try {
    const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) return null;
    const info = await res.json();
    if (!info.sub) return null;
    return { sub: info.sub, name: info.name || 'Anonymous', picture: info.picture || '' };
  } catch (err) {
    console.error('Access token verification failed:', err);
    return null;
  }
}

async function getGooglePublicKeys() {
  if (googleKeysCache && Date.now() < googleKeysCacheExpiry) return googleKeysCache;
  const res = await fetch('https://www.googleapis.com/oauth2/v3/certs');
  if (!res.ok) throw new Error('Failed to fetch Google public keys');
  const data = await res.json();
  const keysMap = {};
  for (const key of data.keys) keysMap[key.kid] = key;
  googleKeysCache = keysMap;
  googleKeysCacheExpiry = Date.now() + 3600_000; // Cache for 1 hour
  return keysMap;
}

function base64UrlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  const binary = atob(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

function generateUUID() {
  return crypto.randomUUID();
}

async function hmacSha256Hex(secret, message) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, '0')).join('');
}

function timingSafeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

function corsHeaders(env) {
  return { 'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*', 'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization', 'Access-Control-Max-Age': '86400' };
}

function json(obj, status, env) { return new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json', ...corsHeaders(env) } }); }
