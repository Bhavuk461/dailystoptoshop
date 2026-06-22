/* ╔══════════════════════════════════════════════════════════════╗
   ║  dailystoptoshop — Main JavaScript                          ║
   ║  Cart, navigation, animations, Razorpay, particles,         ║
   ║  product reviews (Google Sign-In + D1)                      ║
   ╚══════════════════════════════════════════════════════════════╝ */

// ───────────────────────────────────────────
// 1. PRODUCT DATA
// ───────────────────────────────────────────
const products = [
  {
    id: 'stanley-quencher-flowttls',
    name: 'Stanley x Flowttls Quencher ProTour Tumbler',
    shortName: 'Flowttls Quencher',
    price: 1800,
    originalPrice: 2000,
    currency: 'INR',
    images: [
      './products/stanley/1.webp',
      './products/stanley/2.webp',
      './products/stanley/3.webp',
      './products/stanley/4.webp'
    ],
    video: '5KdNI6QArig',
    badge: '🔥 Limited Edition',
    description: '40oz / 1.18L · All Day Hydration · Bow Straw Topper',
    features: [
      'Double-wall vacuum insulation',
      'Keeps cold 11hrs, iced 2 days',
      'Exclusive Flowttls character design',
      'Pink bow straw topper included',
      'Dishwasher safe'
    ],
    specs: {
      'Brand': 'Stanley x Flowttls',
      'Material': 'Stainless Steel',
      'Bottle Type': 'Quencher Tumbler',
      'Colour': 'Flowttls Limited Edition',
      'Capacity': '40oz / 1.18L'
    },
    about: [
      '🔥❄️ DOUBLE-WALL VACUUM INSULATION — keeps drinks cold for 11 hours and iced for 2 whole days 🧊',
      '💧 BIG 40oz / 1.18L CAPACITY — all-day hydration without constant refills 🚰',
      '🎀 EXCLUSIVE FLOWTTLS DESIGN — limited-edition character art with an adorable pink bow straw topper 💖',
      '🧼 DISHWASHER SAFE — easy cleanup so it\'s ready for tomorrow\'s adventure 🌟'
    ],
    inStock: true
  },
  {
    id: 'black-cat',
    name: 'Black Cat Water Bottle',
    shortName: 'Black Cat',
    price: 725,
    originalPrice: 899,
    currency: 'INR',
    images: [
      './products/black-cat/1.webp',
      './products/black-cat/2.webp',
      './products/black-cat/3.webp',
      './products/black-cat/4.webp',
      './products/black-cat/5.webp'
    ],
    badge: '🐱 New Drop',
    description: 'Sleek black-cat 750ml insulated steel bottle 🖤',
    features: [
      '🔥 Hot 12 hrs · ❄️ Cold 24 hrs',
      '✨ Food-grade 304 stainless steel',
      '🔒 100% leakproof screw cap',
      '🎀 Handy carry handle strap'
    ],
    specs: {
      'Brand': 'dailystoptoshop',
      'Material': 'Stainless Steel',
      'Bottle Type': 'Water Bottle',
      'Colour': 'Black Cat',
      'Capacity': '750 Millilitres'
    },
    about: [
      '🔥❄️ SUPERIOR INSULATION — Keeps beverages hot for 12 hours and cold for 24 hours, perfect for coffee, tea, or icy drinks throughout the day ☕🧊',
      '💧 LARGE 750ml CAPACITY — Holds approximately 750ml of your favourite beverage, so you stay hydrated all day at the gym, office, school, or while travelling 🎒',
      '✨ FOOD GRADE 304 STAINLESS STEEL — Constructed with BPA-free, non-toxic stainless steel that is safe for daily use and built to last 💪',
      '🔒 100% LEAKPROOF DESIGN — Secure screw cap with a tight seal for mess-free carrying in your bag, zero spills or leaks 🙌',
      '🎀 ULTRA-PORTABLE HANDLE — Sturdy carry handle strap for easy on-the-go sips, perfect for kids, girls, teens, and adults alike 💖'
    ],
    video: './assets/vids/black-cat.mp4',
    inStock: true
  },
  {
    id: 'happy-puppy',
    name: 'Happy Puppy (Cake Dog) Water Bottle',
    shortName: 'Happy Puppy',
    price: 725,
    originalPrice: 899,
    currency: 'INR',
    images: [
      './products/happy-puppy/1.webp',
      './products/happy-puppy/2.webp',
      './products/happy-puppy/3.webp',
      './products/happy-puppy/4.webp',
      './products/happy-puppy/5.webp'
    ],
    badge: '🐶 New Drop',
    description: 'Cheerful cake-pup 750ml insulated steel bottle 🍰',
    features: [
      '🔥 Hot 12 hrs · ❄️ Cold 24 hrs',
      '✨ Food-grade 304 stainless steel',
      '🔒 100% leakproof screw cap',
      '🎀 Handy carry handle strap'
    ],
    specs: {
      'Brand': 'dailystoptoshop',
      'Material': 'Stainless Steel',
      'Bottle Type': 'Water Bottle',
      'Colour': 'Happy Puppy (Cake Dog)',
      'Capacity': '750 Millilitres'
    },
    about: [
      '🔥❄️ SUPERIOR INSULATION — Keeps beverages hot for 12 hours and cold for 24 hours, perfect for coffee, tea, or icy drinks throughout the day ☕🧊',
      '💧 LARGE 750ml CAPACITY — Holds approximately 750ml of your favourite beverage, so you stay hydrated all day at the gym, office, school, or while travelling 🎒',
      '✨ FOOD GRADE 304 STAINLESS STEEL — Constructed with BPA-free, non-toxic stainless steel that is safe for daily use and built to last 💪',
      '🔒 100% LEAKPROOF DESIGN — Secure screw cap with a tight seal for mess-free carrying in your bag, zero spills or leaks 🙌',
      '🎀 ULTRA-PORTABLE HANDLE — Sturdy carry handle strap for easy on-the-go sips, perfect for kids, girls, teens, and adults alike 💖'
    ],
    video: './assets/vids/happy-puppy.mp4',
    inStock: true
  },
  {
    id: 'cute-rabbit',
    name: 'Cute Rabbit Water Bottle',
    shortName: 'Cute Rabbit',
    price: 725,
    originalPrice: 899,
    currency: 'INR',
    images: [
      './products/cute-rabbit/1.webp',
      './products/cute-rabbit/2.webp',
      './products/cute-rabbit/3.webp',
      './products/cute-rabbit/4.webp',
      './products/cute-rabbit/5.webp'
    ],
    badge: '🐰 New Drop',
    description: 'Adorable red rabbit 750ml insulated steel bottle ❤️',
    features: [
      '🔥 Hot 12 hrs · ❄️ Cold 24 hrs',
      '✨ Food-grade 304 stainless steel',
      '🔒 100% leakproof screw cap',
      '🎀 Handy carry handle strap'
    ],
    specs: {
      'Brand': 'dailystoptoshop',
      'Material': 'Stainless Steel',
      'Bottle Type': 'Water Bottle',
      'Colour': 'Cute Rabbit (Red)',
      'Capacity': '750 Millilitres'
    },
    about: [
      '🔥❄️ SUPERIOR INSULATION — Keeps beverages hot for 12 hours and cold for 24 hours, perfect for coffee, tea, or icy drinks throughout the day ☕🧊',
      '💧 LARGE 750ml CAPACITY — Holds approximately 750ml of your favourite beverage, so you stay hydrated all day at the gym, office, school, or while travelling 🎒',
      '✨ FOOD GRADE 304 STAINLESS STEEL — Constructed with BPA-free, non-toxic stainless steel that is safe for daily use and built to last 💪',
      '🔒 100% LEAKPROOF DESIGN — Secure screw cap with a tight seal for mess-free carrying in your bag, zero spills or leaks 🙌',
      '🎀 ULTRA-PORTABLE HANDLE — Sturdy carry handle strap for easy on-the-go sips, perfect for kids, girls, teens, and adults alike 💖'
    ],
    inStock: true
  },
  {
    id: 'sleeping-bear',
    name: 'Sleeping Bear (Cake Bear) Water Bottle',
    shortName: 'Sleeping Bear',
    price: 725,
    originalPrice: 899,
    currency: 'INR',
    images: [
      './products/sleeping-bear/1.webp',
      './products/sleeping-bear/2.webp',
      './products/sleeping-bear/3.webp',
      './products/sleeping-bear/4.webp',
      './products/sleeping-bear/5.webp'
    ],
    badge: '🐻 New Drop',
    description: 'Dreamy cake-bear 750ml insulated steel bottle 🍰',
    features: [
      '🔥 Hot 12 hrs · ❄️ Cold 24 hrs',
      '✨ Food-grade 304 stainless steel',
      '🔒 100% leakproof screw cap',
      '🎀 Handy carry handle strap'
    ],
    specs: {
      'Brand': 'dailystoptoshop',
      'Material': 'Stainless Steel',
      'Bottle Type': 'Water Bottle',
      'Colour': 'Sleeping Bear (Cake Bear)',
      'Capacity': '750 Millilitres'
    },
    about: [
      '🔥❄️ SUPERIOR INSULATION — Keeps beverages hot for 12 hours and cold for 24 hours, perfect for coffee, tea, or icy drinks throughout the day ☕🧊',
      '💧 LARGE 750ml CAPACITY — Holds approximately 750ml of your favourite beverage, so you stay hydrated all day at the gym, office, school, or while travelling 🎒',
      '✨ FOOD GRADE 304 STAINLESS STEEL — Constructed with BPA-free, non-toxic stainless steel that is safe for daily use and built to last 💪',
      '🔒 100% LEAKPROOF DESIGN — Secure screw cap with a tight seal for mess-free carrying in your bag, zero spills or leaks 🙌',
      '🎀 ULTRA-PORTABLE HANDLE — Sturdy carry handle strap for easy on-the-go sips, perfect for kids, girls, teens, and adults alike 💖'
    ],
    video: './assets/vids/sleeping-bear.mp4',
    inStock: true
  }
];

