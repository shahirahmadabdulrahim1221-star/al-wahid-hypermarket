/* =====================================================
   Al Wahid Hyper Market — Main Script
   ===================================================== */

/* ---------- DATA ---------- */
const DEPARTMENTS = [
  { id: 'grocery',      name: 'Grocery',           icon: '🌾', color: '#16a34a', desc: 'Rice, flour, oils, spices', count: 1240 },
  { id: 'fresh',        name: 'Fresh Food',        icon: '🥬', color: '#059669', desc: 'Fruits, vegetables, meat', count: 680 },
  { id: 'beverages',    name: 'Beverages',         icon: '☕', color: '#0891b2', desc: 'Water, juices, tea, coffee', count: 420 },
  { id: 'household',    name: 'Household',         icon: '🏠', color: '#7c3aed', desc: 'Cleaning, laundry, paper', count: 560 },
  { id: 'personal',     name: 'Personal Care',     icon: '🧴', color: '#db2777', desc: 'Shampoo, soap, skincare', count: 480 },
  { id: 'baby',         name: 'Baby',              icon: '🍼', color: '#f59e0b', desc: 'Baby food, diapers, care', count: 260 },
  { id: 'electronics',  name: 'Electronics',       icon: '⚡', color: '#2563eb', desc: 'Appliances, accessories', count: 320 },
  { id: 'fashion',      name: 'Fashion',           icon: '👕', color: '#ea580c', desc: 'Clothing, shoes, bags', count: 390 },
];

