// Storage Manager - Handles localStorage operations for cart, orders, users

class StorageManager {
    constructor() {
        this.KEYS = {
            CART: 'ecommerce_cart',
            ORDERS: 'ecommerce_orders',
            USERS: 'ecommerce_users',
            CURRENT_USER: 'ecommerce_current_user',
            ADMIN_SESSION: 'ecommerce_admin_session',
            PRODUCTS: 'ecommerce_products',
            WISHLIST: 'ecommerce_wishlist'
        };

        this.initializeStorage();
    }

    initializeStorage() {
        // Initialize cart if not exists
        if (!this.getCart()) {
            this.saveCart([]);
        }

        // Initialize orders if not exists
        if (!localStorage.getItem(this.KEYS.ORDERS)) {
            localStorage.setItem(this.KEYS.ORDERS, JSON.stringify([]));
        }

        // Initialize users if not exists
        if (!localStorage.getItem(this.KEYS.USERS)) {
            localStorage.setItem(this.KEYS.USERS, JSON.stringify([]));
        }

        // Initialize wishlist if not exists
        if (!localStorage.getItem(this.KEYS.WISHLIST)) {
            localStorage.setItem(this.KEYS.WISHLIST, JSON.stringify([]));
        }
    }

    // Cart Methods
    getCart() {
        const cart = localStorage.getItem(this.KEYS.CART);
        return cart ? JSON.parse(cart) : [];
    }

    saveCart(cart) {
        localStorage.setItem(this.KEYS.CART, JSON.stringify(cart));
        this.triggerCartUpdate();
    }

    addToCart(product, quantity = 1) {
        const cart = this.getCart();
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                ...product,
                quantity: quantity,
                addedAt: new Date().toISOString()
            });
        }

        this.saveCart(cart);
        return cart;
    }

    removeFromCart(productId) {
        const cart = this.getCart();
        const updatedCart = cart.filter(item => item.id !== productId);
        this.saveCart(updatedCart);
        return updatedCart;
    }

    updateCartItemQuantity(productId, quantity) {
        const cart = this.getCart();
        const item = cart.find(item => item.id === productId);

        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart(cart);
        }

        return cart;
    }

    clearCart() {
        this.saveCart([]);
    }

    getCartTotal() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getCartItemCount() {
        const cart = this.getCart();
        return cart.reduce((count, item) => count + item.quantity, 0);
    }

    // Wishlist Methods
    getWishlist() {
        const wishlist = localStorage.getItem(this.KEYS.WISHLIST);
        return wishlist ? JSON.parse(wishlist) : [];
    }

    addToWishlist(product) {
        const wishlist = this.getWishlist();
        const exists = wishlist.find(item => item.id === product.id);

        if (!exists) {
            wishlist.push({
                ...product,
                addedAt: new Date().toISOString()
            });
            localStorage.setItem(this.KEYS.WISHLIST, JSON.stringify(wishlist));
        }

        return wishlist;
    }

    removeFromWishlist(productId) {
        const wishlist = this.getWishlist();
        const updated = wishlist.filter(item => item.id !== productId);
        localStorage.setItem(this.KEYS.WISHLIST, JSON.stringify(updated));
        return updated;
    }

    isInWishlist(productId) {
        const wishlist = this.getWishlist();
        return wishlist.some(item => item.id === productId);
    }

    // Order Methods
    saveOrder(order) {
        const orders = this.getOrders();
        const newOrder = {
            ...order,
            id: 'ORD' + Date.now(),
            createdAt: new Date().toISOString(),
            status: 'pending'
        };
        orders.push(newOrder);
        localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(orders));
        return newOrder;
    }

    getOrders() {
        const orders = localStorage.getItem(this.KEYS.ORDERS);
        return orders ? JSON.parse(orders) : [];
    }

    getOrderById(orderId) {
        const orders = this.getOrders();
        return orders.find(order => order.id === orderId);
    }

    updateOrderStatus(orderId, status) {
        const orders = this.getOrders();
        const order = orders.find(o => o.id === orderId);

        if (order) {
            order.status = status;
            order.updatedAt = new Date().toISOString();
            localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(orders));
        }

        return order;
    }

    // Product Methods (for admin modifications)
    saveProducts(products) {
        localStorage.setItem(this.KEYS.PRODUCTS, JSON.stringify(products));
    }

    getStoredProducts() {
        const products = localStorage.getItem(this.KEYS.PRODUCTS);
        return products ? JSON.parse(products) : null;
    }

    // Admin Session Methods
    setAdminSession(admin) {
        localStorage.setItem(this.KEYS.ADMIN_SESSION, JSON.stringify({
            ...admin,
            loginTime: new Date().toISOString()
        }));
    }

    getAdminSession() {
        const session = localStorage.getItem(this.KEYS.ADMIN_SESSION);
        return session ? JSON.parse(session) : null;
    }

    clearAdminSession() {
        localStorage.removeItem(this.KEYS.ADMIN_SESSION);
    }

    isAdminLoggedIn() {
        return this.getAdminSession() !== null;
    }

    // User Methods
    saveUser(user) {
        const users = this.getUsers();
        users.push({
            ...user,
            id: 'USR' + Date.now(),
            createdAt: new Date().toISOString()
        });
        localStorage.setItem(this.KEYS.USERS, JSON.stringify(users));
    }

    getUsers() {
        const users = localStorage.getItem(this.KEYS.USERS);
        return users ? JSON.parse(users) : [];
    }

    getCurrentUser() {
        const user = localStorage.getItem(this.KEYS.CURRENT_USER);
        return user ? JSON.parse(user) : null;
    }

    setCurrentUser(user) {
        localStorage.setItem(this.KEYS.CURRENT_USER, JSON.stringify(user));
    }

    clearCurrentUser() {
        localStorage.removeItem(this.KEYS.CURRENT_USER);
    }

    // Event System for Cart Updates
    triggerCartUpdate() {
        window.dispatchEvent(new CustomEvent('cartUpdated', {
            detail: { cart: this.getCart(), count: this.getCartItemCount() }
        }));
    }
}

// Create global instance
const storage = new StorageManager();