// Helper: normalized image list for a product (supports single `image` or `images[]`)
function getProductImages(product) {
  if (Array.isArray(product.images) && product.images.length) return product.images;
  if (product.image) return [product.image];
  return [];
}

function getProductCover(product) {
  const imgs = getProductImages(product);
  return imgs.length ? imgs[0] : '';
}


// ───────────────────────────────────────────
// 2. CART MANAGEMENT
// ───────────────────────────────────────────
const CART_STORAGE_KEY = 'dailystoptoshop_cart';
let cart = [];

function loadCart() {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      cart = JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Failed to load cart from localStorage:', e);
    cart = [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    console.warn('Failed to save cart to localStorage:', e);
  }
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product || !product.inStock) return;

  const existing = cart.find(item => item.productId === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ productId, quantity: 1 });
  }

  saveCart();
  renderCart();
  showToast(`${product.shortName} added to bag! ✦`);
  animateCartBadge();

  // Briefly change button text. Scope to the button: the .product-slider
  // wrapper also carries data-product-id, and an unscoped selector would
  // match it first and overwrite the product images.
  const btn = document.querySelector(`.add-to-cart-btn[data-product-id="${productId}"]`);
  if (btn) {
    btn.textContent = '✓ ADDED!';
    btn.classList.add('added');
    setTimeout(() => {
      btn.textContent = 'ADD TO BAG';
      btn.classList.remove('added');
    }, 1500);
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.productId !== productId);
  saveCart();
  renderCart();
}

