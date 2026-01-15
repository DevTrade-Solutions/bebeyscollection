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
    
    // Shop
    shopGrid: document.getElementById('shopGrid'),
    shopFilterButtons: document.querySelectorAll('.shop-filters .filter-btn'),
    
    // Product Modal
    productModal: document.getElementById('productModal'),
    closeModal: document.getElementById('closeModal'),
    modalImage: document.getElementById('modalImage'),
    modalTitle: document.getElementById('modalTitle'),
    modalCategory: document.getElementById('modalCategory'),
    modalDescription: document.getElementById('modalDescription'),
    modalPrice: document.getElementById('modalPrice'),
    modalOriginalPrice: document.getElementById('modalOriginalPrice'),
    modalDiscount: document.getElementById('modalDiscount'),
    modalAvailability: document.getElementById('modalAvailability'),
    modalSizes: document.getElementById('modalSizes'),
    modalColors: document.getElementById('modalColors'),
    modalAddToCart: document.getElementById('modalAddToCart'),
    modalViewInStore: document.getElementById('modalViewInStore'),
    
    // Forms
    newsletterForm: document.getElementById('newsletterForm'),
    
    // Toast
    toast: document.getElementById('toast')
};

// Current selected product for modal
let currentProduct = null;

// Initialize App
function init() {
    // Load shop products
    renderShopProducts();
    
    // Setup event listeners
    setupEventListeners();
    
    // Update cart display
    updateCartDisplay();
    
    // Setup gallery filtering
    setupGalleryFiltering();
    
    // Setup animations
    setupAnimations();
    
    // Check user preferences
    checkUserPreferences();
    
    console.log('Bebeys Collection initialized');
}

// Setup Event Listeners
function setupEventListeners() {
    // Mobile menu toggle
    if (elements.menuToggle) {
        elements.menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });
    }
    
    // Close mobile menu
    if (elements.closeMenu) {
        elements.closeMenu.addEventListener('click', closeMobileMenu);
    }
    
    // Mobile cart button
    if (elements.mobileCartBtn) {
        elements.mobileCartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeMobileMenu();
            openCart();
        });
    }
    
    // Cart toggle
    if (elements.cartBtn) {
        elements.cartBtn.addEventListener('click', openCart);
    }
    
    // Close cart
    if (elements.closeCart) {
        elements.closeCart.addEventListener('click', closeCart);
    }
    
    if (elements.continueShopping) {
        elements.continueShopping.addEventListener('click', closeCart);
    }
    
    // Shop filters
    if (elements.shopFilterButtons) {
        elements.shopFilterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                filterShopProducts(filter);
            });
        });
    }
    
    // Product modal close
    if (elements.closeModal) {
        elements.closeModal.addEventListener('click', closeProductModal);
    }
    
    // Close modal when clicking outside
    if (elements.productModal) {
        elements.productModal.addEventListener('click', function(e) {
            if (e.target === elements.productModal) {
                closeProductModal();
            }
        });
    }
    
    // Newsletter form
    if (elements.newsletterForm) {
        elements.newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Booking form
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }
    
    // Map placeholder click
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (mapPlaceholder) {
        mapPlaceholder.addEventListener('click', () => {
            showToast('Store map will open in a new window', 'success');
        });
    }
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (elements.cartSidebar && elements.cartSidebar.classList.contains('active') && 
            !elements.cartSidebar.contains(e.target) && 
            e.target !== elements.cartBtn && 
            !elements.cartBtn.contains(e.target)) {
            closeCart();
        }
    });
}

