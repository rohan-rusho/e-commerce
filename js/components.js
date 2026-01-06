// Shared Components - Header, Footer, Product Card

// Render Header
function renderHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const cartCount = storage.getCartItemCount();

  header.innerHTML = `
    <div class="header-container">
      <div class="container">
        <div class="header-content">
          <div class="header-logo">
            <a href="index.html">
              <h1 style="font-size: 1.75rem; color: var(--color-primary); margin: 0;">
                🌿 <span style="color: var(--color-gray-900);">Green</span><span style="color: var(--color-primary);">Mart</span>
              </h1>
            </a>
          </div>
          
          <div class="header-search">
            <input type="search" id="search-input" class="search-input" placeholder="Search products...">
            <button class="search-btn">🔍</button>
          </div>
          
          <nav class="header-nav">
            <a href="index.html" class="nav-link">Home</a>
            <a href="products.html" class="nav-link">Products</a>
            <a href="cart.html" class="nav-link cart-link">
              🛒 Cart
              <span class="cart-badge" style="display: ${cartCount > 0 ? 'flex' : 'none'};">${cartCount}</span>
            </a>
            <a href="admin/login.html" class="nav-link">Admin</a>
          </nav>
          
          <button class="mobile-menu-btn" onclick="toggleMobileMenu()">☰</button>
        </div>
      </div>
    </div>
    
    <div class="mobile-menu" id="mobile-menu">
      <a href="index.html" class="mobile-nav-link">Home</a>
      <a href="products.html" class="mobile-nav-link">Products</a>
      <a href="cart.html" class="mobile-nav-link">Cart (${cartCount})</a>
      <a href="admin/login.html" class="mobile-nav-link">Admin</a>
    </div>
  `;

  // Setup search functionality
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.querySelector('.search-btn');

  const performSearch = () => {
    const query = searchInput.value.trim();
    if (query) {
      window.location.href = `products.html?search=${encodeURIComponent(query)}`;
    }
  };

  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
  });
}

// Render Footer
function renderFooter() {
  const footer = document.getElementById('footer');
  if (!footer) return;

  const currentYear = new Date().getFullYear();

  footer.innerHTML = `
    <div class="footer-container">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-col">
            <h3 class="footer-title">🌿 GreenMart</h3>
            <p class="footer-text">Your trusted online shopping destination in Bangladesh. Quality products, competitive prices, and excellent service.</p>
            <div class="footer-social">
              <a href="#" class="social-link">📘</a>
              <a href="#" class="social-link">📷</a>
              <a href="#" class="social-link">🐦</a>
            </div>
          </div>
          
          <div class="footer-col">
            <h4 class="footer-title">Quick Links</h4>
            <ul class="footer-links">
              <li><a href="index.html">Home</a></li>
              <li><a href="products.html">All Products</a></li>
              <li><a href="cart.html">Shopping Cart</a></li>
              <li><a href="admin/login.html">Admin Panel</a></li>
            </ul>
          </div>
          
          <div class="footer-col">
            <h4 class="footer-title">Customer Service</h4>
            <ul class="footer-links">
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Shipping Info</a></li>
              <li><a href="#">Returns & Exchanges</a></li>
              <li><a href="#">FAQs</a></li>
            </ul>
          </div>
          
          <div class="footer-col">
            <h4 class="footer-title">Contact</h4>
            <ul class="footer-links">
              <li>📞 +880 1234-567890</li>
              <li>✉️ support@greenmart.com</li>
              <li>📍 Dhaka, Bangladesh</li>
            </ul>
            <div class="payment-methods">
              <span class="badge badge-primary">Cash on Delivery</span>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; ${currentYear} GreenMart. All rights reserved.</p>
          <div style="margin-top: var(--spacing-sm);">
            <p style="margin-bottom: var(--spacing-xs);">Built with ❤️ for Bangladesh by <strong style="color: var(--color-primary);">Rohan Rusho</strong></p>
            <div style="display: flex; gap: var(--spacing-md); justify-content: center; margin-top: var(--spacing-sm);">
                <a href="https://www.facebook.com/eita.rohan" target="_blank" style="color: var(--color-primary); font-weight: 500;" title="Facebook">Facebook</a>
                <a href="https://www.instagram.com/rohan.rusho" target="_blank" style="color: var(--color-primary); font-weight: 500;" title="Instagram">Instagram</a>
                <a href="https://github.com/rohan-rusho" target="_blank" style="color: var(--color-primary); font-weight: 500;" title="GitHub">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Render Product Card
function renderProductCard(product) {
  const stockStatus = getStockStatus(product.stock);
  const discountBadge = product.discount > 0 ?
    `<div class="product-badge sale">${product.discount}% OFF</div>` : '';
  const newBadge = product.newArrival ?
    `<div class="product-badge new" style="left: ${product.discount > 0 ? '80px' : 'var(--spacing-md)'};">NEW</div>` : '';

  return `
    <div class="product-card" onclick="window.location.href='product.html?id=${product.id}'">
      <div class="product-card-img-wrapper">
        ${discountBadge}
        ${newBadge}
        <img src="${product.images[0]}" 
             alt="${product.name}" 
             class="product-card-img"
             onerror="this.src='https://via.placeholder.com/300x300?text=No+Image'">
      </div>
      <div class="product-card-body">
        <div class="product-category">${product.category}</div>
        <h3 class="product-title">${truncateText(product.name, 60)}</h3>
        <div class="product-rating">
          <span class="product-stars">${generateStarRating(product.rating)}</span>
          <span class="product-reviews">(${product.reviewCount})</span>
        </div>
        <div class="product-price-wrapper">
          <span class="product-price">${formatCurrency(product.price)}</span>
          ${product.originalPrice ? `<span class="product-price-original">${formatCurrency(product.originalPrice)}</span>` : ''}
        </div>
        <div class="product-stock ${stockStatus.class}">${stockStatus.text}</div>
        <div class="product-actions" onclick="event.stopPropagation()">
          <button class="btn btn-primary btn-sm" style="flex: 1;" 
                  onclick="cartManager.addToCart(productService.getProductById(${product.id}))"
                  ${product.stock === 0 ? 'disabled' : ''}>
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;
}

// Toggle mobile menu
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) {
    menu.classList.toggle('active');
  }
}

// Initialize components on page load
document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
});