function updateQuantity(productId, delta) {
  const item = cart.find(item => item.productId === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart();
  renderCart();
}

function getCartSubtotal() {
  return cart.reduce((total, item) => {
    const product = products.find(p => p.id === item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
}

// Shipping policy mirrors the Cloudflare Worker (worker/src/index.js).
// Keep FREE_SHIPPING_THRESHOLD and SHIPPING_FEE in sync with the Worker.
const FREE_SHIPPING_THRESHOLD = 999;
const SHIPPING_FEE = 49;

function getCartShipping() {
  const subtotal = getCartSubtotal();
  if (subtotal === 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
}

function getCartTotal() {
  return getCartSubtotal() + getCartShipping();
}

function getCartCount() {
  return cart.reduce((count, item) => count + item.quantity, 0);
}

function formatPrice(amount) {
  return '₹' + amount.toLocaleString('en-IN');
}

function renderCart() {
  const cartItemsEl = document.getElementById('cart-items');
  const cartSubtotal = document.getElementById('cart-subtotal');
  const cartTotal = document.getElementById('cart-total');
  const cartCountEl = document.getElementById('cart-count');
  const checkoutBtn = document.getElementById('checkout-btn');

  if (!cartItemsEl) return;

  const count = getCartCount();
  const subtotal = getCartSubtotal();
  const shipping = getCartShipping();
  const total = subtotal + shipping;

  // Update badge
  cartCountEl.textContent = count;
  if (count > 0) {
    cartCountEl.classList.add('has-items');
  } else {
    cartCountEl.classList.remove('has-items');
  }

  // Update totals
  cartSubtotal.textContent = formatPrice(subtotal);
  const cartShipping = document.getElementById('cart-shipping');
  if (cartShipping) cartShipping.textContent = shipping === 0 ? 'FREE' : formatPrice(shipping);

  // Apply spin discount if active
  const cartDiscountRow = document.getElementById('cart-discount-row');
  const cartDiscountAmt = document.getElementById('cart-discount-amount');
  // sessionDiscount is defined in the spin wheel IIFE — read via a global getter
  const activeDiscount = (typeof getActiveSpinDiscount === 'function') ? getActiveSpinDiscount() : null;
  if (activeDiscount && activeDiscount.pct > 0 && count > 0) {
    const discountAmt = Math.round(subtotal * activeDiscount.pct / 100);
    const discountedTotal = Math.max(0, subtotal + shipping - discountAmt);
    if (cartDiscountRow) cartDiscountRow.style.display = '';
    if (cartDiscountAmt) cartDiscountAmt.textContent = `−${formatPrice(discountAmt)}`;
    cartTotal.textContent = formatPrice(discountedTotal);
  } else {
    if (cartDiscountRow) cartDiscountRow.style.display = 'none';
    cartTotal.textContent = formatPrice(total);
  }

  // Enable/disable checkout
  checkoutBtn.disabled = count === 0;

  // Render items
  if (cart.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="cart-empty">
        <p class="cart-empty-icon">🛒</p>
        <p class="cart-empty-text">Your bag is empty</p>
        <p class="cart-empty-sub">Add some fire products!</p>
      </div>
    `;
    return;
  }

  cartItemsEl.innerHTML = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    if (!product) return '';
    return `
      <div class="cart-item">
        <img src="${getProductCover(product)}" alt="${product.name}">
        <div class="cart-item-info">
          <h4>${product.shortName}</h4>
          <p>${formatPrice(product.price)}</p>
        </div>
        <div class="cart-item-actions">
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="updateQuantity('${product.id}', -1)" aria-label="Decrease quantity">−</button>
            <span>${item.quantity}</span>
            <button class="qty-btn" onclick="updateQuantity('${product.id}', 1)" aria-label="Increase quantity">+</button>
          </div>
          <button class="cart-item-remove" onclick="removeFromCart('${product.id}')">Remove</button>
        </div>
      </div>
    `;
  }).join('');
}

function animateCartBadge() {
  const badge = document.getElementById('cart-count');
  badge.classList.remove('bounce');
  // Trigger reflow to restart animation
  void badge.offsetWidth;
  badge.classList.add('bounce');
}


// ───────────────────────────────────────────
// 3. PRODUCT RENDERING
// ───────────────────────────────────────────
function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  grid.innerHTML = products.map(product => {
    const imgs = getProductImages(product);
    const cover = imgs[0] || '';
    const hasVideo = !!product.video;

    // Image slides
    const imageSlidesHtml = imgs.map((src, i) => `
          <div class="slide">
            <img src="${src}" alt="${product.name} — image ${i + 1}" loading="lazy" onclick="openProductModal('${src}')">
          </div>`).join('');

    // Optional video slide (rendered as the final slide)
    const videoSlideHtml = hasVideo
      ? `
          <div class="slide slide-video">
            <div class="video-frame">
              <div class="yt-player" data-video-id="${product.video}"></div>
              <div class="video-shield" aria-hidden="true"></div>
            </div>
          </div>`
      : '';

    const slidesHtml = imageSlidesHtml + videoSlideHtml;

    // Total slide count (images + optional video)
    const slideCount = imgs.length + (hasVideo ? 1 : 0);
    const videoIndex = hasVideo ? imgs.length : -1;

    const dotsHtml = slideCount > 1
      ? `<div class="slider-dots">${Array.from({ length: slideCount }).map((_, i) => `<button class="slider-dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="${i === videoIndex ? 'Go to product video' : 'Go to image ' + (i + 1)}"></button>`).join('')}</div>`
      : '';
    const arrowsHtml = slideCount > 1
      ? `<button class="slider-arrow slider-prev" aria-label="Previous slide">‹</button>
         <button class="slider-arrow slider-next" aria-label="Next slide">›</button>`
      : '';
    return `
    <div class="product-card fade-in">
      <div class="product-image-wrapper product-slider" data-product-id="${product.id}" data-count="${slideCount}" data-video-index="${videoIndex}">
        <div class="slider-track">${slidesHtml}</div>
        ${arrowsHtml}
        ${dotsHtml}
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
      </div>
      <div class="product-info">
        <h3><a class="product-title-link" href="./product.html?id=${product.id}">${product.name}</a></h3>
        <p>${product.description}</p>
        <ul class="product-features">
          ${product.features.map(f => `<li class="feature-item">${f}</li>`).join('')}
        </ul>
        <div class="product-pricing">
          <span class="price">${formatPrice(product.price)}</span>
          ${product.originalPrice ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
        </div>
        <button 
          class="add-to-cart-btn" 
          data-product-id="${product.id}"
          onclick="addToCart('${product.id}')"
          ${!product.inStock ? 'disabled' : ''}
        >
          ${product.inStock ? 'ADD TO BAG' : 'SOLD OUT'}
        </button>
        ${product.inStock ? '<p class="urgency-text">⚡ Only a few left — don\'t sleep on it</p>' : ''}
        <a class="details-link" href="./product.html?id=${product.id}">View full details <span aria-hidden="true">→</span></a>
      </div>
    </div>
  `;
  }).join('');

  setupProductSliders();
}


// ───────────────────────────────────────────
// 3b. YOUTUBE IFRAME API LOADER
// ───────────────────────────────────────────
// Players are created once the API is ready. We queue any players that are
// requested before the API has finished loading.
let ytApiReady = false;
const ytPlayerQueue = [];
const ytPlayers = new WeakMap();      // element -> YT.Player instance
const ytPlayerReady = new WeakMap();  // element -> boolean (player fired onReady)
const ytWantPlay = new WeakMap();     // element -> boolean (slide wants the video playing)

function loadYouTubeApi() {
  if (document.getElementById('youtube-iframe-api')) return;
  const tag = document.createElement('script');
  tag.id = 'youtube-iframe-api';
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);
}

// Called automatically by the YouTube IFrame API once it has loaded.
window.onYouTubeIframeAPIReady = function () {
  ytApiReady = true;
  ytPlayerQueue.splice(0).forEach(createYouTubePlayer);
};

function createYouTubePlayer(el) {
  if (!el || ytPlayers.has(el)) return;
  if (!ytApiReady || typeof YT === 'undefined' || !YT.Player) {
    if (!ytPlayerQueue.includes(el)) ytPlayerQueue.push(el);
    return;
  }

  const videoId = el.getAttribute('data-video-id');
  if (!videoId) return;

  const player = new YT.Player(el, {
    videoId,
    playerVars: {
      autoplay: 1,          // begin loading/playing as soon as possible
      controls: 0,          // hide player controls (also hides bottom logo bar)
      modestbranding: 1,    // minimise YouTube branding
      rel: 0,               // no related videos from other channels
      showinfo: 0,
      fs: 0,                // no fullscreen button
      disablekb: 1,         // disable keyboard control
      iv_load_policy: 3,    // hide video annotations
      playsinline: 1,       // inline playback on mobile (required for autoplay)
      loop: 1,
      playlist: videoId,    // required for loop to work
      mute: 1               // muted so autoplay is allowed by browsers
    },
    events: {
      onReady: (e) => {
        ytPlayerReady.set(el, true);
        try { e.target.mute(); } catch (_) {}
        // If the slide already asked the video to play, honour it now.
        if (ytWantPlay.get(el)) {
          try { e.target.playVideo(); } catch (_) {}
        }
      },
      onStateChange: (e) => {
        // Keep looping reliably even if the loop param is ignored.
        if (e.data === YT.PlayerState.ENDED) {
          try { e.target.seekTo(0); e.target.playVideo(); } catch (_) {}
        }
      }
    }
  });

  ytPlayers.set(el, player);
  ytPlayerReady.set(el, false);
}

function playVideoIn(slider) {
  const el = slider.querySelector('.yt-player');
  if (!el) return;
  // Record intent so onReady can autoplay even if the player isn't ready yet.
  ytWantPlay.set(el, true);
  const player = ytPlayers.get(el);
  if (player && ytPlayerReady.get(el) && typeof player.playVideo === 'function') {
    try { player.mute(); player.playVideo(); } catch (_) {}
  }
}

function stopVideoIn(slider) {
  const el = slider.querySelector('.yt-player');
  if (!el) return;
  ytWantPlay.set(el, false);
  const player = ytPlayers.get(el);
  if (player && ytPlayerReady.get(el) && typeof player.pauseVideo === 'function') {
    try {
      player.pauseVideo();
      if (typeof player.seekTo === 'function') player.seekTo(0);
    } catch (_) {}
  }
}


// ───────────────────────────────────────────
// 3c. PRODUCT IMAGE SLIDER (hover autoplay)
// ───────────────────────────────────────────
function setupProductSliders() {
  const sliders = document.querySelectorAll('.product-slider');

  // Ensure the YouTube API is loaded if any slider has a video slide
  if (document.querySelector('.product-slider .yt-player')) {
    loadYouTubeApi();
  }

  sliders.forEach(slider => {
    const count = parseInt(slider.getAttribute('data-count'), 10) || 0;
    const videoIndex = parseInt(slider.getAttribute('data-video-index'), 10);
    const hasVideo = !Number.isNaN(videoIndex) && videoIndex >= 0;

    // Build the YouTube player for this slider's video slide (if any)
    if (hasVideo) {
      const playerEl = slider.querySelector('.yt-player');
      if (playerEl) createYouTubePlayer(playerEl);
    }

    if (count <= 1) return;

    const track = slider.querySelector('.slider-track');
    const dots = slider.querySelectorAll('.slider-dot');
    const prev = slider.querySelector('.slider-prev');
    const next = slider.querySelector('.slider-next');
    let index = 0;
    let timer = null;

    function goTo(i) {
      const prevIndex = index;
      index = (i + count) % count;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, di) => d.classList.toggle('active', di === index));

      // Start/stop the video as its slide opens/closes
      if (hasVideo) {
        if (index === videoIndex) {
          playVideoIn(slider);
        } else if (prevIndex === videoIndex) {
          stopVideoIn(slider);
        }
      }
    }

    function startAutoplay() {
      stopAutoplay();
      timer = setInterval(() => {
        // Pause autoplay while the video slide is open so it can play fully
        if (hasVideo && index === videoIndex) return;
        // Stop at the final slide instead of looping back to the start.
        if (index >= count - 1) {
          stopAutoplay();
          return;
        }
        goTo(index + 1);
      }, 1400);
    }

    function stopAutoplay() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    // Smooth autoplay on hover, reset to first image on leave
    slider.addEventListener('mouseenter', startAutoplay);
    slider.addEventListener('mouseleave', () => {
      stopAutoplay();
      goTo(0); // returning to image 0 also stops the video
    });

    // Manual controls
    if (prev) prev.addEventListener('click', (e) => { e.stopPropagation(); stopAutoplay(); goTo(index - 1); });
    if (next) next.addEventListener('click', (e) => { e.stopPropagation(); stopAutoplay(); goTo(index + 1); });
    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        stopAutoplay();
        goTo(parseInt(dot.getAttribute('data-index'), 10));
      });
    });

    // Touch swipe support (mobile) — lets users reach every slide,
    // including the video, without relying on hover.
    let touchStartX = 0;
    let touchStartY = 0;
    let touching = false;

    slider.addEventListener('touchstart', (e) => {
      if (!e.touches || !e.touches.length) return;
      touching = true;
      stopAutoplay();
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
      if (!touching) return;
      touching = false;
      const touch = (e.changedTouches && e.changedTouches[0]) || null;
      if (!touch) return;
      const dx = touch.clientX - touchStartX;
      const dy = touch.clientY - touchStartY;
      // Treat as a horizontal swipe only when it's clearly horizontal
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        goTo(dx < 0 ? index + 1 : index - 1);
      }
    }, { passive: true });

    // Stop the video if the card scrolls out of view, but never auto-jump
    // to the video slide on scroll. Reaching the video stays driven by
    // hover autoplay, manual controls, and touch swipe.
    if (hasVideo && 'IntersectionObserver' in window) {
      const vis = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            stopVideoIn(slider);
          }
        });
      }, { threshold: [0, 0.5, 1] });
      vis.observe(slider);
    }

    goTo(0);
  });
}


// ───────────────────────────────────────────
// 4. CART DRAWER
// ───────────────────────────────────────────
function openCart() {
  document.body.classList.add('cart-open');
}

function closeCart() {
  document.body.classList.remove('cart-open');
}

function setupCartDrawer() {
  const cartBtn = document.getElementById('cart-btn');
  const closeCartBtn = document.getElementById('close-cart');
  const overlay = document.getElementById('cart-overlay');

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (overlay) overlay.addEventListener('click', closeCart);
}


// ───────────────────────────────────────────
// 5. NAVIGATION
// ───────────────────────────────────────────
function setupNavigation() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelectorAll('.nav-link');
  let lastScrollY = window.scrollY;
  let ticking = false;

  // Scroll behavior: hide/show nav + scroll spy
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        // Add/remove scrolled state
        if (currentScrollY > 50) {
          navbar.classList.add('nav-scrolled');
        } else {
          navbar.classList.remove('nav-scrolled');
        }

        // Hide/show on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          navbar.classList.add('nav-hidden');
        } else {
          navbar.classList.remove('nav-hidden');
        }

        lastScrollY = currentScrollY;

        // Scroll spy
        updateActiveNavLink();

        ticking = false;
      });
      ticking = true;
    }
  });

  // Hamburger toggle
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navbar.classList.toggle('nav-open');
    });
  }

  // Smooth scroll + close mobile menu on link click.
  // Links that point to another page (e.g. ./index.html#shop on the
  // product detail page) are allowed to navigate normally.
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || !targetId.startsWith('#')) {
        if (hamburger) hamburger.classList.remove('active');
        navbar.classList.remove('nav-open');
        return;
      }
      e.preventDefault();
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        const navHeight = navbar.offsetHeight;
        const top = targetEl.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }

      // Close mobile menu
      hamburger.classList.remove('active');
      navbar.classList.remove('nav-open');
    });
  });

  // Smooth scroll for hero CTA
  const heroCta = document.querySelector('.hero-cta');
  if (heroCta) {
    heroCta.addEventListener('click', (e) => {
      e.preventDefault();
      const targetEl = document.querySelector('#shop');
      if (targetEl) {
        const navHeight = navbar.offsetHeight;
        const top = targetEl.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  }
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollY = window.scrollY;

  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionBottom) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}


// ───────────────────────────────────────────
// 6. SCROLL ANIMATIONS
// ───────────────────────────────────────────
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
    observer.observe(el);
  });
}


// ───────────────────────────────────────────
// 7. STATS COUNTER ANIMATION
// ───────────────────────────────────────────
function setupStatsCounter() {
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const statsGrid = document.querySelector('.stats-grid');
  if (statsGrid) {
    observer.observe(statsGrid);
  }
}

function animateCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  const duration = 2000;

  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const suffix = counter.getAttribute('data-suffix') || '+';
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      counter.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = target + suffix;
      }
    }

    requestAnimationFrame(update);
  });
}


// ───────────────────────────────────────────
// 8. FAQ ACCORDION
// ───────────────────────────────────────────
function setupFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others (accordion behavior)
      faqItems.forEach(other => other.classList.remove('active'));

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}


// ───────────────────────────────────────────
// 9. TYPING ANIMATION
// ───────────────────────────────────────────
function setupTypingAnimation() {
  const element = document.getElementById('typing-text');
  if (!element) return;

  const phrases = [
    'Your vibe, curated.',
    'No cap, just drops.',
    'Trending. Always.',
    'Built for your aesthetic.'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      element.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      element.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentPhrase.length) {
      delay = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 500; // Pause before next phrase
    }

    setTimeout(type, delay);
  }

  // Start after a short delay
  setTimeout(type, 1000);
}




// ───────────────────────────────────────────
// 11. PRODUCT IMAGE MODAL
// ───────────────────────────────────────────
function openProductModal(imageSrc) {
  const overlay = document.getElementById('modal-overlay');
  const img = document.getElementById('modal-image');
  if (!overlay || !img) return;

  img.src = imageSrc;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;

  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function setupProductModal() {
  const closeBtn = document.getElementById('close-modal');
  const overlay = document.getElementById('modal-overlay');

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeProductModal();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeProductModal();
      }
    });
  }
}


// ───────────────────────────────────────────
// 12. RAZORPAY CHECKOUT (server-driven)
// ───────────────────────────────────────────
// Base URL for the Cloudflare Worker API. Same-origin by default
// (https://dailystoptoshop.com/api/*).
const API_BASE = '/api';

// Step 1: CHECKOUT button opens the delivery-details modal.
function initiateCheckout() {
  if (getCartCount() === 0) return;
  openCheckoutModal();
}

function openCheckoutModal() {
  const subtotal = getCartSubtotal();
  const shipping = getCartShipping();
  const total = subtotal + shipping;
  const subtotalEl = document.getElementById('checkout-subtotal');
  const shippingEl = document.getElementById('checkout-shipping');
  const totalEl = document.getElementById('checkout-total');
  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : formatPrice(shipping);
  if (totalEl) totalEl.textContent = formatPrice(total);
  document.body.classList.add('checkout-open');

  if (typeof window.applyWheelDiscountToCheckout === 'function') {
    window.applyWheelDiscountToCheckout();
  }
}

function closeCheckoutModal() {
  document.body.classList.remove('checkout-open');
}

function setupCheckoutForm() {
  const form = document.getElementById('checkout-form');
  const closeBtn = document.getElementById('close-checkout');
  const overlay = document.getElementById('checkout-overlay');

  if (closeBtn) closeBtn.addEventListener('click', closeCheckoutModal);
  if (overlay) overlay.addEventListener('click', closeCheckoutModal);
  if (form) form.addEventListener('submit', handleCheckoutSubmit);
}

// Step 2: collect delivery details, create order server-side, pay, verify.
async function handleCheckoutSubmit(e) {
  e.preventDefault();
  if (getCartCount() === 0) return;

  if (typeof Razorpay === 'undefined') {
    showToast('Payment gateway loading... Please try again.');
    return;
  }

  const form = e.target;
  const fd = new FormData(form);
  const activeDiscount = (typeof getActiveSpinDiscount === 'function') ? getActiveSpinDiscount() : null;
  const delivery = {
    name: (fd.get('name') || '').trim(),
    phone: (fd.get('phone') || '').trim(),
    email: (fd.get('email') || '').trim(),
    address: (fd.get('address') || '').trim(),
    pincode: (fd.get('pincode') || '').trim(),
    discount_pct: (activeDiscount && activeDiscount.pct) ? String(activeDiscount.pct) : ''
  };

  const items = cart.map(item => ({ productId: item.productId, quantity: item.quantity }));
  const payBtn = document.getElementById('pay-now-btn');
  if (payBtn) { payBtn.disabled = true; payBtn.textContent = 'PROCESSING...'; }

  let order;
  try {
    const res = await fetch(`${API_BASE}/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, delivery })
    });
    order = await res.json();
    if (!res.ok) throw new Error(order && order.error ? order.error : 'Order failed');
  } catch (err) {
    console.error('Create order failed:', err);
    showToast('Could not start payment. Please try again.');
    if (payBtn) { payBtn.disabled = false; payBtn.textContent = 'PAY NOW'; }
    return;
  }

  // Build the description showing discount if applied
  const summary = order.summary || {};
  let desc = `Order — ${getCartCount()} item(s)`;
  if (summary.discountPct && summary.discountPct > 0) {
    desc += ` · ${summary.discountPct}% spin discount applied`;
  }

  const options = {
    key: order.keyId,
    order_id: order.orderId,
    amount: order.amount,
    currency: order.currency,
    name: 'dailystoptoshop',
    description: desc,
    image: './assets/logo.webp',
    prefill: { name: delivery.name, email: delivery.email, contact: delivery.phone },
    theme: { color: '#f59e0b' },
    handler: async function (response) {
      // Step 3: verify the signature server-side before confirming.
      try {
        const vres = await fetch(`${API_BASE}/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          })
        });
        const vdata = await vres.json();
        if (vres.ok && vdata.verified) {
          showToast('Payment successful! 🎉 Order confirmed!');
          
          if (typeof window.markActiveSpinDiscountUsed === 'function') {
            window.markActiveSpinDiscountUsed();
          }

          cart = [];
          saveCart();
          renderCart();
          closeCheckoutModal();
          closeCart();
        } else {
          showToast('Payment could not be verified. Contact support.');
        }
      } catch (err) {
        console.error('Verify failed:', err);
        showToast('Payment verification error. Contact support.');
      } finally {
        if (payBtn) { payBtn.disabled = false; payBtn.textContent = 'PAY NOW'; }
      }
    },
    modal: {
      ondismiss: function () {
        showToast('Payment cancelled. Your bag is still waiting! 🛒');
        if (payBtn) { payBtn.disabled = false; payBtn.textContent = 'PAY NOW'; }
      }
    }
  };

  try {
    const rzp = new Razorpay(options);
    rzp.on('payment.failed', function (response) {
      showToast('Payment failed. Please try again.');
      console.error('Payment failed:', response.error);
      if (payBtn) { payBtn.disabled = false; payBtn.textContent = 'PAY NOW'; }
    });
    rzp.open();
  } catch (err) {
    console.error('Razorpay error:', err);
    showToast('Payment gateway error. Please try again.');
    if (payBtn) { payBtn.disabled = false; payBtn.textContent = 'PAY NOW'; }
  }
}


// ───────────────────────────────────────────
// 13. TOAST NOTIFICATIONS
// ───────────────────────────────────────────
let toastTimeout;

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  // Clear existing timeout
  clearTimeout(toastTimeout);

  toast.textContent = message;
  toast.classList.add('visible');

  toastTimeout = setTimeout(() => {
    toast.classList.remove('visible');
  }, 3000);
}


// ───────────────────────────────────────────
// 14. NEWSLETTER FORM
// ───────────────────────────────────────────
function setupNewsletter() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const button = form.querySelector('button');

    if (!input || !input.value) return;

    // Show success state
    const originalText = button.textContent;
    button.textContent = '✓ Joined!';
    button.style.background = 'var(--success)';
    input.value = '';

    showToast('Welcome to the squad! 🎉');

    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = '';
    }, 2500);
  });
}


// ───────────────────────────────────────────
// 15. KEYBOARD SHORTCUTS
// ───────────────────────────────────────────
function setupKeyboard() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeProductModal();
      closeCheckoutModal();

      // Close mobile menu
      const hamburger = document.getElementById('hamburger');
      const navbar = document.getElementById('navbar');
      if (hamburger) hamburger.classList.remove('active');
      if (navbar) navbar.classList.remove('nav-open');
    }
  });
}


// ───────────────────────────────────────────
// 16. ANIMATED REVIEWS MARQUEE
// ───────────────────────────────────────────
const reviews = [
  { name: 'Aanya S.', avatar: '🌸', stars: 5, product: 'Cute Rabbit Bottle', text: 'The rabbit bottle is literally the cutest thing in my bag! Chai still piping hot after classes 🥹' },
  { name: 'Mehak R.', avatar: '🖤', stars: 5, product: 'Black Cat Bottle', text: 'Black cat bottle >>> everything. Zero leaks in my backpack and ice stays icy ALL day.' },
  { name: 'Ishaan V.', avatar: '⚡', stars: 4, product: 'Happy Puppy Bottle', text: 'Got the puppy one for my sister, now I want one too. Build quality is genuinely solid.' },
  { name: 'Tanvi K.', avatar: '🍰', stars: 5, product: 'Sleeping Bear Bottle', text: 'The sleeping bear is my desk buddy now. Coffee hot from 9 to 9, no cap ☕' },
  { name: 'Riya P.', avatar: '✨', stars: 5, product: 'Flowttls Quencher', text: 'Quencher came packed SO well. The bow straw topper? Iconic. Instant fave.' },
  { name: 'Arjun M.', avatar: '🏀', stars: 5, product: 'Black Cat Bottle', text: 'Take it to practice daily — survives my gym bag and the water is still freezing. W purchase.' },
  { name: 'Sara D.', avatar: '🎀', stars: 5, product: 'Cute Rabbit Bottle', text: 'Shipping was quick and the handle strap is so handy. Bought two more as gifts 🎁' },
  { name: 'Nikita J.', avatar: '🌙', stars: 4, product: 'Sleeping Bear Bottle', text: 'Adorable AND practical. Wish I ordered sooner — my old bottle could never.' }
];

function reviewCardHtml(r) {
  const stars = '★'.repeat(r.stars) + '☆'.repeat(5 - r.stars);
  return `
    <div class="review-card">
      <div class="review-stars" aria-label="${r.stars} out of 5 stars">${stars}</div>
      <p class="review-text">${r.text}</p>
      <div class="review-author">
        <span class="review-avatar">${r.avatar}</span>
        <div class="review-meta"><strong>${r.name}</strong><span>${r.product} · Verified buyer ✓</span></div>
      </div>
    </div>`;
}

function renderReviews() {
  const m1 = document.getElementById('reviews-marquee-1');
  const m2 = document.getElementById('reviews-marquee-2');
  if (!m1 || !m2) return;
  const rowA = reviews.slice(0, 4).map(reviewCardHtml).join('');
  const rowB = reviews.slice(4).map(reviewCardHtml).join('');
  // Each row's content is duplicated so the -50% translate loops seamlessly.
  m1.innerHTML = `<div class="marquee-track">${rowA}${rowA}</div>`;
  m2.innerHTML = `<div class="marquee-track reverse">${rowB}${rowB}</div>`;
}


// ───────────────────────────────────────────
// 17. PARALLAX + SCROLL PROGRESS (transform-only, rAF-throttled)
// ───────────────────────────────────────────
// Scroll parallax via data-parallax, plus a gentle mouse-move drift in the
// hero via data-depth. Both respect prefers-reduced-motion.
function setupParallax() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const layers = prefersReduced ? [] : Array.from(document.querySelectorAll('[data-parallax]'));
  const progressBar = document.getElementById('scroll-progress');
  if (!layers.length && !progressBar) return;

  // Lerp-based mouse drift: targetX/Y = where mouse wants emojis to go,
  // currentX/Y = where they actually are, smoothly chasing the target.
  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
  const LERP = 0.08;       // smoothing factor — lower = slower ease
  const THRESHOLD = 0.01;  // snap-to-target threshold (px)
  let rafId = null;

  function render() {
    // Lerp toward target
    currentX += (targetX - currentX) * LERP;
    currentY += (targetY - currentY) * LERP;

    // Snap when close enough to avoid endless micro-updates
    if (Math.abs(currentX - targetX) < THRESHOLD) currentX = targetX;
    if (Math.abs(currentY - targetY) < THRESHOLD) currentY = targetY;

    const y = window.scrollY;
    layers.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-parallax')) || 0;
      const depth = parseFloat(el.getAttribute('data-depth')) || 0;
      const tx = currentX * depth;
      const ty = y * speed + currentY * depth;
      el.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0)`;
    });
    if (progressBar) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
    }

    // Keep the loop alive while lerping; auto-stop once converged
    if (currentX !== targetX || currentY !== targetY) {
      rafId = requestAnimationFrame(render);
    } else {
      rafId = null;
    }
  }

  function scheduleRender() {
    if (rafId === null) {
      rafId = requestAnimationFrame(render);
    }
  }

  window.addEventListener('scroll', scheduleRender, { passive: true });

  // Track cursor across the entire window (not just #hero)
  window.addEventListener('mousemove', (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    scheduleRender();
  }, { passive: true });

  // When hero scrolls out of view, silently reset drift to zero.
  // The lerp eases emojis back while they're offscreen — no visible jitter.
  const hero = document.getElementById('hero');
  if (hero) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          targetX = 0;
          targetY = 0;
          scheduleRender();
        }
      });
    }, { threshold: 0 });
    observer.observe(hero);
  }

  render();
}