// Setup Gallery Filtering
function setupGalleryFiltering() {
    const galleryFilterButtons = document.querySelectorAll('.gallery-filters .filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryFilterButtons.length === 0) return;
    
    galleryFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            galleryFilterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Setup Animations
function setupAnimations() {
    // Fade-in animations on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInOnScroll = () => {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };
    
    // Initial check
    fadeInOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', fadeInOnScroll);
}

// Render Shop Products
function renderShopProducts(filter = 'all') {
    if (!elements.shopGrid) return;
    
    let filteredProducts = products;
    
    // Apply filter
    if (filter !== 'all') {
        filteredProducts = products.filter(product => {
            if (filter === 'in-store') return product.availability === 'in-store';
            if (filter === 'online') return product.availability === 'online';
            if (filter === 'new') return product.tags.includes('new');
            if (filter === 'sale') return product.tags.includes('sale');
            return true;
        });
    }
    
    // Clear grid
    elements.shopGrid.innerHTML = '';
    
    // Add products
    filteredProducts.forEach(product => {
        const shopCard = createShopCard(product);
        elements.shopGrid.appendChild(shopCard);
    });
}

// Create Shop Card
function createShopCard(product) {
    const card = document.createElement('div');
    card.className = 'shop-card fade-in';
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
        
        <div class="shop-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        
        <div class="shop-content">
            <div class="shop-category">${product.category}</div>
            <h3 class="shop-title">${product.name}</h3>
            <p class="shop-description">${product.description}</p>
            
            <div class="shop-price">
                <div>
                    ${hasDiscount ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
                    <span class="price">${formatPrice(product.price)}</span>
                    ${hasDiscount ? `<div class="discount">Save ${discountPercent}%</div>` : ''}
                </div>
                ${product.availability === 'in-store' ? 
                    `<span class="availability-tag">In-Store Only</span>` : 
                    `<span class="availability-tag">Available Online</span>`}
            </div>
            
            <div class="shop-actions">
                ${product.availability !== 'in-store' ? 
                    `<button class="btn btn-primary add-to-cart" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>` : 
                    `<a href="#store" class="btn btn-primary">
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
        viewDetailsBtn.addEventListener('click', () => openProductModal(product.id));
    }
    
    return card;
}

// Filter Shop Products
function filterShopProducts(filter) {
    // Update active button
    elements.shopFilterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === filter) {
            btn.classList.add('active');
        }
    });
    
    // Render filtered products
    renderShopProducts(filter);
}

// Product Modal Functions
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    currentProduct = product;
    
    // Calculate discount if applicable
    const hasDiscount = product.originalPrice !== null;
    const discountPercent = hasDiscount ? 
        Math.round((1 - product.price / product.originalPrice) * 100) : 0;
    
    // Format prices
    const formatPrice = (price) => `R${price.toFixed(2)}`;
    
    // Update modal content
    if (elements.modalImage) elements.modalImage.src = product.image;
    if (elements.modalImage) elements.modalImage.alt = product.name;
    if (elements.modalTitle) elements.modalTitle.textContent = product.name;
    if (elements.modalCategory) elements.modalCategory.textContent = product.category;
    if (elements.modalDescription) elements.modalDescription.textContent = product.description;
    
    // Update prices
    if (elements.modalPrice) {
        elements.modalPrice.textContent = formatPrice(product.price);
    }
    
    if (elements.modalOriginalPrice) {
        if (hasDiscount) {
            elements.modalOriginalPrice.textContent = formatPrice(product.originalPrice);
            elements.modalOriginalPrice.style.display = 'inline';
        } else {
            elements.modalOriginalPrice.style.display = 'none';
        }
    }
    
    if (elements.modalDiscount) {
        if (hasDiscount) {
            elements.modalDiscount.textContent = `Save ${discountPercent}%`;
            elements.modalDiscount.style.display = 'block';
        } else {
            elements.modalDiscount.style.display = 'none';
        }
    }
    
    // Update availability
    if (elements.modalAvailability) {
        elements.modalAvailability.textContent = product.availability === 'in-store' ? 'In-Store Only' : 'Available Online';
    }
    
    // Update sizes
    if (elements.modalSizes) {
        elements.modalSizes.innerHTML = '';
        product.sizes.forEach(size => {
            const sizeElement = document.createElement('div');
            sizeElement.className = 'size';
            sizeElement.textContent = size;
            sizeElement.addEventListener('click', () => {
                document.querySelectorAll('.modal-details .size').forEach(s => s.classList.remove('active'));
                sizeElement.classList.add('active');
            });
            elements.modalSizes.appendChild(sizeElement);
        });
        
        // Activate first size by default
        if (elements.modalSizes.firstChild) {
            elements.modalSizes.firstChild.classList.add('active');
        }
    }
    
    // Update colors
    if (elements.modalColors) {
        elements.modalColors.innerHTML = '';
        product.colors.forEach(color => {
            const colorElement = document.createElement('div');
            colorElement.className = 'color';
            colorElement.style.backgroundColor = getColorValue(color);
            colorElement.title = color;
            colorElement.addEventListener('click', () => {
                document.querySelectorAll('.modal-details .color').forEach(c => c.classList.remove('active'));
                colorElement.classList.add('active');
            });
            elements.modalColors.appendChild(colorElement);
        });
        
        // Activate first color by default
        if (elements.modalColors.firstChild) {
            elements.modalColors.firstChild.classList.add('active');
        }
    }
    
    // Update buttons
    if (elements.modalAddToCart) {
        if (product.availability !== 'in-store') {
            elements.modalAddToCart.style.display = 'flex';
            elements.modalAddToCart.onclick = () => {
                addToCart(product.id);
                closeProductModal();
            };
        } else {
            elements.modalAddToCart.style.display = 'none';
        }
    }
    
    if (elements.modalViewInStore) {
        if (product.availability === 'in-store') {
            elements.modalViewInStore.style.display = 'flex';
            elements.modalViewInStore.href = '#store';
            elements.modalViewInStore.onclick = () => {
                closeProductModal();
            };
        } else {
            elements.modalViewInStore.style.display = 'none';
        }
    }
    
    // Show modal
    if (elements.productModal) {
        elements.productModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeProductModal() {
    if (elements.productModal) {
        elements.productModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    currentProduct = null;
}

// Helper function to get color value from color name
function getColorValue(colorName) {
    const colorMap = {
        'Blue/Black': '#1e3a8a',
        'Red/Gold': '#b91c1c',
        'Green/Brown': '#065f46',
        'Gold': '#d4af37',
        'Ivory': '#fffff0',
        'Bronze': '#cd7f32',
        'Multi-color': 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff)',
        'Blue/White': '#1e40af',
        'Red/Black': '#7f1d1d',
        'Gold/Green': '#d4af37',
        'Blue/White': '#1e40af',
        'Natural': '#f5deb3',
        'Indigo': '#4b0082',
        'Brown': '#8b4513',
        'Multicolor': 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff)',
        'Gold/Red': '#ffd700',
        'Blue/Green': '#1e40af',
        'Custom': '#6b7280',
        'Red/Black': '#7f1d1d',
        'Blue/Gold': '#1e40af',
        'Green/White': '#065f46'
    };
    
    return colorMap[colorName] || '#cccccc';
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
    const cartCounts = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCounts.forEach(count => {
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
                <a href="#shop" class="btn btn-primary">Start Shopping</a>
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

// Cart Sidebar Functions
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

// Newsletter Form Handler
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

// Booking Form Handler
function handleBookingSubmit(e) {
    e.preventDefault();
    
    const name = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    const date = e.target.querySelector('input[type="date"]').value;
    const time = e.target.querySelector('input[type="time"]').value;
    
    if (name && email && date && time) {
        showToast(`Thank you ${name}! Your store appointment has been booked for ${date} at ${time}. We\'ll send a confirmation email shortly.`, 'success');
        e.target.reset();
    } else {
        showToast('Please fill in all required fields', 'error');
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    init();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or links that should behave normally
            if (href === '#' || href === '#search' || href === '#account' || href === '#checkout') {
                return;
            }
            
            e.preventDefault();
            const targetId = href;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight - 20,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on larger screens
    if (window.innerWidth > 992) {
        closeMobileMenu();
    }
});

// Export functions for use in console if needed
window.BebeysCollection = {
    init,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateCartDisplay,
    showToast,
    trackStoreVisit,
    filterShopProducts,
    renderShopProducts,
    openProductModal,
    closeProductModal
};