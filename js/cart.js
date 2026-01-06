// Cart Manager - Handles cart UI updates and operations

class CartManager {
    constructor() {
        this.cartCountElement = null;
        this.init();
    }

    init() {
        // Listen for cart updates
        window.addEventListener('cartUpdated', (event) => {
            this.updateCartCount(event.detail.count);
        });

        // Update cart count on page load
        setTimeout(() => {
            this.updateCartCount(storage.getCartItemCount());
        }, 100);
    }

    updateCartCount(count) {
        const badge = document.querySelector('.cart-badge');
        if (badge) {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        }
    }

    addToCart(product, quantity = 1) {
        if (product.stock === 0) {
            showToast('This product is out of stock', 'error');
            return;
        }

        if (quantity > product.stock) {
            showToast(`Only ${product.stock} items available`, 'warning');
            return;
        }

        storage.addToCart(product, quantity);
        showToast(`${product.name} added to cart!`, 'success');
    }

    removeFromCart(productId) {
        storage.removeFromCart(productId);
        showToast('Item removed from cart', 'info');
        this.renderCart();
    }

    updateQuantity(productId, quantity) {
        if (quantity < 1) {
            this.removeFromCart(productId);
            return;
        }

        const cart = storage.getCart();
        const item = cart.find(item => item.id === productId);

        if (item && quantity > item.stock) {
            showToast(`Only ${item.stock} items available`, 'warning');
            return;
        }

        storage.updateCartItemQuantity(productId, quantity);
        this.renderCart();
    }

    renderCart() {
        const container = document.getElementById('cart-items');
        if (!container) return;

        const cart = storage.getCart();

        if (cart.length === 0) {
            container.innerHTML = `
        <div class="empty-state">
          <div style="font-size: 4rem; margin-bottom: 1rem;">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Add some products to get started!</p>
          <a href="products.html" class="btn btn-primary" style="margin-top: 1rem;">Browse Products</a>
        </div>
      `;
            this.updateCartSummary();
            return;
        }

        const cartHTML = cart.map(item => {
            const stockStatus = getStockStatus(item.stock);

            return `
        <div class="cart-item" data-id="${item.id}">
          <div class="cart-item-img">
            <img src="${item.images[0]}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/150'">
          </div>
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.name}</h4>
            <p class="cart-item-category">${item.category} > ${item.subcategory}</p>
            <p class="product-stock ${stockStatus.class}">${stockStatus.text}</p>
          </div>
          <div class="cart-item-price">
            ${formatCurrency(item.price)}
          </div>
          <div class="cart-item-quantity">
            <button class="quantity-btn" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
            <input type="number" value="${item.quantity}" min="1" max="${item.stock}" 
                   onchange="cartManager.updateQuantity(${item.id}, parseInt(this.value))">
            <button class="quantity-btn" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
          </div>
          <div class="cart-item-subtotal">
            ${formatCurrency(item.price * item.quantity)}
          </div>
          <button class="cart-item-remove" onclick="cartManager.removeFromCart(${item.id})" title="Remove">
            <span>×</span>
          </button>
        </div>
      `;
        }).join('');

        container.innerHTML = cartHTML;
        this.updateCartSummary();
    }

    updateCartSummary() {
        const cart = storage.getCart();
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discount = cart.reduce((sum, item) => {
            if (item.originalPrice) {
                return sum + ((item.originalPrice - item.price) * item.quantity);
            }
            return sum;
        }, 0);
        const shipping = subtotal > 0 ? (subtotal > 2000 ? 0 : 100) : 0;
        const total = subtotal + shipping;

        const summaryElement = document.getElementById('cart-summary');
        if (summaryElement) {
            summaryElement.innerHTML = `
        <div class="summary-row">
          <span>Subtotal:</span>
          <span>${formatCurrency(subtotal)}</span>
        </div>
        ${discount > 0 ? `
        <div class="summary-row discount">
          <span>Discount:</span>
          <span>-${formatCurrency(discount)}</span>
        </div>
        ` : ''}
        <div class="summary-row">
          <span>Shipping:</span>
          <span>${shipping === 0 ? 'FREE' : formatCurrency(shipping)}</span>
        </div>
        ${subtotal > 0 && subtotal < 2000 ? `
        <p class="free-shipping-notice">Add ${formatCurrency(2000 - subtotal)} more for FREE shipping!</p>
        ` : ''}
        <div class="summary-row total">
          <span>Total:</span>
          <span>${formatCurrency(total)}</span>
        </div>
        ${cart.length > 0 ? `
        <button class="btn btn-primary btn-block" onclick="window.location.href='checkout.html'">
          Proceed to Checkout
        </button>
        <a href="products.html" class="btn btn-secondary btn-block" style="text-align: center;">
          Continue Shopping
        </a>
        ` : ''}
      `;
        }
    }

    clearCart() {
        if (confirm('Are you sure you want to clear your cart?')) {
            storage.clearCart();
            showToast('Cart cleared', 'info');
            this.renderCart();
        }
    }
}

// Create global instance
const cartManager = new CartManager();
