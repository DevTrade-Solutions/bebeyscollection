import { products, cart, user } from './data.js';

// DOM Elements
const elements = {
    // Navigation
    menuToggle: document.getElementById('menuToggle'),
    mobileMenu: document.getElementById('mobileMenu'),
    closeMenu: document.getElementById('closeMenu'),
    mobileCartBtn: document.getElementById('mobileCartBtn'),
    
    // Cart
    cartBtn: document.getElementById('cartBtn'),
    cartSidebar: document.getElementById('cartSidebar'),
    closeCart: document.getElementById('closeCart'),
    cartItems: document.getElementById('cartItems'),
    cartTotal: document.getElementById('cartTotal'),
    continueShopping: document.getElementById('continueShopping'),
    
    // Products
    productsGrid: document.getElementById('productsGrid'),
    filterButtons: document.querySelectorAll('.filter-btn'),
    
    // Forms
    newsletterForm: document.getElementById('newsletterForm'),
    
    // Toast
    toast: document.getElementById('toast')
};

// Initialize App
function init() {
    // Load products
    renderProducts();
    
    // Setup event listeners
    setupEventListeners();
    
    // Update cart display
    updateCartDisplay();
    
    // Check user preferences
    checkUserPreferences();
    
    // Show store promotion if no recent visit
    showStorePromotion();
}

// Setup Event Listeners
function setupEventListeners() {
    // Mobile menu
    if (elements.menuToggle) {
        elements.menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    if (elements.closeMenu) {
        elements.closeMenu.addEventListener('click', closeMobileMenu);
    }
    
    if (elements.mobileCartBtn) {
        elements.mobileCartBtn.addEventListener('click', openCart);
    }
    
    // Cart
    if (elements.cartBtn) {
        elements.cartBtn.addEventListener('click', openCart);
    }
    
    if (elements.closeCart) {
        elements.closeCart.addEventListener('click', closeCart);
    }
    
    if (elements.continueShopping) {
        elements.continueShopping.addEventListener('click', closeCart);
    }
    
    // Product filters
    elements.filterButtons.forEach(button => {
        button.addEventListener('click', () => filterProducts(button.dataset.filter));
    });
    
    // Newsletter form
    if (elements.newsletterForm) {
        elements.newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (elements.cartSidebar.classList.contains('active') && 
            !elements.cartSidebar.contains(e.target) && 
            e.target !== elements.cartBtn && 
            !elements.cartBtn.contains(e.target)) {
            closeCart();
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (elements.mobileMenu.classList.contains('active') && 
            !elements.mobileMenu.contains(e.target) && 
            e.target !== elements.menuToggle) {
            closeMobileMenu();
        }
    });
}

// Render Products
function renderProducts(filter = 'all') {
    if (!elements.productsGrid) return;
    
    let filteredProducts = products;
    
    // Apply filter
    if (filter !== 'all') {
        filteredProducts = products.filter(product => {
            if (filter === 'in-store') return product.availability === 'in-store';
            if (filter === 'online') return product.availability === 'online';
            if (filter === 'new') return product.tags.includes('new');
            return true;
        });
    }
    
    // Clear grid
    elements.productsGrid.innerHTML = '';
    
    // Add products
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        elements.productsGrid.appendChild(productCard);
    });
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = product.id;
    card.dataset.availability = product.availability;
    
    // Calculate discount if applicable
    const hasDiscount = product.originalPrice !== null;
    const discountPercent = hasDiscount ? 
        Math.round((1 - product.price / product.originalPrice) * 100) : 0;
    
    // Format prices
    const formatPrice = (price) => `R${price.toFixed(2)}`;
    
    card.innerHTML = `
        ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
        
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        
        <div class="product-content">
            <div class="product-category">${product.category}</div>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            
            <div class="product-price">
                <div>
                    ${hasDiscount ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
                    <span class="price">${formatPrice(product.price)}</span>
                    ${hasDiscount ? `<div class="discount">Save ${discountPercent}%</div>` : ''}
                </div>
                ${product.availability === 'in-store' ? 
                    `<span class="availability-tag">In-Store Only</span>` : 
                    `<span class="availability-tag">Available Online</span>`}
            </div>
            
            <div class="product-actions">
                ${product.availability !== 'in-store' ? 
                    `<button class="btn btn-primary add-to-cart" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>` : 
                    `<a href="in-store.html" class="btn btn-primary">
                        <i class="fas fa-store"></i> View in Store
                    </a>`}
                
                <button class="btn btn-secondary view-details" data-id="${product.id}">
                    <i class="fas fa-eye"></i> Details
                </button>
            </div>
        </div>
    `;
    
    // Add event listeners to buttons
    const addToCartBtn = card.querySelector('.add-to-cart');
    const viewDetailsBtn = card.querySelector('.view-details');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => addToCart(product.id));
    }
    
    if (viewDetailsBtn) {
        viewDetailsBtn.addEventListener('click', () => viewProductDetails(product.id));
    }
    
    return card;
}

// Filter Products
function filterProducts(filter) {
    // Update active button
    elements.filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        }
    });
    
    // Render filtered products
    renderProducts(filter);
}

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1,
            selectedSize: product.sizes[0],
            selectedColor: product.colors[0]
        });
    }
    
    updateCartDisplay();
    showToast(`${product.name} added to cart!`, 'success');
    
    // Open cart sidebar
    openCart();
}

function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        const productName = cart[index].name;
        cart.splice(index, 1);
        updateCartDisplay();
        showToast(`${productName} removed from cart`, 'error');
    }
}

function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            updateCartDisplay();
        }
    }
}