// ───────────────────────────────────────────
// 19. PRODUCT DETAIL PAGE (product.html?id=...)
// ───────────────────────────────────────────
function renderProductPage() {
  const root = document.getElementById('product-page');
  if (!root) return;

  const id = new URLSearchParams(window.location.search).get('id');
  const product = products.find(p => p.id === id);

  if (!product) {
    root.innerHTML = `
      <div class="pp-loading">
        <p>Oops, we couldn't find that product 🥺</p>
        <p style="margin-top:16px;"><a class="details-link" href="./index.html#shop">Back to the collection <span aria-hidden="true">→</span></a></p>
      </div>`;
    return;
  }

  document.title = `${product.name} — dailystoptoshop`;

  const imgs = getProductImages(product);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const specsHtml = product.specs ? `
    <div class="pp-specs fade-in">
      <h2>Specifications 📋</h2>
      <table>${Object.entries(product.specs).map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join('')}</table>
    </div>` : '';

  const related = products.filter(p => p.id !== product.id).slice(0, 4);

  root.innerHTML = `
    <nav class="pp-breadcrumb" aria-label="Breadcrumb">
      <a href="./index.html">Home</a><span>›</span><a href="./index.html#shop">Shop</a><span>›</span><span>${product.shortName}</span>
    </nav>
    <div class="pp-layout">
      <div class="pp-gallery">
        <div class="pp-main">
          ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
          <img id="pp-main-img" src="${imgs[0] || ''}" alt="${product.name}">
        </div>
        <div class="pp-thumbs">
          ${imgs.map((src, i) => `<button class="pp-thumb${i === 0 ? ' active' : ''}" data-src="${src}" aria-label="View image ${i + 1}"><img src="${src}" alt="" loading="lazy"></button>`).join('')}
        </div>
      </div>
      <div class="pp-info">
        <h1 class="pp-title">${product.name}</h1>
        <p class="pp-desc">${product.description}</p>
        <div class="pp-pricing">
          <span class="price">${formatPrice(product.price)}</span>
          ${product.originalPrice ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
          ${discount > 0 ? `<span class="save-chip">SAVE ${discount}% 🎉</span>` : ''}
        </div>
        <div id="pp-product-rating" class="pp-product-rating"></div>
        <button class="add-to-cart-btn pp-add" data-product-id="${product.id}" onclick="addToCart('${product.id}')" ${!product.inStock ? 'disabled' : ''}>${product.inStock ? 'ADD TO BAG' : 'SOLD OUT'}</button>
        ${product.inStock ? '<p class="urgency-text">⚡ Only a few left — don\'t sleep on it</p>' : ''}
        ${specsHtml}
      </div>
    </div>

    ${product.about ? `
    <div class="pp-about-row fade-in">
      <div class="pp-about-video">
        ${product.video ? `
          <video class="lazy-video" data-src="${product.video}" autoplay muted loop playsinline></video>
        ` : ''}
      </div>
      <div class="pp-about">
        <h2>About this item 💕</h2>
        <ul>${product.about.map(a => `<li>${a}</li>`).join('')}</ul>
      </div>
    </div>
    ` : ''}

    <div class="pp-related">
      <h2>You may also like ✨</h2>
      <div class="pp-related-grid">
        ${related.map(p => `<a class="pp-rel-card" href="./product.html?id=${p.id}"><img src="${getProductCover(p)}" alt="${p.name}" loading="lazy"><span>${p.shortName}</span><strong>${formatPrice(p.price)}</strong></a>`).join('')}
      </div>
    </div>
    <div id="pp-reviews-section"></div>`;

  renderProductReviews(product.id);
  initLazyVideos();

  // Image zoom + thumbnail switching with a soft pop transition
  const mainImg = document.getElementById('pp-main-img');
  if (mainImg) mainImg.addEventListener('click', () => openProductModal(mainImg.src));
  root.querySelectorAll('.pp-thumb').forEach(btn => {
    btn.addEventListener('click', () => {
      root.querySelectorAll('.pp-thumb').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (mainImg) {
        mainImg.classList.remove('pp-img-pop');
        void mainImg.offsetWidth;
        mainImg.src = btn.getAttribute('data-src');
        mainImg.classList.add('pp-img-pop');
      }
    });
  });
}

