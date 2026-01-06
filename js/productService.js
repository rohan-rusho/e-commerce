// Product Service - Handles product operations, filtering, search

class ProductService {
    constructor() {
        this.products = [];
        this.categories = [];
        this.filteredProducts = [];
        this.currentFilters = {
            category: null,
            subcategory: null,
            priceMin: 0,
            priceMax: Infinity,
            search: '',
            rating: 0,
            inStock: false
        };
        this.currentSort = 'featured';
        this.currentPage = 1;
        this.itemsPerPage = 20;
    }

    initialize() {
        // Load products from generated data
        if (window.ECOMMERCE_DATA) {
            this.products = window.ECOMMERCE_DATA.products;
            this.categories = window.ECOMMERCE_DATA.categories;
            this.filteredProducts = [...this.products];

            // Check if there are stored modifications
            const storedProducts = storage.getStoredProducts();
            if (storedProducts) {
                this.products = storedProducts;
                this.filteredProducts = [...this.products];
            }
        }
    }

    getProducts(page = 1, itemsPerPage = 20) {
        this.currentPage = page;
        this.itemsPerPage = itemsPerPage;

        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        return {
            products: this.filteredProducts.slice(start, end),
            total: this.filteredProducts.length,
            page: page,
            totalPages: Math.ceil(this.filteredProducts.length / itemsPerPage)
        };
    }

    getProductById(id) {
        return this.products.find(p => p.id === parseInt(id));
    }

    searchProducts(query) {
        if (!query || query.trim() === '') {
            this.currentFilters.search = '';
            this.applyFilters();
            return this.filteredProducts;
        }

        const lowerQuery = query.toLowerCase();
        this.currentFilters.search = query;

        this.filteredProducts = this.products.filter(product => {
            return product.name.toLowerCase().includes(lowerQuery) ||
                product.description.toLowerCase().includes(lowerQuery) ||
                product.category.toLowerCase().includes(lowerQuery) ||
                product.subcategory.toLowerCase().includes(lowerQuery) ||
                product.sku.toLowerCase().includes(lowerQuery);
        });

        this.applySort();
        return this.filteredProducts;
    }

    filterByCategory(category, subcategory = null) {
        this.currentFilters.category = category;
        this.currentFilters.subcategory = subcategory;
        this.applyFilters();
        return this.filteredProducts;
    }

    filterByPrice(min, max) {
        this.currentFilters.priceMin = min;
        this.currentFilters.priceMax = max;
        this.applyFilters();
        return this.filteredProducts;
    }

    filterByRating(minRating) {
        this.currentFilters.rating = minRating;
        this.applyFilters();
        return this.filteredProducts;
    }

    filterByStock(inStockOnly) {
        this.currentFilters.inStock = inStockOnly;
        this.applyFilters();
        return this.filteredProducts;
    }

    applyFilters() {
        this.filteredProducts = this.products.filter(product => {
            // Category filter
            if (this.currentFilters.category && product.category !== this.currentFilters.category) {
                return false;
            }

            // Subcategory filter
            if (this.currentFilters.subcategory && product.subcategory !== this.currentFilters.subcategory) {
                return false;
            }

            // Price filter
            if (product.price < this.currentFilters.priceMin || product.price > this.currentFilters.priceMax) {
                return false;
            }

            // Rating filter
            if (product.rating < this.currentFilters.rating) {
                return false;
            }

            // Stock filter
            if (this.currentFilters.inStock && product.stock === 0) {
                return false;
            }

            // Search filter
            if (this.currentFilters.search) {
                const query = this.currentFilters.search.toLowerCase();
                const searchable = `${product.name} ${product.description} ${product.category} ${product.subcategory}`.toLowerCase();
                if (!searchable.includes(query)) {
                    return false;
                }
            }

            return true;
        });

        this.applySort();
    }

    sortProducts(sortBy) {
        this.currentSort = sortBy;
        this.applySort();
        return this.filteredProducts;
    }

    applySort() {
        switch (this.currentSort) {
            case 'price-low':
                this.filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                this.filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                this.filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                this.filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'popular':
                this.filteredProducts.sort((a, b) => b.reviewCount - a.reviewCount);
                break;
            case 'featured':
            default:
                this.filteredProducts.sort((a, b) => {
                    if (a.featured && !b.featured) return -1;
                    if (!a.featured && b.featured) return 1;
                    return b.rating - a.rating;
                });
                break;
        }
    }

    clearFilters() {
        this.currentFilters = {
            category: null,
            subcategory: null,
            priceMin: 0,
            priceMax: Infinity,
            search: '',
            rating: 0,
            inStock: false
        };
        this.filteredProducts = [...this.products];
        this.applySort();
        return this.filteredProducts;
    }

    getFeaturedProducts(limit = 8) {
        return this.products.filter(p => p.featured).slice(0, limit);
    }

    getBestSellingProducts(limit = 8) {
        return this.products.filter(p => p.bestSelling).slice(0, limit);
    }

    getNewArrivals(limit = 8) {
        return this.products.filter(p => p.newArrival).slice(0, limit);
    }

    getRelatedProducts(productId, limit = 4) {
        const product = this.getProductById(productId);
        if (!product) return [];

        return this.products
            .filter(p => p.id !== productId && p.subcategory === product.subcategory)
            .slice(0, limit);
    }

    getCategories() {
        return this.categories;
    }

    getSubcategories(category) {
        const cat = this.categories.find(c => c.name === category);
        return cat ? cat.subcategories : [];
    }

    // Admin methods
    addProduct(product) {
        const newProduct = {
            ...product,
            id: this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1,
            createdAt: new Date().toISOString(),
            featured: false,
            bestSelling: false,
            newArrival: true
        };

        this.products.push(newProduct);
        storage.saveProducts(this.products);
        this.applyFilters();
        return newProduct;
    }

    updateProduct(id, updates) {
        const index = this.products.findIndex(p => p.id === parseInt(id));
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updates };
            storage.saveProducts(this.products);
            this.applyFilters();
            return this.products[index];
        }
        return null;
    }

    deleteProduct(id) {
        const index = this.products.findIndex(p => p.id === parseInt(id));
        if (index !== -1) {
            this.products.splice(index, 1);
            storage.saveProducts(this.products);
            this.applyFilters();
            return true;
        }
        return false;
    }

    updateStock(id, quantity) {
        const product = this.getProductById(id);
        if (product) {
            product.stock += quantity;
            storage.saveProducts(this.products);
            return product;
        }
        return null;
    }
}

// Create global instance
const productService = new ProductService();
