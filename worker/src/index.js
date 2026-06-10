/* dailystoptoshop - Payments API (Cloudflare Worker)
   Endpoints: /api/order  /api/verify  /api/webhook

   Secrets (set via `wrangler secret put`):
     RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, RAZORPAY_WEBHOOK_SECRET,
     RESEND_API_KEY, SHEETS_WEBAPP_URL, SHEETS_TOKEN
   Vars (wrangler.toml): ALLOWED_ORIGIN, ORDER_EMAIL_TO, ORDER_EMAIL_FROM
*/

// TRUSTED PRODUCT CATALOGUE (server-side source of truth).
// Mirror of the prices in main.js. NEVER trust client-sent prices.
const CATALOGUE = {
  'stanley-quencher-flowttls': { name: 'Stanley x Flowttls Quencher ProTour Tumbler', price: 1800 },
  'black-cat':                 { name: 'Black Cat Plushie',    price: 725 },
  'happy-puppy':               { name: 'Happy Puppy Plushie',  price: 725 },
  'cute-rabbit':               { name: 'Cute Rabbit Plushie',  price: 725 },
  'sleeping-bear':             { name: 'Sleeping Bear Plushie', price: 725 }
};

const FREE_SHIPPING_THRESHOLD = 999;
// TODO: confirm the real shipping fee with the business. Placeholder = 49 INR.
const SHIPPING_FEE = 49;
const CURRENCY = 'INR';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders(env) });

    try {
      if (path === '/api/order' && request.method === 'POST') return await handleCreateOrder(request, env);
      if (path === '/api/verify' && request.method === 'POST') return await handleVerify(request, env);
      if (path === '/api/webhook' && request.method === 'POST') return await handleWebhook(request, env);
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
  const total = subtotal + shipping;

  const d = body.delivery || {};
  for (const f of ['name', 'phone', 'address', 'pincode']) {
    if (!d[f] || String(d[f]).trim().length === 0) return json({ error: `Missing delivery field: ${f}` }, 400, env);
  }

  const notes = {
    name: String(d.name).slice(0, 120),
    phone: String(d.phone).slice(0, 30),
    email: String(d.email || '').slice(0, 120),
    address: String(d.address).slice(0, 480),
    pincode: String(d.pincode).slice(0, 12),
    items: JSON.stringify(lineItems).slice(0, 480),
    subtotal: String(subtotal),
    shipping: String(shipping)
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
  return json({ orderId: order.id, amount: order.amount, currency: order.currency, keyId: env.RAZORPAY_KEY_ID, summary: { subtotal, shipping, total } }, 200, env);
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
  return { 'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400' };
}

function json(obj, status, env) { return new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json', ...corsHeaders(env) } }); }