function initLazyVideos() {
  const lazyVideos = document.querySelectorAll('.lazy-video');
  if (lazyVideos.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting) {
        if (video.dataset.src) {
          video.src = video.dataset.src;
          video.removeAttribute('data-src');
          video.load();
        }
        video.play().catch(err => {
          console.log('Autoplay play failed:', err);
        });
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.1 });

  lazyVideos.forEach(v => observer.observe(v));
}


// ───────────────────────────────────────────
// 20. PRODUCT REVIEWS (Google Sign-In + D1)
// ───────────────────────────────────────────

// Google Client ID (must match the one in wrangler.toml)
const GOOGLE_CLIENT_ID = '492637039414-iibisalh71efb9497qhe18qktkma57nc.apps.googleusercontent.com';

// Current Google user session
let googleUser = null; // { credential (JWT), name, picture, sub }

// Restore session from sessionStorage on load
(function restoreGoogleSession() {
  try {
    const saved = sessionStorage.getItem('dsts_google_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Check if the JWT hasn't expired (exp is in seconds)
      const payload = JSON.parse(atob(parsed.credential.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
      if (payload.exp * 1000 > Date.now()) {
        googleUser = parsed;
      } else {
        sessionStorage.removeItem('dsts_google_user');
      }
    }
  } catch (e) { /* ignore corrupt data */ }
})();

// Make globally accessible for GSI onload callback
window.initGoogleSignIn = function initGoogleSignIn() {
  if (typeof google === 'undefined' || !google.accounts) return;
  google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: onGoogleSignIn,
    auto_select: true,
    context: 'signin'
  });
};

