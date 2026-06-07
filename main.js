/* ╔══════════════════════════════════════════════════════════════╗
   ║  dailystoptoshop — Main JavaScript                          ║
   ║  Cart, navigation, animations, Razorpay, particles          ║
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
      './products/cup.webp'
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
    inStock: true
  },
  {
    id: 'black-cat',
    name: 'Black Cat Plushie',
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
    description: 'Soft, huggable & irresistibly cute companion.',
    features: [
      'Premium ultra-soft plush',
      'Perfect cuddle size',
      'Detailed stitching',
      'Great gift for any age'
    ],
    inStock: true
  },
  {
    id: 'happy-puppy',
    name: 'Happy Puppy Plushie',
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
    description: 'A cheerful pup that brings instant smiles.',
    features: [
      'Premium ultra-soft plush',
      'Perfect cuddle size',
      'Detailed stitching',
      'Great gift for any age'
    ],
    inStock: true
  },
  {
    id: 'cute-rabbit',
    name: 'Cute Rabbit Plushie',
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
    description: 'An adorable bunny with floppy charm.',
    features: [
      'Premium ultra-soft plush',
      'Perfect cuddle size',
      'Detailed stitching',
      'Great gift for any age'
    ],
    inStock: true
  },
  {
    id: 'sleeping-bear',
    name: 'Sleeping Bear Plushie',
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
    description: 'A dreamy, sleepy bear ready for snuggles.',
    features: [
      'Premium ultra-soft plush',
      'Perfect cuddle size',
      'Detailed stitching',
      'Great gift for any age'
    ],
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

  // Briefly change button text
  const btn = document.querySelector(`[data-product-id="${productId}"]`);
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

function getCartTotal() {
  return cart.reduce((total, item) => {
    const product = products.find(p => p.id === item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
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
  const total = getCartTotal();

  // Update badge
  cartCountEl.textContent = count;
  if (count > 0) {
    cartCountEl.classList.add('has-items');
  } else {
    cartCountEl.classList.remove('has-items');
  }

  // Update totals
  cartSubtotal.textContent = formatPrice(total);
  cartTotal.textContent = formatPrice(total);

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
        <h3>${product.name}</h3>
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

    // Autoplay the video when the card enters the viewport (no hover needed).
    if (hasVideo && 'IntersectionObserver' in window) {
      const vis = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            // Jump to the video slide and play it.
            if (index !== videoIndex) goTo(videoIndex);
            else playVideoIn(slider);
          } else {
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

  // Smooth scroll + close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
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
// 12. RAZORPAY CHECKOUT
// ───────────────────────────────────────────
function initiateCheckout() {
  const total = getCartTotal();
  const count = getCartCount();

  if (count === 0) return;

  // Check if Razorpay is loaded
  if (typeof Razorpay === 'undefined') {
    showToast('Payment gateway loading... Please try again.');
    return;
  }

  const options = {
    key: 'RAZORPAY_KEY_PLACEHOLDER', // Replace with your Razorpay Key ID
    amount: total * 100, // Amount in paise
    currency: 'INR',
    name: 'dailystoptoshop',
    description: `Order — ${count} item(s)`,
    image: './assets/logo.webp',
    handler: function (response) {
      // Payment successful
      showToast('Payment successful! 🎉 Order confirmed!');
      cart = [];
      saveCart();
      renderCart();
      closeCart();
    },
    prefill: {},
    theme: {
      color: '#f59e0b'
    },
    modal: {
      ondismiss: function () {
        showToast('Payment cancelled. Your bag is still waiting! 🛒');
      }
    }
  };

  try {
    const rzp = new Razorpay(options);
    rzp.on('payment.failed', function (response) {
      showToast('Payment failed. Please try again.');
      console.error('Payment failed:', response.error);
    });
    rzp.open();
  } catch (e) {
    console.error('Razorpay error:', e);
    showToast('Payment gateway not configured yet. Contact us!');
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

      // Close mobile menu
      const hamburger = document.getElementById('hamburger');
      const navbar = document.getElementById('navbar');
      if (hamburger) hamburger.classList.remove('active');
      if (navbar) navbar.classList.remove('nav-open');
    }
  });
}


// ───────────────────────────────────────────
// 16. INITIALIZATION
// ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Render products
  renderProducts();

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

  // Checkout button
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', initiateCheckout);
  }

  // Re-initialize Lucide icons after dynamic content is rendered
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  console.log('%c✦ dailystoptoshop loaded ✦', 'color: #f59e0b; font-size: 16px; font-weight: bold;');
});