function updateCartDisplay() {
    // Update cart count
    const cartCount = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCount.forEach(count => {
        count.textContent = totalItems;
        count.style.display = totalItems > 0 ? 'flex' : 'none';
    });
    
    // Update cart sidebar
    updateCartSidebar();
}

function updateCartSidebar() {
    if (!elements.cartItems) return;
    
    if (cart.length === 0) {
        elements.cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-bag"></i>
                <h4>Your cart is empty</h4>
                <p>Add some beautiful pieces to get started!</p>
                <a href="shop.html" class="btn btn-primary">Start Shopping</a>
            </div>
        `;
        elements.cartTotal.textContent = 'R0.00';
        return;
    }
    
    let html = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        html += `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <div class="cart-item-price">R${itemTotal.toFixed(2)}</div>
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="quantity-btn minus" data-id="${item.id}">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        </div>
                        <button class="remove-item" data-id="${item.id}">Remove</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    elements.cartItems.innerHTML = html;
    elements.cartTotal.textContent = `R${total.toFixed(2)}`;
    
    // Add event listeners to cart buttons
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            const item = cart.find(item => item.id === productId);
            if (item) updateQuantity(productId, item.quantity - 1);
        });
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            const item = cart.find(item => item.id === productId);
            if (item) updateQuantity(productId, item.quantity + 1);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            removeFromCart(productId);
        });
    });
}

// Mobile Menu Functions
function toggleMobileMenu() {
    elements.mobileMenu.classList.toggle('active');
    document.body.style.overflow = elements.mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
}

function closeMobileMenu() {
    elements.mobileMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Cart Sidebar Functions
function openCart() {
    elements.cartSidebar.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    elements.cartSidebar.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Newsletter Form
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (validateEmail(email)) {
        user.email = email;
        user.preferences.newsletter = true;
        
        showToast('Thank you for subscribing! You\'ll receive store updates and invitations.', 'success');
        e.target.reset();
        
        // In a real app, you would send this to your backend
        console.log('Newsletter subscription:', email);
    } else {
        showToast('Please enter a valid email address', 'error');
    }
}

// Toast Notification
function showToast(message, type = 'success') {
    if (!elements.toast) return;
    
    elements.toast.textContent = message;
    elements.toast.className = 'toast';
    elements.toast.classList.add(type);
    elements.toast.classList.add('show');
    
    // Add icon based on type
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    elements.toast.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
    
    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 3000);
}

// Utility Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function viewProductDetails(productId) {
    // In a real app, this would navigate to product page
    const product = products.find(p => p.id === productId);
    if (product) {
        showToast(`Viewing ${product.name} details`, 'success');
        // window.location.href = `product.html?id=${productId}`;
    }
}

function checkUserPreferences() {
    // Check if user has visited store recently
    const lastVisit = localStorage.getItem('lastStoreVisit');
    if (lastVisit) {
        const daysSinceVisit = (Date.now() - new Date(lastVisit).getTime()) / (1000 * 60 * 60 * 24);
        if (daysSinceVisit < 30) {
            // User visited recently
            user.lastVisit = lastVisit;
            user.storeVisits = parseInt(localStorage.getItem('storeVisits') || '0');
        }
    }
}

function showStorePromotion() {
    // Show store promotion if user hasn't visited in over 30 days
    if (!user.lastVisit || (Date.now() - new Date(user.lastVisit).getTime()) / (1000 * 60 * 60 * 24) > 30) {
        // In a real app, you might show a modal or special banner
        console.log('Showing store promotion - last visit was over 30 days ago');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Track store visits
function trackStoreVisit() {
    user.storeVisits += 1;
    user.lastVisit = new Date().toISOString();
    
    localStorage.setItem('storeVisits', user.storeVisits);
    localStorage.setItem('lastStoreVisit', user.lastVisit);
    
    // Show welcome back message for returning customers
    if (user.storeVisits > 1) {
        showToast(`Welcome back! This is your visit #${user.storeVisits}`, 'success');
    }
}

// Export functions for use in other files if needed
export { 
    init, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    updateCartDisplay,
    showToast,
    trackStoreVisit
};


// Add these functions to your existing main.js file

// Mobile Menu Functions
function toggleMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const body = document.body;
    
    if (!menuToggle || !mobileMenu) return;
    
    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    body.classList.toggle('menu-open');
    
    // Prevent body scroll when menu is open
    if (mobileMenu.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
}

function closeMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const body = document.body;
    
    if (!menuToggle || !mobileMenu) return;
    
    menuToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
    body.classList.remove('menu-open');
    body.style.overflow = '';
}

// Update your setupEventListeners function to include mobile menu
function setupEventListeners() {
    // Mobile menu
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const mobileCartBtn = document.getElementById('mobileCartBtn');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    if (closeMenu) {
        closeMenu.addEventListener('click', closeMobileMenu);
    }
    
    if (mobileCartBtn) {
        mobileCartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeMobileMenu();
            openCart();
        });
    }
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const menuToggle = document.getElementById('menuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            if (!mobileMenu.contains(e.target) && e.target !== menuToggle && !menuToggle.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });
    
    // Add other event listeners...
    // ... rest of your existing setupEventListeners code
}

// Update your existing functions to work with mobile
function openCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const body = document.body;
    
    if (cartSidebar) {
        cartSidebar.classList.add('active');
        body.classList.add('cart-open');
        body.style.overflow = 'hidden';
    }
}

function closeCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const body = document.body;
    
    if (cartSidebar) {
        cartSidebar.classList.remove('active');
        body.classList.remove('cart-open');
        body.style.overflow = '';
    }
}

// Update the init function to initialize mobile menu
function init() {
    // ... existing init code
    
    // Initialize mobile menu state
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
    }
    
    // ... rest of your init code
}