function onGoogleSignIn(response) {
  if (!response.credential) return;
  try {
    const payload = JSON.parse(atob(response.credential.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    googleUser = {
      credential: response.credential,
      sub: payload.sub,
      name: payload.name || 'Anonymous',
      picture: payload.picture || ''
    };
    // Persist to sessionStorage
    sessionStorage.setItem('dsts_google_user', JSON.stringify(googleUser));
    // If a review form was waiting for sign-in, show it now
    const formArea = document.getElementById('pp-review-form-area');
    if (formArea && formArea.classList.contains('open')) renderReviewForm(formArea);
  } catch (e) {
    console.error('Failed to decode Google credential', e);
  }
}

function promptGoogleSignIn() {
  if (typeof google === 'undefined' || !google.accounts) {
    showToast('Google Sign-In is loading, please try again in a moment');
    return;
  }
  // Use Google's OAuth2 popup flow — always works, no One Tap cooldowns
  const tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: GOOGLE_CLIENT_ID,
    scope: 'openid profile email',
    callback: async (tokenResponse) => {
      if (tokenResponse.error) {
        showToast('Sign-in was cancelled');
        return;
      }
      // Fetch user info using the access token
      try {
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
        });
        const info = await res.json();
        // We need an ID token for the backend — use the access_token to get one
        // Actually, request an id_token via the tokenResponse
        googleUser = {
          credential: tokenResponse.access_token, // We'll adjust backend to accept this
          sub: info.sub,
          name: info.name || 'Anonymous',
          picture: info.picture || ''
        };
        sessionStorage.setItem('dsts_google_user', JSON.stringify(googleUser));
        const formArea = document.getElementById('pp-review-form-area');
        if (formArea && formArea.classList.contains('open')) renderReviewForm(formArea);
        showToast('Signed in as ' + googleUser.name, 'success');
      } catch (e) {
        showToast('Sign-in failed. Please try again.');
      }
    }
  });
  tokenClient.requestAccessToken();
}

// Render the full reviews section on the product page
async function renderProductReviews(productId) {
  const container = document.getElementById('pp-reviews-section');
  if (!container) return;

  container.innerHTML = `
    <div class="pp-reviews">
      <div class="pp-reviews-header">
        <h2>Customer Reviews ✍️</h2>
        <button class="pp-write-review-btn" id="pp-write-review-btn">Write a Review</button>
      </div>
      <div id="pp-review-form-area"></div>
      <div id="pp-reviews-summary"></div>
      <div id="pp-reviews-list" class="pp-reviews-list">
        <div class="pp-reviews-loading">Loading reviews…</div>
      </div>
    </div>`;

  // Wire "Write a Review" button
  const writeBtn = document.getElementById('pp-write-review-btn');
  if (writeBtn) {
    writeBtn.addEventListener('click', () => {
      const formArea = document.getElementById('pp-review-form-area');
      if (!formArea) return;
      if (formArea.classList.contains('open')) {
        formArea.classList.remove('open');
        formArea.innerHTML = '';
        return;
      }
      if (googleUser) {
        renderReviewForm(formArea);
      } else {
        formArea.classList.add('open');
        formArea.innerHTML = `
          <div class="pp-review-signin">
            <p>Sign in with Google to write a review</p>
            <div id="pp-google-signin-btn"></div>
            <button class="pp-google-fallback-btn" id="pp-google-fallback-btn" style="display:none;">
              <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/><path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>
              Sign in with Google
            </button>
          </div>`;
        // Wire fallback button immediately
        const fallbackBtn = document.getElementById('pp-google-fallback-btn');
        if (fallbackBtn) fallbackBtn.addEventListener('click', promptGoogleSignIn);
        // Try the official Google rendered button
        if (typeof google !== 'undefined' && google.accounts) {
          try {
            google.accounts.id.renderButton(
              document.getElementById('pp-google-signin-btn'),
              { theme: 'outline', size: 'large', shape: 'pill', text: 'signin_with' }
            );
          } catch (e) { /* renderButton failed */ }
          // Check after a delay if the official button's iframe loaded
          setTimeout(() => {
            const officialBtn = document.getElementById('pp-google-signin-btn');
            if (officialBtn && officialBtn.querySelector('iframe')) {
              // Official button loaded — hide fallback
              if (fallbackBtn) fallbackBtn.style.display = 'none';
            } else {
              // Official button didn't load — show fallback
              if (officialBtn) officialBtn.style.display = 'none';
              if (fallbackBtn) fallbackBtn.style.display = 'inline-flex';
            }
          }, 1500);
        } else {
          // GSI library not loaded at all — show fallback
          if (fallbackBtn) fallbackBtn.style.display = 'inline-flex';
        }
      }
    });
  }

  // Fetch and display reviews
  try {
    const res = await fetch(`${API_BASE}/reviews?product_id=${encodeURIComponent(productId)}`);
    const data = await res.json();
    displayReviews(data.reviews || [], productId);
  } catch (err) {
    console.error('Failed to fetch reviews:', err);
    const list = document.getElementById('pp-reviews-list');
    if (list) list.innerHTML = '<p class="pp-reviews-empty">Could not load reviews. Please try again later.</p>';
  }
}

function displayReviews(reviews, productId) {
  const list = document.getElementById('pp-reviews-list');
  const summary = document.getElementById('pp-reviews-summary');
  if (!list) return;

  // Summary
  if (summary && reviews.length > 0) {
    const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    const fullStars = Math.floor(avg);
    const halfStar = (avg - fullStars) >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    const starsHtml = '★'.repeat(fullStars) + (halfStar ? '⯨' : '') + '☆'.repeat(emptyStars);
    summary.innerHTML = `
      <div class="pp-reviews-summary">
        <span class="pp-reviews-avg">${avg.toFixed(1)}</span>
        <span class="pp-reviews-avg-stars">${starsHtml}</span>
        <span class="pp-reviews-count">${reviews.length} review${reviews.length !== 1 ? 's' : ''}</span>
      </div>`;

    // Also populate the product info rating (between price and Add to Bag)
    const productRating = document.getElementById('pp-product-rating');
    if (productRating) {
      productRating.innerHTML = `
        <a href="#pp-reviews-section" class="pp-product-rating-link">
          <span class="pp-product-rating-stars">${starsHtml}</span>
          <span class="pp-product-rating-score">${avg.toFixed(1)}</span>
          <span class="pp-product-rating-count">(${reviews.length} review${reviews.length !== 1 ? 's' : ''})</span>
        </a>`;
    }
  }

  // Reviews list
  if (reviews.length === 0) {
    list.innerHTML = '<p class="pp-reviews-empty">No reviews yet — be the first! ✨</p>';
    return;
  }

  const likedReviews = getLocalLikes();

  list.innerHTML = reviews.map(r => {
    const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
    const isOwn = googleUser && googleUser.sub === r.user_sub;
    const isLiked = likedReviews.includes(r.id);
    const timeAgo = formatTimeAgo(r.created_at);

    return `
      <div class="pp-review-card" data-review-id="${r.id}">
        <div class="pp-review-card-header">
          <img class="pp-review-avatar" src="${r.user_pic || ''}" alt="" referrerpolicy="no-referrer" onerror="this.style.display='none'">
          <div class="pp-review-user-info">
            <strong>${r.user_name}</strong>
            <span class="pp-review-time">${timeAgo}</span>
          </div>
          ${isOwn ? `<button class="pp-review-delete" data-review-id="${r.id}" aria-label="Delete review">🗑️</button>` : ''}
        </div>
        <div class="pp-review-stars" aria-label="${r.rating} out of 5 stars">${stars}</div>
        <p class="pp-review-body">${r.body}</p>
        <button class="pp-review-like ${isLiked ? 'liked' : ''}" data-review-id="${r.id}">
          <span class="pp-like-icon">${isLiked ? '❤️' : '🤍'}</span>
          <span class="pp-like-count">${r.likes || 0}</span>
        </button>
      </div>`;
  }).join('');

  // Attach like handlers
  list.querySelectorAll('.pp-review-like').forEach(btn => {
    btn.addEventListener('click', () => handleLikeReview(btn.dataset.reviewId, btn));
  });

  // Attach delete handlers
  list.querySelectorAll('.pp-review-delete').forEach(btn => {
    btn.addEventListener('click', () => handleDeleteReview(btn.dataset.reviewId, productId));
  });
}

