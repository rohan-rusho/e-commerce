// Utility Functions

// Format currency in BDT
function formatCurrency(amount) {
    return `৳ ${amount.toLocaleString('en-BD')}`;
}

// Calculate discount percentage
function calculateDiscount(originalPrice, discountedPrice) {
    if (!originalPrice || originalPrice <= discountedPrice) return 0;
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
}

// Generate star rating HTML
function generateStarRating(rating, maxStars = 5) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

    let html = '';

    for (let i = 0; i < fullStars; i++) {
        html += '<span class="star-full">★</span>';
    }

    if (hasHalfStar) {
        html += '<span class="star-half">★</span>';
    }

    for (let i = 0; i < emptyStars; i++) {
        html += '<span class="star-empty">★</span>';
    }

    return html;
}

// Show toast notification
function showToast(message, type = 'info', duration = 3000) {
    const toastContainer = document.getElementById('toast-container') || createToastContainer();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };

    toast.innerHTML = `
    <div class="toast-icon">${icons[type] || icons.info}</div>
    <div class="toast-content">
      <div class="toast-message">${message}</div>
    </div>
  `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
}

function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
}

// Show modal
function showModal(title, content, actions = []) {
    const modalOverlay = document.getElementById('modal-overlay') || createModalOverlay();
    const modal = modalOverlay.querySelector('.modal');

    let actionsHTML = '';
    if (actions.length > 0) {
        actionsHTML = '<div class="modal-footer">';
        actions.forEach(action => {
            actionsHTML += `<button class="btn ${action.class || 'btn-primary'}" onclick="${action.onClick}">${action.label}</button>`;
        });
        actionsHTML += '</div>';
    }

    modal.innerHTML = `
    <div class="modal-header">
      <h3 class="modal-title">${title}</h3>
      <button class="modal-close" onclick="closeModal()">&times;</button>
    </div>
    <div class="modal-body">
      ${content}
    </div>
    ${actionsHTML}
  `;

    modalOverlay.classList.add('active');
}

function createModalOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'modal-overlay';
    overlay.className = 'modal-overlay';
    overlay.innerHTML = '<div class="modal"></div>';
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    });
    document.body.appendChild(overlay);
    return overlay;
}

function closeModal() {
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
    }
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Get stock status
function getStockStatus(stock) {
    if (stock === 0) return { text: 'Out of Stock', class: 'out-stock' };
    if (stock < 10) return { text: `Only ${stock} left`, class: 'low-stock' };
    return { text: 'In Stock', class: 'in-stock' };
}

// Truncate text
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Scroll to top
function scrollToTop(smooth = true) {
    window.scrollTo({
        top: 0,
        behavior: smooth ? 'smooth' : 'auto'
    });
}

// Get URL parameter
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Set URL parameter
function setUrlParameter(name, value) {
    const url = new URL(window.location);
    url.searchParams.set(name, value);
    window.history.pushState({}, '', url);
}

// Remove URL parameter
function removeUrlParameter(name) {
    const url = new URL(window.location);
    url.searchParams.delete(name);
    window.history.pushState({}, '', url);
}

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate phone (Bangladesh format)
function validatePhone(phone) {
    const re = /^(\+88)?01[3-9]\d{8}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Generate unique ID
function generateId() {
    return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Loading state
function showLoading(element) {
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }
    if (element) {
        element.classList.add('loading');
        element.style.pointerEvents = 'none';
    }
}

function hideLoading(element) {
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }
    if (element) {
        element.classList.remove('loading');
        element.style.pointerEvents = '';
    }
}

// Create skeleton loader
function createSkeleton(type = 'product-card', count = 1) {
    let html = '';

    if (type === 'product-card') {
        for (let i = 0; i < count; i++) {
            html += `
        <div class="product-card">
          <div class="skeleton skeleton-img"></div>
          <div class="product-card-body">
            <div class="skeleton skeleton-text" style="width: 60%;"></div>
            <div class="skeleton skeleton-text" style="width: 80%;"></div>
            <div class="skeleton skeleton-text" style="width: 40%;"></div>
          </div>
        </div>
      `;
        }
    }

    return html;
}

// Animate number counting
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        element.textContent = current;

        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Copy to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Copied to clipboard!', 'success');
        }).catch(() => {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
        document.execCommand('copy');
        showToast('Copied to clipboard!', 'success');
    } catch (err) {
        showToast('Failed to copy', 'error');
    }

    document.body.removeChild(textArea);
}
