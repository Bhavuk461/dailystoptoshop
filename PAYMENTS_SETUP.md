# dailystoptoshop - Payments & Notifications Setup

Cloudflare Worker backend (`worker/`) + Google Apps Script (`apps-script/Code.gs`) powering Razorpay checkout, order email, and Google Sheet logging. Static front end stays on GitHub Pages; Cloudflare routes `dailystoptoshop.com/api/*` to the Worker.

## Architecture
1. Front end collects cart + delivery details -> `POST /api/order`.
2. Worker recomputes amount server-side (never trusts client prices), creates Razorpay order, returns `orderId` + public `keyId`.
3. Razorpay Checkout opens; on completion front end calls `POST /api/verify`. Cart clears only if verified.
4. Razorpay calls `POST /api/webhook` (`payment.captured`) - source of truth. Worker verifies signature, emails via Resend, appends Sheet row.

## 1. Regenerate the Razorpay live key secret (REQUIRED)
A previous live secret was exposed and must be considered compromised. Razorpay Dashboard: Settings > API Keys > Regenerate Live Keys. Use the new values only as Worker secrets. Never commit them.

## 2. Deploy the Worker
```bash
cd worker
npm i -g wrangler
wrangler login
wrangler deploy
wrangler secret put RAZORPAY_KEY_ID
wrangler secret put RAZORPAY_KEY_SECRET
wrangler secret put RAZORPAY_WEBHOOK_SECRET
wrangler secret put RESEND_API_KEY
wrangler secret put SHEETS_WEBAPP_URL
wrangler secret put SHEETS_TOKEN
```
Confirm route `dailystoptoshop.com/api/*` attached and DNS proxied (orange cloud).

## 3. Resend email
Verify domain `dailystoptoshop.com` in Resend (add DKIM/SPF in Cloudflare DNS), create API key -> `RESEND_API_KEY`. From `orders@dailystoptoshop.com`, to `Connect@dailystoptoshop.com`.

## 4. Google Sheet (Apps Script)
Sheet > Extensions > Apps Script, paste `apps-script/Code.gs`. Script Properties: `SHEETS_TOKEN`. Deploy as Web app (execute as Me, access Anyone). `/exec` URL -> `SHEETS_WEBAPP_URL`.

## 5. Razorpay webhook
Dashboard > Settings > Webhooks: URL `https://dailystoptoshop.com/api/webhook`, event `payment.captured`, secret -> `RAZORPAY_WEBHOOK_SECRET`.

## 6. Test
Place a small live order; confirm payment, email at Connect@, and a new Sheet row.

## Notes
- Shipping fee under INR 999 is a placeholder (INR 49) in `worker/src/index.js` - confirm real value (TODO there).
- No secrets committed; live values are Worker secrets / Apps Script properties.