function renderReviewForm(formArea) {
  formArea.classList.add('open');
  formArea.innerHTML = `
    <form class="pp-review-form" id="pp-review-form">
      <div class="pp-review-form-user">
        <img src="${googleUser.picture}" alt="" class="pp-review-avatar" referrerpolicy="no-referrer" onerror="this.style.display='none'">
        <span>${googleUser.name}</span>
      </div>
      <div class="pp-star-picker" id="pp-star-picker">
        ${[1,2,3,4,5].map(i => `<button type="button" class="pp-star-btn" data-value="${i}" aria-label="${i} star${i > 1 ? 's' : ''}">☆</button>`).join('')}
      </div>
      <textarea id="pp-review-input" placeholder="Share your experience with this product…" maxlength="1000" rows="4"></textarea>
      <div class="pp-review-form-footer">
        <span class="pp-char-count"><span id="pp-char-current">0</span>/1000</span>
        <button type="submit" class="pp-review-submit" id="pp-review-submit" disabled>Submit Review</button>
      </div>
    </form>`;

  let selectedRating = 0;

  // Star picker
  const starBtns = formArea.querySelectorAll('.pp-star-btn');
  starBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      const val = parseInt(btn.dataset.value);
      starBtns.forEach((b, i) => { b.textContent = i < val ? '★' : '☆'; });
    });
    btn.addEventListener('click', () => {
      selectedRating = parseInt(btn.dataset.value);
      starBtns.forEach((b, i) => {
        b.textContent = i < selectedRating ? '★' : '☆';
        b.classList.toggle('active', i < selectedRating);
      });
      validateReviewForm();
    });
  });

  const picker = document.getElementById('pp-star-picker');
  if (picker) {
    picker.addEventListener('mouseleave', () => {
      starBtns.forEach((b, i) => { b.textContent = i < selectedRating ? '★' : '☆'; });
    });
  }

  // Character counter
  const textarea = document.getElementById('pp-review-input');
  const charCount = document.getElementById('pp-char-current');
  if (textarea && charCount) {
    textarea.addEventListener('input', () => {
      charCount.textContent = textarea.value.length;
      validateReviewForm();
    });
  }

  function validateReviewForm() {
    const submitBtn = document.getElementById('pp-review-submit');
    if (submitBtn) {
      submitBtn.disabled = !(selectedRating >= 1 && textarea && textarea.value.trim().length >= 10);
    }
  }

  // Submit handler
  const form = document.getElementById('pp-review-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!googleUser) return;

      const submitBtn = document.getElementById('pp-review-submit');
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Submitting…'; }

      const productId = new URLSearchParams(window.location.search).get('id');

      try {
        const res = await fetch(`${API_BASE}/reviews`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${googleUser.credential}`
          },
          body: JSON.stringify({
            product_id: productId,
            rating: selectedRating,
            body: textarea.value.trim()
          })
        });

        const data = await res.json();

        if (!res.ok) {
          showToast(data.error || 'Failed to submit review');
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Submit Review'; }
          return;
        }

        showToast('Review submitted! 🎉');
        formArea.classList.remove('open');
        formArea.innerHTML = '';
        // Refresh reviews
        renderProductReviews(productId);
      } catch (err) {
        console.error('Review submit error:', err);
        showToast('Something went wrong. Please try again.');
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Submit Review'; }
      }
    });
  }
}

async function handleLikeReview(reviewId, btn) {
  const likedReviews = getLocalLikes();
  if (likedReviews.includes(reviewId)) {
    showToast('You already liked this review');
    return;
  }

  // Optimistic UI update
  const countEl = btn.querySelector('.pp-like-count');
  const iconEl = btn.querySelector('.pp-like-icon');
  const currentCount = parseInt(countEl.textContent) || 0;
  countEl.textContent = currentCount + 1;
  iconEl.textContent = '❤️';
  btn.classList.add('liked');

  try {
    const res = await fetch(`${API_BASE}/reviews/${reviewId}/like`, { method: 'POST' });
    if (!res.ok) throw new Error('Like failed');
    // Persist in localStorage
    likedReviews.push(reviewId);
    localStorage.setItem('dsts_liked_reviews', JSON.stringify(likedReviews));
  } catch (err) {
    // Revert on failure
    countEl.textContent = currentCount;
    iconEl.textContent = '🤍';
    btn.classList.remove('liked');
    showToast('Could not like this review. Try again.');
  }
}

async function handleDeleteReview(reviewId, productId) {
  if (!googleUser) return;
  if (!confirm('Delete your review? This cannot be undone.')) return;

  try {
    const res = await fetch(`${API_BASE}/reviews/${reviewId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${googleUser.credential}` }
    });
    if (!res.ok) {
      const data = await res.json();
      showToast(data.error || 'Failed to delete review');
      return;
    }
    showToast('Review deleted');
    // Animate removal
    const card = document.querySelector(`.pp-review-card[data-review-id="${reviewId}"]`);
    if (card) {
      card.style.transition = 'opacity 0.3s, transform 0.3s';
      card.style.opacity = '0';
      card.style.transform = 'translateY(-10px)';
      setTimeout(() => {
        card.remove();
        renderProductReviews(productId);
      }, 300);
    }
  } catch (err) {
    console.error('Delete review error:', err);
    showToast('Something went wrong. Please try again.');
  }
}

function getLocalLikes() {
  try {
    return JSON.parse(localStorage.getItem('dsts_liked_reviews') || '[]');
  } catch { return []; }
}

function formatTimeAgo(dateStr) {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}


// ───────────────────────────────────────────
// 21. INITIALIZATION
// ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Render dynamic content
  renderProducts();
  renderProductPage();
  renderReviews();
  initGoogleSignIn();

  // Load and render cart
  loadCart();
  renderCart();

  // Setup all interactive features
  setupNavigation();
  setupCartDrawer();
  setupFAQ();
  setupScrollAnimations();
  setupStatsCounter();
  setupTypingAnimation();
  setupProductModal();
  setupNewsletter();
  setupKeyboard();
  setupCheckoutForm();
  setupParallax();

  // Checkout button
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', initiateCheckout);
  }

  // Re-initialize Lucide icons after dynamic content is rendered
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  console.log('%c✦ dailystoptoshop loaded ✦', 'color: #FF5D8F; font-size: 16px; font-weight: bold;');
});




// ═══════════════════════════════════════════════════════════════
// 20. SPIN THE WHEEL
// ═══════════════════════════════════════════════════════════════
(function () {
  'use strict';

  /* ── Config ── */
  const LS_SPIN_TS   = 'dsts_wheel_spun_at';   // timestamp of last spin
  const LS_DISCOUNT  = 'dsts_wheel_discount';   // { pct, used } or null
  const SPIN_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // 1 week
  const WHEEL_EMAIL_ENDPOINT = '/api/wheel-email';

  // Expose discount to renderCart() which lives outside this IIFE
  window.getActiveSpinDiscount = function () { return sessionDiscount; };


  /* 8 segments — ordered as they appear clockwise.
     Probability is proportional to weight.                         */
  const SEGMENTS = [
    { label: '2% OFF',  pct: 2,  fill: '#FFEFE2', text: '#85737B' },
    { label: '5% OFF',  pct: 5,  fill: '#FF5D8F', text: '#ffffff' },
    { label: '3% OFF',  pct: 3,  fill: '#6CC9B5', text: '#ffffff' },
    { label: '8% OFF',  pct: 8,  fill: '#FF9F45', text: '#ffffff' },
    { label: '4% OFF',  pct: 4,  fill: '#C9B8E8', text: '#4a3a6e' },
    { label: '10% OFF', pct: 10, fill: '#FF5D8F', text: '#ffffff' },
    { label: '6% OFF',  pct: 6,  fill: '#6CC9B5', text: '#ffffff' },
    { label: '7% OFF',  pct: 7,  fill: '#FF9F45', text: '#ffffff' },
  ];
  const N = SEGMENTS.length;
  const SLICE = (2 * Math.PI) / N;

  /* ── Weighted random pick ── */
  // Higher pct = slightly lower weight so big wins feel special
  const WEIGHTS = SEGMENTS.map(s => Math.max(1, 12 - s.pct));
  const TOTAL_W  = WEIGHTS.reduce((a, b) => a + b, 0);

  function weightedRandom() {
    let r = Math.random() * TOTAL_W;
    for (let i = 0; i < N; i++) {
      r -= WEIGHTS[i];
      if (r <= 0) return i;
    }
    return N - 1;
  }

  /* ── Canvas drawing ── */
  let currentAngle = 0; // radians — tracks current resting rotation

  function drawWheel(canvas, angle) {
    const ctx = canvas.getContext('2d');
    const W   = canvas.width;
    const H   = canvas.height;
    const cx  = W / 2;
    const cy  = H / 2;
    const R   = Math.min(cx, cy) - 4;

    ctx.clearRect(0, 0, W, H);

    // Draw outer ring
    ctx.beginPath();
    ctx.arc(cx, cy, R + 4, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,93,143,0.25)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw segments
    for (let i = 0; i < N; i++) {
      const startA = angle + i * SLICE;
      const endA   = startA + SLICE;
      const seg    = SEGMENTS[i];

      // Slice fill
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, R, startA, endA);
      ctx.closePath();
      ctx.fillStyle = seg.fill;
      ctx.fill();

      // Slice border
      ctx.strokeStyle = 'rgba(255,255,255,0.7)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Label
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(startA + SLICE / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = seg.text;
      ctx.font = `bold ${W < 300 ? 11 : 13}px 'Outfit', sans-serif`;
      ctx.shadowColor = 'rgba(0,0,0,0.18)';
      ctx.shadowBlur  = 3;
      ctx.fillText(seg.label, R - 12, 5);
      ctx.restore();
    }

    // Centre hub
    ctx.beginPath();
    ctx.arc(cx, cy, 18, 0, 2 * Math.PI);
    const hubGrad = ctx.createRadialGradient(cx - 4, cy - 4, 2, cx, cy, 18);
    hubGrad.addColorStop(0, '#fff');
    hubGrad.addColorStop(1, '#f4e2d6');
    ctx.fillStyle   = hubGrad;
    ctx.shadowColor = 'rgba(255,93,143,0.3)';
    ctx.shadowBlur  = 8;
    ctx.fill();
    ctx.shadowBlur  = 0;
    ctx.strokeStyle = 'rgba(255,93,143,0.4)';
    ctx.lineWidth   = 2;
    ctx.stroke();
  }

  /* ── Easing ── */
  function easeOut(t) { return 1 - Math.pow(1 - t, 4); }

  /* ── Spin animation ── */
  function spinTo(canvas, targetSegIdx, onDone) {
    const DURATION    = 4200; // ms
    const EXTRA_TURNS = 5;    // full rotations before landing

    // Pointer is at angle 0 (pointing right = 3 o'clock).
    // Segment 0 starts at currentAngle.
    // We want targetSegIdx's midpoint to land at 0 (right side pointer).
    const targetMid = targetSegIdx * SLICE + SLICE / 2;
    // We need: (currentAngle + spinAmount + targetMid) mod 2π = 0
    // => spinAmount = -currentAngle - targetMid + 2π*k  (k = EXTRA_TURNS)
    let spinAmount = (2 * Math.PI * EXTRA_TURNS) - currentAngle - targetMid;
    // Normalise so we always spin forward (positive)
    spinAmount = ((spinAmount % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    spinAmount += 2 * Math.PI * EXTRA_TURNS;

    const startAngle = currentAngle;
    const startTime  = performance.now();

    function frame(now) {
      const elapsed = now - startTime;
      const t       = Math.min(elapsed / DURATION, 1);
      const eased   = easeOut(t);
      const angle   = startAngle + spinAmount * eased;

      drawWheel(canvas, angle);

      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        currentAngle = angle % (2 * Math.PI);
        onDone();
      }
    }
    requestAnimationFrame(frame);
  }

  /* ── Confetti burst ── */
  const CONFETTI_COLORS = ['#FF5D8F','#FF9F45','#6CC9B5','#FFC75C','#C9B8E8','#fff'];
  function burstConfetti() {
    for (let i = 0; i < 60; i++) {
      const el = document.createElement('div');
      el.className = 'wheel-confetti-particle';
      const x    = 20 + Math.random() * 60;   // % from left
      const dur  = 1.8 + Math.random() * 1.4;
      const delay = Math.random() * 0.5;
      el.style.cssText = `
        left:${x}vw; top:-10px;
        background:${CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]};
        animation-duration:${dur}s;
        animation-delay:${delay}s;
        border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
        width:${6 + Math.random() * 8}px;
        height:${6 + Math.random() * 8}px;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), (dur + delay + 0.2) * 1000);
    }
  }

  /* ── LocalStorage helpers ── */
  function getStoredDiscount() {
    try { return JSON.parse(localStorage.getItem(LS_DISCOUNT)); } catch { return null; }
  }
  function setStoredDiscount(pct) {
    localStorage.setItem(LS_DISCOUNT, JSON.stringify({ pct, used: false }));
  }
  function markDiscountUsed() {
    const d = getStoredDiscount();
    if (d) localStorage.setItem(LS_DISCOUNT, JSON.stringify({ pct: d.pct, used: true }));
    localStorage.setItem(LS_SPIN_TS, String(Date.now()));
  }
  function clearDiscount() {
    localStorage.removeItem(LS_DISCOUNT);
  }

  function canShowWheel() {
    // Check if spun within the last week
    const ts = parseInt(localStorage.getItem(LS_SPIN_TS) || '0', 10);
    return Date.now() - ts >= SPIN_COOLDOWN_MS;
  }

  /* ── Active session discount (in-memory, survives page but not tab close) ── */
  // Loaded from localStorage at startup
  let sessionDiscount = null; // { pct }

  function loadSessionDiscount() {
    const stored = getStoredDiscount();
    if (stored && !stored.used) {
      sessionDiscount = { pct: stored.pct };
    } else {
      sessionDiscount = null;
    }
  }

  /* ── Apply discount to checkout display ── */
  function applyWheelDiscountToCheckout() {
    const discountRow = document.getElementById('checkout-discount-row');
    const discountAmt = document.getElementById('checkout-discount-amount');
    const totalEl     = document.getElementById('checkout-total');
    const subtotalEl  = document.getElementById('checkout-subtotal');
    const shippingEl  = document.getElementById('checkout-shipping');

    if (!discountRow || !discountAmt || !totalEl) return;

    if (sessionDiscount && sessionDiscount.pct > 0) {
      // Re-compute from raw values
      const subtotal = getCartSubtotal();
      const shipping = getCartShipping();
      const discount = Math.round(subtotal * sessionDiscount.pct / 100);
      const total    = Math.max(0, subtotal + shipping - discount);

      if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
      if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : formatPrice(shipping);
      discountAmt.textContent = `−${formatPrice(discount)}`;
      totalEl.textContent     = formatPrice(total);
      discountRow.style.display = '';
    } else {
      discountRow.style.display = 'none';
    }
  }

  /* ── Send email via worker ── */
  async function sendWheelEmail(email, pct) {
    try {
      await fetch(WHEEL_EMAIL_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pct })
      });
    } catch (err) {
      console.warn('Wheel email send failed (non-critical):', err);
    }
  }

  /* ── Close overlay ── */
  function closeWheelOverlay() {
    const overlay = document.getElementById('wheel-container');
    if (!overlay) return;
    overlay.classList.remove('wheel--open');
    document.body.classList.remove('wheel-panel-open');
  }

  /* ── Show overlay ── */
  function showWheelOverlay() {
    const overlay = document.getElementById('wheel-container');
    if (!overlay) return;
    void overlay.offsetWidth; // force reflow so transition fires
    overlay.classList.add('wheel--open');
    document.body.classList.add('wheel-panel-open');
  }

  /* ── Init ── */
  function initSpinWheel() {
    loadSessionDiscount();

    // Call renderCart immediately after loading so that any stored discount is visible in the cart drawer!
    if (typeof renderCart === 'function') renderCart();

    const overlay   = document.getElementById('wheel-container');
    const canvas    = document.getElementById('wheel-canvas');
    const spinBtn   = document.getElementById('wheel-spin-btn');
    const skipBtn   = document.getElementById('wheel-skip-btn');
    const closeBtn  = document.getElementById('wheel-close-btn');
    const shopBtn   = document.getElementById('wheel-shop-btn');
    const emailIn   = document.getElementById('wheel-email-input');
    const formWrap  = document.getElementById('wheel-form-wrap');
    const resultWrap= document.getElementById('wheel-result-wrap');
    const wonPct    = document.getElementById('wheel-won-pct');
    const spinHint  = document.getElementById('wheel-spin-hint');

    if (!overlay || !canvas || !spinBtn) return;

    // Draw initial static wheel
    drawWheel(canvas, currentAngle);

    // ── Tab button toggles the panel
    const tabBtn = document.getElementById('wheel-tab-btn');
    if (tabBtn) {
      tabBtn.addEventListener('click', () => {
        if (overlay.classList.contains('wheel--open')) {
          closeWheelOverlay();
        } else {
          showWheelOverlay();
        }
      });
    }

    // Close handlers
    const doClose = () => closeWheelOverlay();
    if (closeBtn) closeBtn.addEventListener('click', doClose);
    if (skipBtn)  skipBtn.addEventListener('click', doClose);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) doClose(); });

    // Shop Now → closes popup and opens cart
    if (shopBtn) {
      shopBtn.addEventListener('click', () => {
        doClose();
        // Optional: open cart drawer so they can proceed
        const cartBtn = document.getElementById('cart-btn');
        if (cartBtn) cartBtn.click();
      });
    }

    // SPIN
    spinBtn.addEventListener('click', async () => {
      const email = (emailIn && emailIn.value || '').trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        if (emailIn) {
          emailIn.focus();
          emailIn.style.borderColor = 'var(--accent)';
          emailIn.style.boxShadow   = '0 0 0 3px rgba(255,93,143,0.2)';
          setTimeout(() => {
            emailIn.style.borderColor = '';
            emailIn.style.boxShadow   = '';
          }, 1800);
        }
        return;
      }

      // Disable button during spin
      spinBtn.disabled = true;
      if (spinHint) spinHint.textContent = 'Spinning…';

      const winIdx  = weightedRandom();
      const winSeg  = SEGMENTS[winIdx];

      spinTo(canvas, winIdx, async () => {
        // Persist discount
        setStoredDiscount(winSeg.pct);
        sessionDiscount = { pct: winSeg.pct };

        // Re-render cart so discount row appears immediately in the bag
        if (typeof renderCart === 'function') renderCart();
        applyWheelDiscountToCheckout();

        // Show result
        if (wonPct)    wonPct.textContent   = winSeg.label;
        if (formWrap)  formWrap.style.display  = 'none';
        if (resultWrap) {
          resultWrap.style.display = '';
          // Re-trigger animation
          resultWrap.style.animation = 'none';
          void resultWrap.offsetWidth;
          resultWrap.style.animation = '';
        }
        if (spinHint) spinHint.textContent = '🎉 You won!';

        burstConfetti();

        // Notify via email (fire & forget)
        await sendWheelEmail(email, winSeg.pct);

        // Mark the spin timestamp so cooldown starts NOW
        localStorage.setItem(LS_SPIN_TS, String(Date.now()));
      });
    });

    // Show overlay after 2s delay (only if not spun in the last week)
    if (canShowWheel()) {
      setTimeout(() => {
        showWheelOverlay();
      }, 2000);
    }
  }

  /* ── Expose functions globally ── */
  window.getActiveSpinDiscount = function () { return sessionDiscount; };
  window.applyWheelDiscountToCheckout = applyWheelDiscountToCheckout;
  window.markActiveSpinDiscountUsed = function () {
    markDiscountUsed();
    sessionDiscount = null;
    applyWheelDiscountToCheckout();
  };

  /* ── Boot ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSpinWheel);
  } else {
    initSpinWheel();
  }

})();
