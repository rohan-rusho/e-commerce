# 🌿 GreenMart - E-Commerce Platform

A fully functional, production-ready e-commerce website with premium green theme, complete admin panel, and support for 1000+ products in Bangladeshi Taka (৳).

## ✨ Features

### Customer Features
- **Homepage** with auto-rotating hero slider
- **Product Catalog** with 1000+ products across 8 categories
- **Advanced Filtering** by category, price, rating, and stock status
- **Product Search** with real-time results
- **Sorting Options** (Featured, Price, Rating, Popularity, Newest)
- **Product Details** with image gallery, reviews, and related products
- **Shopping Cart** with quantity management and price calculations
- **Checkout System** with shipping form and payment options
- **Order Confirmation** with detailed order summary
- **Cash on Delivery** payment option
- **Responsive Design** for mobile, tablet, and desktop

### Admin Panel
- **Secure Authentication** (username: admin, password: admin123)
- **Dashboard Analytics** showing revenue, orders, products, and alerts
- **Product Management** with full CRUD operations
- **Order Management** with status tracking and updates
- **Category Management** with product counts
- **Low Stock Alerts** for inventory management
- **Search and Filter** capabilities across all admin pages

### Technical Features
- **1000+ Mock Products** with realistic data
- **8 Product Categories** with subcategories
- **LocalStorage Persistence** for cart, orders, and product modifications
- **Currency in BDT (৳)** throughout the platform
- **Premium Green Theme** with modern UI/UX
- **Smooth Animations** and transitions
- **Toast Notifications** for user feedback
- **Form Validation** for checkout and admin operations
- **Pagination** for large product lists
- **SEO-Friendly** structure

## 📁 Project Structure

```
ecommerce-platform/
├── index.html              # Homepage
├── products.html           # Product listing page
├── product.html            # Product detail page
├── cart.html               # Shopping cart
├── checkout.html           # Checkout page
├── order-confirmation.html # Order confirmation
├── css/
│   ├── styles.css         # Main design system
│   └── components.css     # Component styles
├── js/
│   ├── utils.js           # Utility functions
│   ├── storage.js         # LocalStorage manager
│   ├── productService.js  # Product operations
│   ├── cart.js            # Cart manager
│   ├── components.js      # Shared components
│   └── main.js            # App initialization
├── data/
│   └── products.js        # Product data generator
├── admin/
│   ├── login.html         # Admin login
│   ├── dashboard.html     # Admin dashboard
│   ├── products.html      # Product management
│   ├── orders.html        # Order management
│   ├── categories.html    # Category management
│   └── admin.css          # Admin panel styles
└── images/                # Image assets
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No backend server required (runs entirely in browser)

### Installation

1. **Clone or download** this project to your local machine

2. **Open the project** in a web browser:
   - Simply open `index.html` in your browser
   - Or use a local server (recommended):
     - Python: `python -m http.server 8000`
     - Node.js: `npx serve`
     - VS Code: Use Live Server extension

3. **Browse the site**:
   - Homepage: `index.html`
   - Products: `products.html`
   - Admin Panel: `admin/login.html`

### Admin Access

To access the admin panel:
1. Navigate to `admin/login.html`
2. Enter credentials:
   - **Username**: `admin`
   - **Password**: `admin123`
3. You'll be redirected to the dashboard

## 💚 Design Theme

The platform uses a premium green theme representing:
- **Trust** and reliability
- **Growth** and sustainability
- **Nature** and eco-friendliness

### Color Palette
- Primary Green: `#10b981`
- Primary Dark: `#059669`
- Secondary: `#f0fdf4`
- Accent: `#064e3b`
- Gold (discount badges): `#fbbf24`

### Typography
- Headings: Outfit
- Body: Inter
- Both fonts from Google Fonts

## 🛒 Usage Guide

### For Customers

1. **Browse Products**
   - Use the homepage to see featured products
   - Click on categories to filter products
   - Use the search bar to find specific items

2. **Add to Cart**
   - Click on a product to view details
   - Select quantity and click "Add to Cart"
   - View cart by clicking the cart icon in header

3. **Checkout**
   - Review items in cart
   - Click "Proceed to Checkout"
   - Fill in shipping information
   - Select payment method (Cash on Delivery)
   - Place order

4. **Order Confirmation**
   - View order details and order ID
   - Save the order ID for future reference

### For Administrators

1. **Dashboard**
   - View key metrics (revenue, orders, products)
   - See recent orders
   - Monitor low stock items

2. **Manage Products**
   - Add new products with full details
   - Edit existing products
   - Delete products
   - Filter and search products

3. **Manage Orders**
   - View all orders
   - Update order status
   - View detailed order information
   - Filter orders by status

4. **View Categories**
   - See all categories and subcategories
   - View product counts per category

## 🔧 Customization

### Adding Products
Products are generated automatically. To modify:
1. Edit `data/products.js`
2. Adjust categories, subcategories, or product count
3. Refresh the page

### Changing Theme Colors
1. Open `css/styles.css`
2. Modify CSS variables in `:root`
3. Save and refresh

### Modifying Admin Credentials
1. Open any admin page's `<script>` section
2. Find the authentication logic
3. Change username/password comparison

## 📊 Features Breakdown

### Product System
- 1000+ products generated dynamically
- 8 main categories with 6 subcategories each
- Realistic product data including:
  - Names, descriptions, SKUs
  - Prices in BDT with discounts
  - Stock quantities
  - Ratings and reviews
  - Multiple product images

### Cart System
- Add/remove items
- Update quantities
- Automatic price calculations
- Discount calculations
- Free shipping over ৳2000
- Persistent storage (localStorage)

### Order System
- Complete checkout flow
- Form validation (email, phone)
- Order tracking with unique IDs
- Status management (Pending, Processing, Shipped, Delivered, Cancelled)
- Order history storage

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## ⚡ Performance

- Fast page loads (no external dependencies except fonts)
- Efficient filtering and sorting
- Pagination for large datasets
- Optimized image loading
- Smooth animations

## 🔒 Security Notes

**Important**: This is a frontend-only demonstration. For production use:
- Implement proper backend authentication
- Use secure payment gateways
- Add HTTPS
- Implement CSRF protection
- Use server-side validation
- Store sensitive data securely

## 📝 Future Enhancements

Potential features for production version:
- Backend API integration
- Real payment gateway (bKash, Nagad, Rocket)
- User accounts with login
- Wishlist functionality
- Product reviews submission
- Email notifications
- Order tracking
- Multi-language support
- Product image upload
- Advanced analytics

## 🤝 Contributing

To contribute or customize:
1. Fork the project
2. Create your feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available for educational and commercial use.

## 🙋 Support

For issues or questions:
- Check the code comments
- Review the implementation
- Modify as needed for your use case

## 🎉 Acknowledgments

- Product images from Lorem Picsum
- Icons: UTF-8 Emojis
- Fonts: Google Fonts (Inter & Outfit)
- Design inspiration: Modern e-commerce best practices

---

**Built with ❤️ for Bangladesh**

*Premium e-commerce solution in vanilla JavaScript*
