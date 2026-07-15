/* ╔══════════════════════════════════════════════╗
   ║  Meta Pixel — conversion tracking for Meta (FB/IG) ads         ║
   ╚══════════════════════════════════════════════╝ */

/* Your Pixel ID from Meta Events Manager (a 15-16 digit number).
   It ships to the browser by design, so it is not a secret.
   Until a real ID is set here the pixel stays off and every
   trackMeta() call across the site is a silent no-op. */
const META_PIXEL_ID = 'YOUR_PIXEL_ID';

(function () {
  if (!/^\d{15,16}$/.test(META_PIXEL_ID)) {
    console.warn('[meta-pixel] No Pixel ID set in pixel.js — ad tracking is off.');
    window.trackMeta = function () {};
    return;
  }

  /* Standard Meta bootstrap snippet: defines fbq() and queues calls
     until fbevents.js finishes loading. */
  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
    n.queue = []; t = b.createElement(e); t.async = !0; t.src = v;
    s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  fbq('init', META_PIXEL_ID);
  fbq('track', 'PageView');

  /* Every content_ids value passed here must match an `id` column in
     catalog.csv, otherwise dynamic product ads silently match nothing. */
  window.trackMeta = function (event, params) {
    try {
      fbq('track', event, params);
    } catch (err) {
      console.warn('[meta-pixel] track failed:', err);
    }
  };
})();
