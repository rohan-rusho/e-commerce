// Main application initialization and global functions

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize product service if data is available
    if (window.ECOMMERCE_DATA) {
        productService.initialize();
    }

    // Update cart count on page load
    const cartCount = storage.getCartItemCount();
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        badge.textContent = cartCount;
        badge.style.display = cartCount > 0 ? 'flex' : 'none';
    }
});

// Add smooth scroll for anchor links
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.hash) {
        const targetId = e.target.hash.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
        }
    }, 250);
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuBtn = document.querySelector('.mobile-menu-btn');

    if (mobileMenu && mobileMenu.classList.contains('active')) {
        if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            mobileMenu.classList.remove('active');
        }
    }
});

// Add to wishlist functionality
function addToWishlist(productId) {
    const product = productService.getProductById(productId);
    if (product) {
        if (storage.isInWishlist(productId)) {
            storage.removeFromWishlist(productId);
            showToast('Removed from wishlist', 'info');
        } else {
            storage.addToWishlist(product);
            showToast('Added to wishlist!', 'success');
        }
    }
}

// Format date for display
function formatOrderDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;

    return formatDate(dateString);
}

// Print functionality
function printPage() {
    window.print();
}

// Share functionality
function shareProduct(productId) {
    const product = productService.getProductById(productId);
    if (!product) return;

    const url = `${window.location.origin}/product.html?id=${productId}`;
    const text = `Check out ${product.name} on GreenMart!`;

    if (navigator.share) {
        navigator.share({
            title: product.name,
            text: text,
            url: url
        }).catch(err => console.log('Share failed:', err));
    } else {
        copyToClipboard(url);
        showToast('Product link copied!', 'success');
    }
}

// Image error handler
function handleImageError(img) {
    img.onerror = null;
    img.src = 'https://via.placeholder.com/400x400?text=No+Image';
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // ESC key closes modals
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Console welcome message
console.log('%c🌿 Welcome to GreenMart! ', 'background: #10b981; color: white; font-size: 20px; padding: 10px;');
console.log('%cBuilt with vanilla JavaScript for maximum performance', 'color: #10b981; font-size: 14px;');