const PRODUCTS = [
  { id: 'p1', name: 'Premium Basmati Rice', brand: 'Al Wahid Select', dept: 'grocery', price: 320, oldPrice: 380, discount: 16, rating: 4.8, reviews: 1240, unit: '5 kg', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80' },
  { id: 'p2', name: 'Fresh Tomatoes', brand: 'Local Farm', dept: 'fresh', price: 45, oldPrice: 60, discount: 25, rating: 4.6, reviews: 340, unit: '1 kg', image: 'https://images.unsplash.com/photo-1546470427-e5ac89c3c1c3?w=600&q=80' },
  { id: 'p3', name: 'Nestlé Pure Life Water', brand: 'Nestlé', dept: 'beverages', price: 90, rating: 4.7, reviews: 890, unit: '6-pack', image: 'https://images.unsplash.com/photo-1616118132534-381148898bb4?w=600&q=80' },
  { id: 'p4', name: 'Persil Laundry Detergent', brand: 'Persil', dept: 'household', price: 240, oldPrice: 300, discount: 20, rating: 4.5, reviews: 220, unit: '3 L', image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=600&q=80' },
  { id: 'p5', name: 'Dove Repair Shampoo', brand: 'Dove', dept: 'personal', price: 180, rating: 4.7, reviews: 560, unit: '400 ml', new: true, image: 'https://images.unsplash.com/photo-1585232004423-244e0e6904e3?w=600&q=80' },
  { id: 'p6', name: 'Pampers Baby Diapers', brand: 'Pampers', dept: 'baby', price: 420, oldPrice: 500, discount: 16, rating: 4.9, reviews: 1520, unit: 'Size 3', image: 'https://images.unsplash.com/photo-1611253052840-05e44d6e06e3?w=600&q=80' },
  { id: 'p7', name: 'Philips Electric Kettle', brand: 'Philips', dept: 'electronics', price: 950, oldPrice: 1200, discount: 21, rating: 4.6, reviews: 180, unit: '1.7 L', image: 'https://images.unsplash.com/photo-1594213114663-d94b0d2c6c40?w=600&q=80' },
  { id: 'p8', name: "Men's Cotton Shirt", brand: 'Al Wahid Fashion', dept: 'fashion', price: 650, rating: 4.4, reviews: 90, new: true, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80' },
  { id: 'p9', name: 'Fresh Chicken Breast', brand: 'Al Wahid Butcher', dept: 'fresh', price: 280, oldPrice: 320, discount: 12, rating: 4.7, reviews: 210, unit: '1 kg', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&q=80' },
  { id: 'p10', name: 'Lipton Yellow Label Tea', brand: 'Lipton', dept: 'beverages', price: 220, rating: 4.8, reviews: 720, unit: '100 bags', image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=600&q=80' },
  { id: 'p11', name: 'Fresh Bananas', brand: 'Local Farm', dept: 'fresh', price: 80, rating: 4.6, reviews: 410, unit: '1 kg', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&q=80' },
  { id: 'p12', name: 'Ariel Washing Powder', brand: 'Ariel', dept: 'household', price: 380, oldPrice: 450, discount: 15, rating: 4.6, reviews: 380, unit: '4 kg', image: 'https://images.unsplash.com/photo-1585845589298-e1a02dd2b4c8?w=600&q=80' },
];

/* ---------- STORAGE ---------- */
const storage = {
  get: (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
};

let cart = storage.get('aw_cart', []);
let wishlist = storage.get('aw_wishlist', []);

function saveCart() { storage.set('aw_cart', cart); renderCart(); updateCartCount(); }
function saveWishlist() { storage.set('aw_wishlist', wishlist); }

function updateCartCount() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const el = document.getElementById('cartCount');
  if (el) el.textContent = count;
}

/* ---------- HELPERS ---------- */
function formatAFN(n) { return n.toLocaleString('en-US') + ' AFN'; }

function toast(msg) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${msg}`;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 2200);
}

/* ---------- RENDER: PRODUCTS ---------- */
function productCardHTML(p) {
  const wished = wishlist.includes(p.id);
  const badge = p.discount
    ? `<span class="product-badge">-${p.discount}%</span>`
    : p.new ? `<span class="product-badge new">NEW</span>` : '';
  return `
    <div class="product-card">
      <div class="product-image">
        ${badge}
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
        <div class="product-actions">
          <button onclick="toggleWishlist('${p.id}')" class="${wished ? 'active' : ''}" aria-label="Wishlist">
            <i class="fa-${wished ? 'solid' : 'regular'} fa-heart"></i>
          </button>
          <button onclick="quickView('${p.id}')" aria-label="Quick view"><i class="fa-regular fa-eye"></i></button>
        </div>
        <button class="add-cart-btn" onclick="addToCart('${p.id}')">
          <i class="fa-solid fa-bag-shopping"></i> Add to Cart
        </button>
      </div>
      <div class="product-info">
        <div class="product-brand">${p.brand}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-meta">
          <span class="product-rating"><i class="fa-solid fa-star"></i> ${p.rating}</span>
          <span>(${p.reviews})</span>
          ${p.unit ? `<span>· ${p.unit}</span>` : ''}
        </div>
        <div class="product-price">
          <span class="price-current">${formatAFN(p.price)}</span>
          ${p.oldPrice ? `<span class="price-old">${formatAFN(p.oldPrice)}</span>` : ''}
        </div>
      </div>
    </div>`;
}

function renderProducts(containerId, list) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = list.map(productCardHTML).join('');
}

function renderDepartments(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = DEPARTMENTS.map(d => `
    <a href="ourservices.html#${d.id}" class="dept-card" style="--c:${d.color}">
      <style>.dept-card[style*="${d.color}"]::before{background:${d.color}}</style>
      <div class="dept-icon">${d.icon}</div>
      <h3>${d.name}</h3>
      <p>${d.desc}</p>
      <div class="dept-count">${d.count}+ products</div>
    </a>
  `).join('');
}

/* ---------- CART LOGIC ---------- */
function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const existing = cart.find(x => x.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...p, qty: 1 });
  saveCart();
  openCart();
  toast(`${p.name} added to cart`);
}

function updateQty(id, delta) {
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(x => x.id !== id);
  saveCart();
}

function removeFromCart(id) {
  cart = cart.filter(x => x.id !== id);
  saveCart();
}

function renderCart() {
  const body = document.getElementById('cartBody');
  const foot = document.getElementById('cartFoot');
  if (!body || !foot) return;

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <i class="fa-solid fa-bag-shopping"></i>
        <h3>Your cart is empty</h3>
        <p>Start shopping to fill it up with fresh groceries.</p>
        <a href="ourservices.html" class="btn btn-primary">Start Shopping</a>
      </div>`;
    foot.innerHTML = '';
    return;
  }

  body.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" />
      <div class="cart-item-info">
        <div class="cart-item-brand">${item.brand}</div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-controls">
          <div class="qty-control">
            <button onclick="updateQty('${item.id}', -1)"><i class="fa-solid fa-minus"></i></button>
            <span>${item.qty}</span>
            <button onclick="updateQty('${item.id}', 1)"><i class="fa-solid fa-plus"></i></button>
          </div>
          <span class="cart-item-price">${formatAFN(item.price * item.qty)}</span>
          <button class="cart-item-remove" onclick="removeFromCart('${item.id}')"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    </div>`).join('');

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = 100;
  const total = subtotal + delivery;

  foot.innerHTML = `
    <div class="cart-row"><span>Subtotal</span><span>${formatAFN(subtotal)}</span></div>
    <div class="cart-row"><span>Delivery</span><span>${formatAFN(delivery)}</span></div>
    <div class="cart-row total"><span>Total</span><span style="color:var(--brand)">${formatAFN(total)}</span></div>
    <button class="btn btn-primary" onclick="checkout()">Proceed to Checkout <i class="fa-solid fa-arrow-right"></i></button>
  `;
}

function checkout() {
  if (cart.length === 0) {
    toast('Your cart is empty');
    return;
  }
  window.location.href = 'checkout.html';
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartBackdrop').classList.add('open');
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartBackdrop').classList.remove('open');
}

/* ---------- WISHLIST ---------- */
function toggleWishlist(id) {
  const i = wishlist.indexOf(id);
  if (i >= 0) wishlist.splice(i, 1);
  else { wishlist.push(id); toast('Added to wishlist'); }
  saveWishlist();
  refreshProductCards();
}

function refreshProductCards() {
  renderProducts('featuredGrid', PRODUCTS.slice(0, 8));
  renderProducts('dealsGrid', PRODUCTS.filter(p => p.discount));
  renderProducts('newGrid', PRODUCTS.filter(p => p.new));
}

function quickView(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (p) toast(`Quick view: ${p.name}`);
}

/* ---------- SEARCH ---------- */
function openSearch() {
  document.getElementById('searchOverlay').classList.add('open');
  setTimeout(() => document.getElementById('searchInput').focus(), 200);
}

function closeSearch() {
  document.getElementById('searchOverlay').classList.remove('open');
  document.getElementById('searchInput').value = '';
  document.getElementById('searchResults').innerHTML = '';
}

function handleSearch(q) {
  const results = document.getElementById('searchResults');
  if (!q) { results.innerHTML = ''; return; }
  const ql = q.toLowerCase();
  const found = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(ql) ||
    p.brand.toLowerCase().includes(ql) ||
    p.dept.toLowerCase().includes(ql)
  ).slice(0, 6);

  if (found.length === 0) {
    results.innerHTML = `<div style="color:rgba(255,255,255,.5);text-align:center;padding:20px;font-size:14px;">No products found for "${q}"</div>`;
    return;
  }

  results.innerHTML = found.map(p => `
    <a href="ourservices.html" class="search-result">
      <img src="${p.image}" alt="${p.name}" />
      <div style="flex:1">
        <strong>${p.name}</strong>
        <small style="display:block">${p.brand} · ${formatAFN(p.price)}</small>
      </div>
      <i class="fa-solid fa-arrow-right" style="color:rgba(255,255,255,.4)"></i>
    </a>
  `).join('');
}

/* ---------- THEME ---------- */
function initTheme() {
  const saved = storage.get('aw_theme', null);
  const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const theme = saved || system;
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeIcon(theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  storage.set('aw_theme', next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('themeBtn');
  if (!btn) return;
  btn.innerHTML = theme === 'dark'
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
}

/* ---------- 3D HERO (Three.js) ---------- */
function initHero3D() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  // Respect reduced motion & mobile (lightweight fallback)
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(document.documentElement.getAttribute('data-theme') === 'dark' ? 0x0a0e1a : 0xf0f9ff);
  scene.fog = new THREE.Fog(scene.background, 10, 30);

  const camera = new THREE.PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 1.6, 12);
  camera.lookAt(0, 1.6, 8);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, alpha: false });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
  renderer.shadowMap.enabled = !isMobile;

  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const dir = new THREE.DirectionalLight(0xffffff, 0.8);
  dir.position.set(5, 8, 5);
  dir.castShadow = true;
  scene.add(dir);

  // Floor
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.3, metalness: 0.2 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  // Grid
  const grid = new THREE.GridHelper(40, 20, 0x94a3b8, 0xcbd5e1);
  grid.position.y = 0.01;
  scene.add(grid);

  // Ceiling lights
  const lightMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfff8e7, emissiveIntensity: 2 });
  for (let x = -4; x <= 4; x += 2.5) {
    for (let z = -3; z <= 3; z += 3) {
      const l = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.06, 0.4), lightMat);
      l.position.set(x, 4.5, z);
      scene.add(l);
    }
  }

  // Shelves
  function shelf(x) {
    const g = new THREE.Group();
    const shelfMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.6 });
    const legMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
    for (let y = 0; y <= 2.7; y += 0.9) {
      const s = new THREE.Mesh(new THREE.BoxGeometry(2, 0.08, 0.9), shelfMat);
      s.position.y = y;
      s.castShadow = true;
      g.add(s);
    }
    [-1.05, 1.05].forEach(sx => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 3, 0.9), legMat);
      leg.position.set(sx, 1.5, 0);
      leg.castShadow = true;
      g.add(leg);
    });
    // Products
    const colors = [0xfbbf24, 0x22c55e, 0x3b82f6, 0xef4444, 0xa855f7];
    for (let y = 0.28; y <= 2.98; y += 0.9) {
      for (let px = -0.6; px <= 0.6; px += 0.6) {
        const box = new THREE.Mesh(
          new THREE.BoxGeometry(0.4, 0.45, 0.5),
          new THREE.MeshStandardMaterial({ color: colors[Math.floor(Math.random() * colors.length)], roughness: 0.4 })
        );
        box.position.set(px, y, 0);
        box.castShadow = true;
        g.add(box);
      }
    }
    g.position.set(x, 0, 0);
    return g;
  }
  scene.add(shelf(-3.5));
  scene.add(shelf(3.5));

  // Shopping carts (simple)
  function cart3D(x, z) {
    const g = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.5, 1),
      new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.7, roughness: 0.3 })
    );
    body.position.y = 0.4;
    body.castShadow = true;
    g.add(body);
    g.position.set(x, 0, z);
    return g;
  }
  scene.add(cart3D(-2, 5));
  scene.add(cart3D(2, 5));

  // Entrance frame
  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(4.4, 0.15, 0.15),
    new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.7 })
  );
  frame.position.set(0, 2.9, 4);
  scene.add(frame);

  // Sliding doors (glass)
  const doorMat = new THREE.MeshPhysicalMaterial({
    color: 0xbae6fd, transmission: 0.9, roughness: 0.05, thickness: 0.5, transparent: true, opacity: 0.7
  });
  const leftDoor = new THREE.Mesh(new THREE.BoxGeometry(2, 3, 0.06), doorMat);
  const rightDoor = new THREE.Mesh(new THREE.BoxGeometry(2, 3, 0.06), doorMat);
  leftDoor.position.set(-1.1, 1.4, 4);
  rightDoor.position.set(1.1, 1.4, 4);
  scene.add(leftDoor, rightDoor);

  // Scroll camera
  let scrollY = 0;
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY / window.innerHeight;
  }, { passive: true });

  // Resize
  window.addEventListener('resize', () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  // Animate
  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += reduced ? 0.005 : 0.02;

    // Sliding doors
    const open = (Math.sin(t * 0.6) + 1) / 2;
    leftDoor.position.x = -1.1 - open * 0.9;
    rightDoor.position.x = 1.1 + open * 0.9;

    // Camera scroll
    const targetZ = 12 - Math.min(scrollY, 1) * 8;
    camera.position.z += (targetZ - camera.position.z) * 0.05;
    camera.position.y = 1.6 + Math.sin(scrollY * Math.PI) * 0.3;
    camera.lookAt(0, 1.6, camera.position.z - 4);

    renderer.render(scene, camera);
  }
  animate();
}

/* ---------- INITIALIZE ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderDepartments('deptGrid');
  renderProducts('featuredGrid', PRODUCTS.slice(0, 8));
  renderProducts('dealsGrid', PRODUCTS.filter(p => p.discount));
  renderProducts('newGrid', PRODUCTS.filter(p => p.new));
  renderCart();
  updateCartCount();
  initHero3D();

  // Navbar scroll
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  // Event listeners
  document.getElementById('cartBtn')?.addEventListener('click', openCart);
  document.getElementById('cartClose')?.addEventListener('click', closeCart);
  document.getElementById('cartBackdrop')?.addEventListener('click', closeCart);
  document.getElementById('themeBtn')?.addEventListener('click', toggleTheme);
  document.getElementById('searchBtn')?.addEventListener('click', openSearch);
  document.getElementById('searchClose')?.addEventListener('click', closeSearch);
  document.getElementById('searchInput')?.addEventListener('input', (e) => handleSearch(e.target.value));
  document.getElementById('menuBtn')?.addEventListener('click', () => {
    const links = document.getElementById('navLinks');
    links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
    links.style.position = 'absolute';
    links.style.top = '100%';
    links.style.left = '0';
    links.style.right = '0';
    links.style.flexDirection = 'column';
    links.style.background = 'var(--card)';
    links.style.padding = '12px';
    links.style.borderBottom = '1px solid var(--border)';
  });

  // ESC closes overlays
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeCart(); closeSearch(); }
  });
});

// Expose to onclick
window.addToCart = addToCart;
window.updateQty = updateQty;
window.removeFromCart = removeFromCart;
window.toggleWishlist = toggleWishlist;
window.quickView = quickView;
window.checkout = checkout;


/* ---------- PRODUCT PAGE ---------- */
function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function initProductPage() {
  const id = getQueryParam('id');
  const container = document.getElementById('productDetail');
  if (!container) return;

  const p = PRODUCTS.find(x => x.id === id) || PRODUCTS[0];
  const wished = wishlist.includes(p.id);

  container.innerHTML = `
    <div class="pd-grid">
      <div class="pd-gallery">
        <img src="${p.image}" alt="${p.name}" />
        ${p.discount ? `<span class="product-badge">-${p.discount}%</span>` : ''}
        ${p.new && !p.discount ? `<span class="product-badge new">NEW</span>` : ''}
      </div>
      <div class="pd-info">
        <div class="product-brand">${p.brand}</div>
        <h1 class="pd-title">${p.name}</h1>
        <div class="product-meta" style="margin-top:12px;">
          <span class="product-rating"><i class="fa-solid fa-star"></i> ${p.rating}</span>
          <span>(${p.reviews} reviews)</span>
          ${p.unit ? `<span>· ${p.unit}</span>` : ''}
        </div>
        <div class="pd-price">
          <span class="price-current">${formatAFN(p.price)}</span>
          ${p.oldPrice ? `<span class="price-old">${formatAFN(p.oldPrice)}</span>` : ''}
        </div>
        <p class="pd-desc">Premium quality product from Al Wahid Hyper Market. Carefully selected for our customers in Kabul. Delivered fresh to your door — or your money back.</p>
        <div class="pd-stock"><span class="dot"></span> In Stock</div>

        <div class="pd-buy-row">
          <div class="qty-control pd-qty">
            <button onclick="pdQty(-1)"><i class="fa-solid fa-minus"></i></button>
            <span id="pdQty">1</span>
            <button onclick="pdQty(1)"><i class="fa-solid fa-plus"></i></button>
          </div>
          <button class="btn btn-primary pd-add" onclick="pdAddToCart('${p.id}')">
            <i class="fa-solid fa-bag-shopping"></i> Add to Cart
          </button>
          <button class="btn btn-ghost pd-wish ${wished ? 'active' : ''}" onclick="toggleWishlist('${p.id}'); this.classList.toggle('active');">
            <i class="fa-${wished ? 'solid' : 'regular'} fa-heart"></i>
          </button>
        </div>

        <button class="btn btn-primary pd-buy-now" onclick="pdBuyNow('${p.id}')">
          <i class="fa-solid fa-bolt"></i> Buy Now
        </button>

        <div class="pd-features">
          <div><i class="fa-solid fa-truck-fast"></i> <strong>Free delivery</strong> over 500 AFN in Kabul</div>
          <div><i class="fa-solid fa-shield-halved"></i> <strong>Fresh guarantee</strong> or money back</div>
          <div><i class="fa-solid fa-rotate-left"></i> <strong>Easy returns</strong> within 24 hours</div>
        </div>
      </div>
    </div>
  `;

  // Related products
  const related = PRODUCTS.filter(x => x.id !== p.id && x.dept === p.dept).slice(0, 4);
  const relGrid = document.getElementById('relatedGrid');
  if (relGrid && related.length) relGrid.innerHTML = related.map(productCardHTML).join('');
}

let pdQuantity = 1;
function pdQty(delta) {
  pdQuantity = Math.max(1, pdQuantity + delta);
  const el = document.getElementById('pdQty');
  if (el) el.textContent = pdQuantity;
}

function pdAddToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const existing = cart.find(x => x.id === id);
  if (existing) existing.qty += pdQuantity;
  else cart.push({ ...p, qty: pdQuantity });
  saveCart();
  openCart();
  toast(`${p.name} (×${pdQuantity}) added to cart`);
  pdQuantity = 1;
  const el = document.getElementById('pdQty');
  if (el) el.textContent = 1;
}

function pdBuyNow(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  cart = [{ ...p, qty: pdQuantity }];
  saveCart();
  window.location.href = 'checkout.html';
}

/* ---------- CHECKOUT PAGE ---------- */
function initCheckoutPage() {
  const summary = document.getElementById('checkoutSummary');
  if (!summary) return;
  renderCheckoutSummary();

  // Step navigation
  document.querySelectorAll('[data-step-btn]').forEach(btn => {
    btn.addEventListener('click', () => goStep(+btn.dataset.stepBtn));
  });
}

function renderCheckoutSummary() {
  const box = document.getElementById('checkoutSummary');
  const items = document.getElementById('checkoutItems');
  if (!box || !items) return;

  if (cart.length === 0) {
    items.innerHTML = `<p style="color:var(--muted);padding:20px 0;">Your cart is empty. <a href="ourservices.html" style="color:var(--brand);">Shop now</a></p>`;
    box.innerHTML = '';
    return;
  }

  items.innerHTML = cart.map(item => `
    <div class="checkout-item">
      <img src="${item.image}" alt="${item.name}" />
      <div style="flex:1">
        <div class="product-brand">${item.brand}</div>
        <div style="font-size:13px;font-weight:500;">${item.name}</div>
        <div style="font-size:12px;color:var(--muted);">Qty ${item.qty} × ${formatAFN(item.price)}</div>
      </div>
      <div style="font-family:'Sora';font-weight:700;color:var(--brand);font-size:14px;">${formatAFN(item.price * item.qty)}</div>
    </div>
  `).join('');

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = subtotal >= 500 ? 0 : 100;
  const total = subtotal + delivery;

  box.innerHTML = `
    <div class="cart-row"><span>Subtotal</span><span>${formatAFN(subtotal)}</span></div>
    <div class="cart-row"><span>Delivery</span><span>${delivery === 0 ? 'FREE' : formatAFN(delivery)}</span></div>
    <div class="cart-row total"><span>Total</span><span style="color:var(--brand)">${formatAFN(total)}</span></div>
  `;
}

function goStep(step) {
  document.querySelectorAll('.checkout-step').forEach(s => s.classList.remove('active'));
  document.getElementById('step' + step)?.classList.add('active');

  document.querySelectorAll('.checkout-progress-item').forEach((s, i) => {
    s.classList.toggle('active', i + 1 === step);
    s.classList.toggle('done', i + 1 < step);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextStep(from) {
  // Basic validation
  if (from === 1) {
    const name = document.getElementById('custName')?.value.trim();
    const phone = document.getElementById('custPhone')?.value.trim();
    if (!name || !phone) { toast('Please enter your name and phone'); return; }
  }
  if (from === 2) {
    const addr = document.getElementById('custAddress')?.value.trim();
    if (!addr) { toast('Please enter your address'); return; }
  }
  goStep(from + 1);
}

function placeOrder() {
  if (cart.length === 0) { toast('Cart is empty'); return; }

  const order = {
    id: 'AW-' + Date.now().toString().slice(-6),
    items: cart,
    total: cart.reduce((s, i) => s + i.price * i.qty, 0),
    date: new Date().toISOString(),
    name: document.getElementById('custName')?.value || '',
    phone: document.getElementById('custPhone')?.value || '',
    address: document.getElementById('custAddress')?.value || '',
    payment: document.querySelector('input[name="payment"]:checked')?.value || 'cod',
  };

  storage.set('aw_last_order', order);
  cart = [];
  saveCart();
  window.location.href = 'order-success.html';
}

function initOrderSuccess() {
  const box = document.getElementById('orderDetails');
  if (!box) return;
  const order = storage.get('aw_last_order', null);
  if (!order) {
    box.innerHTML = '<p style="color:var(--muted);">No order found.</p>';
    return;
  }
  box.innerHTML = `
    <div class="order-meta">
      <div><span>Order Number</span><strong>${order.id}</strong></div>
      <div><span>Date</span><strong>${new Date(order.date).toLocaleString()}</strong></div>
      <div><span>Payment</span><strong>${order.payment === 'cod' ? 'Cash on Delivery' : 'Card'}</strong></div>
      <div><span>Deliver to</span><strong>${order.name || '—'}, ${order.phone || ''}</strong></div>
      <div><span>Address</span><strong>${order.address || '—'}</strong></div>
    </div>
    <div class="checkout-items" style="margin-top:20px;">
      ${order.items.map(i => `
        <div class="checkout-item">
          <img src="${i.image}" alt="${i.name}" />
          <div style="flex:1">
            <div style="font-size:13px;font-weight:500;">${i.name}</div>
            <div style="font-size:12px;color:var(--muted);">Qty ${i.qty}</div>
          </div>
          <div style="font-weight:700;color:var(--brand);font-size:14px;">${formatAFN(i.price * i.qty)}</div>
        </div>
      `).join('')}
    </div>
    <div class="cart-row total" style="margin-top:16px;"><span>Total Paid</span><span style="color:var(--brand)">${formatAFN(order.total)}</span></div>
  `;
}
