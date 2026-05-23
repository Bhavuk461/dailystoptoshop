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
    price: 4999,
    originalPrice: 5999,
    currency: 'INR',
    image: './products/cup.jpeg',
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
  }
];


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
        <img src="${product.image}" alt="${product.name}">
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

  grid.innerHTML = products.map(product => `
    <div class="product-card fade-in">
      <div class="product-image-wrapper" onclick="openProductModal('${product.image}')">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
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
  `).join('');
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
// 10. PARTICLE BACKGROUND
// ───────────────────────────────────────────
function setupParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const hero = document.getElementById('hero');
  let particles = [];
  let animationId;

  const colors = [
    'rgba(245, 158, 11, ',  // amber
    'rgba(236, 72, 153, ',  // pink
    'rgba(139, 92, 246, '   // purple
  ];

  function resize() {
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }

  function createParticles() {
    const count = window.innerWidth < 768 ? 35 : 60;
    particles = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -Math.random() * 0.4 - 0.1,
        opacity: Math.random() * 0.4 + 0.15,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.opacity + ')';
      ctx.fill();

      // Move particle
      p.x += p.speedX;
      p.y += p.speedY;

      // Wrap around
      if (p.y < -10) {
        p.y = canvas.height + 10;
        p.x = Math.random() * canvas.width;
      }
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;

      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(200, 120, 0, ${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });

    animationId = requestAnimationFrame(drawParticles);
  }

  resize();
  createParticles();
  drawParticles();

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });

  // Pause when not visible for performance
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!animationId) drawParticles();
      } else {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    });
  });

  observer.observe(hero);
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
    image: './assets/logo.png',
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
  setupParticles();
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
