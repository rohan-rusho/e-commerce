// Product Data Generator - Creates 1000+ Realistic Products

const CATEGORIES = [
    {
        id: 1,
        name: 'Electronics',
        subcategories: ['Smartphones', 'Laptops', 'Tablets', 'Headphones', 'Cameras', 'Smartwatches']
    },
    {
        id: 2,
        name: 'Fashion',
        subcategories: ['Men\'s Clothing', 'Women\'s Clothing', 'Shoes', 'Accessories', 'Jewelry', 'Bags']
    },
    {
        id: 3,
        name: 'Home & Living',
        subcategories: ['Furniture', 'Decor', 'Kitchen', 'Bedding', 'Lighting', 'Storage']
    },
    {
        id: 4,
        name: 'Beauty & Health',
        subcategories: ['Skincare', 'Makeup', 'Fragrances', 'Haircare', 'Supplements', 'Personal Care']
    },
    {
        id: 5,
        name: 'Sports & Outdoors',
        subcategories: ['Fitness Equipment', 'Sports Gear', 'Camping', 'Cycling', 'Swimming', 'Yoga']
    },
    {
        id: 6,
        name: 'Books & Media',
        subcategories: ['Fiction', 'Non-Fiction', 'Comics', 'Music', 'Movies', 'Magazines']
    },
    {
        id: 7,
        name: 'Toys & Games',
        subcategories: ['Action Figures', 'Board Games', 'Puzzles', 'Educational Toys', 'Video Games', 'Outdoor Toys']
    },
    {
        id: 8,
        name: 'Automotive',
        subcategories: ['Car Accessories', 'Tools', 'Car Care', 'Electronics', 'Parts', 'Safety']
    }
];

const PRODUCT_PREFIXES = {
    'Electronics': ['Premium', 'Pro', 'Ultra', 'Smart', 'Advanced', 'Digital', 'Wireless'],
    'Fashion': ['Stylish', 'Premium', 'Designer', 'Elegant', 'Trendy', 'Classic', 'Modern'],
    'Home & Living': ['Luxury', 'Modern', 'Classic', 'Elegant', 'Comfortable', 'Stylish', 'Premium'],
    'Beauty & Health': ['Natural', 'Organic', 'Professional', 'Premium', 'Advanced', 'Botanical', 'Clinical'],
    'Sports & Outdoors': ['Pro', 'Elite', 'Advanced', 'Professional', 'Performance', 'Dynamic', 'Ultimate'],
    'Books & Media': ['Bestselling', 'Popular', 'Classic', 'Contemporary', 'Acclaimed', 'Award-winning'],
    'Toys & Games': ['Educational', 'Interactive', 'Fun', 'Creative', 'Exciting', 'Entertaining'],
    'Automotive': ['Professional', 'Heavy-Duty', 'Premium', 'Advanced', 'Reliable', 'Durable']
};

const ADJECTIVES = ['Amazing', 'Excellent', 'Fantastic', 'Outstanding', 'Superior', 'Quality', 'Deluxe'];

const REVIEWS_TEMPLATES = [
    'Great product! Exactly what I needed.',
    'Very satisfied with this purchase. Highly recommended!',
    'Good quality for the price.',
    'Fast delivery and excellent product.',
    'Love it! Will buy again.',
    'Perfect! Exceeded my expectations.',
    'Decent product, does the job.',
    'Nice quality and good value.',
    'Happy with my purchase.',
    'Would recommend to friends and family.'
];

const REVIEWER_NAMES = ['Ahmed', 'Fatima', 'Rahim', 'Ayesha', 'Karim', 'Nadia', 'Hasan', 'Sara', 'Tariq', 'Zainab'];

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateSKU() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const sku = Array.from({ length: 3 }, () => letters[Math.floor(Math.random() * letters.length)]).join('') +
        '-' + getRandomInt(1000, 9999);
    return sku;
}

function generateReviews(count) {
    const reviews = [];
    for (let i = 0; i < count; i++) {
        reviews.push({
            id: i + 1,
            userName: getRandomElement(REVIEWER_NAMES),
            rating: getRandomInt(3, 5),
            comment: getRandomElement(REVIEWS_TEMPLATES),
            date: new Date(Date.now() - getRandomInt(0, 90) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        });
    }
    return reviews;
}

function generateProducts() {
    const products = [];
    let productId = 1;

    CATEGORIES.forEach(category => {
        category.subcategories.forEach(subcategory => {
            // Generate 20-25 products per subcategory to get 1000+ total
            const numProducts = getRandomInt(20, 25);

            for (let i = 0; i < numProducts; i++) {
                const prefix = getRandomElement(PRODUCT_PREFIXES[category.name]);
                const adjective = getRandomElement(ADJECTIVES);
                const productName = `${prefix} ${adjective} ${subcategory.replace(/[^a-zA-Z ]/g, '')} ${getRandomInt(100, 999)}`;

                const basePrice = getRandomInt(500, 50000);
                const discountPercent = getRandomInt(0, 50);
                const discount = Math.round(basePrice * discountPercent / 100);
                const price = basePrice - discount;

                const stock = getRandomInt(0, 200);
                const rating = (getRandomInt(30, 50) / 10).toFixed(1);
                const reviewCount = getRandomInt(5, 150);

                // Generate placeholder image URL
                const imageId = getRandomInt(1, 1000);
                const images = [
                    `https://picsum.photos/seed/${productId}/600/600`,
                    `https://picsum.photos/seed/${productId + 1000}/600/600`,
                    `https://picsum.photos/seed/${productId + 2000}/600/600`
                ];

                products.push({
                    id: productId,
                    name: productName,
                    description: `Experience the excellence of our ${productName.toLowerCase()}. This premium product from the ${subcategory} category offers outstanding quality and performance. Perfect for anyone looking for reliability and style. Made with care and attention to detail, this product will exceed your expectations. Features include durability, modern design, and exceptional value for money.`,
                    price: price,
                    originalPrice: discountPercent > 0 ? basePrice : null,
                    discount: discountPercent,
                    currency: '৳',
                    images: images,
                    category: category.name,
                    subcategory: subcategory,
                    stock: stock,
                    sku: generateSKU(),
                    rating: parseFloat(rating),
                    reviewCount: reviewCount,
                    reviews: generateReviews(Math.min(reviewCount, 5)),
                    featured: getRandomInt(1, 100) > 90,
                    bestSelling: getRandomInt(1, 100) > 85,
                    newArrival: getRandomInt(1, 100) > 80,
                    createdAt: new Date(Date.now() - getRandomInt(0, 365) * 24 * 60 * 60 * 1000).toISOString()
                });

                productId++;
            }
        });
    });

    return products;
}

// Generate and export products
const allProducts = generateProducts();
console.log(`Generated ${allProducts.length} products`);

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { products: allProducts, categories: CATEGORIES };
} else {
    window.ECOMMERCE_DATA = { products: allProducts, categories: CATEGORIES };
}
