import { products, storeInfo, storeEvents, storeExclusives, user } from './data.js';

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
    
    // Modal Thumbnails
    thumbnail1: document.getElementById('thumbnail1'),
    thumbnail2: document.getElementById('thumbnail2'),
    thumbnail3: document.getElementById('thumbnail3'),
    
    // Search and Account
    searchBtn: document.querySelector('.search-btn'),
    accountBtn: document.querySelector('.account-btn'),
    
    // Search Modal
    searchModal: document.getElementById('searchModal'),
    closeSearchModal: document.getElementById('closeSearchModal'),
    searchInput: document.getElementById('searchInput'),
    searchButton: document.getElementById('searchButton'),
    searchResults: document.getElementById('searchResults'),
    
    // Forms
    newsletterForm: document.getElementById('newsletterForm'),
    
    // Toast
    toast: document.getElementById('toast')
};

// Current selected product for modal
let currentProduct = null;
let selectedSize = null;
let selectedColor = null;

// Cart state
let cart = [];

// Product additional images mapping
const productAdditionalImages = {
    1: {
        main: "img/shop/a1.jpg",
        additional1: "img/shop/2P-set.png",
        additional2: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=800&q=80"
    },
    2: {
        main: "img/shop/2P-set.png",
        additional1: "img/shop/2P-set1.png",
        additional2: "img/shop/2P-set2.png"
    },
    3: {
        main: "img/shop/akara-pant-bnw.png",
        additional1: "img/shop/akara-pant-bnw1.png",
        additional2: "img/shop/akara-pant-bnw2.png"
    },
    4: {
        main: "img/shop/dress-01.png",
        additional1: "img/shop/dress-02.png",
        additional2: "img/shop/dress-03.JPG"
    },
    5: {
        main: "img/shop/kid-top-b.JPG",
        additional1: "img/shop/kid-top-b2.JPG",
        additional2: "img/shop/kid-top-b3.JPG"
    },
    6: {
        main: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
        additional1: "https://images.unsplash.com/photo-1542327897-d73f4005b533?auto=format&fit=crop&w=800&q=80",
        additional2: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80"
    },
    7: {
        main: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
        additional1: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
        additional2: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80"
    },
    8: {
        main: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
        additional1: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
        additional2: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80"
    }
};

// Initialize App
function init() {
    // Load cart from localStorage
    loadCartFromStorage();
    
    // Setup event listeners for manual products
    setupEventListeners();
    
    // Update cart display
    updateCartDisplay();
    
    // Setup gallery filtering
    setupGalleryFiltering();
    
    // Setup animations
    setupAnimations();
    
    // Check user preferences
    checkUserPreferences();
    
    console.log('Bebeys Collection initialized with manual products');
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
    
    // Shop filters for manual products
    if (elements.shopGrid) {
        const shopFiltersContainer = document.querySelector('.shop-filters');
        if (shopFiltersContainer) {
            shopFiltersContainer.addEventListener('click', function(e) {
                const filterBtn = e.target.closest('.filter-btn');
                if (filterBtn) {
                    // Remove active class from all buttons
                    shopFiltersContainer.querySelectorAll('.filter-btn').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    // Add active class to clicked button
                    filterBtn.classList.add('active');
                    
                    const filter = filterBtn.getAttribute('data-filter');
                    filterShopProducts(filter);
                }
            });
        }
    }
    
    // Event delegation for shop grid (manual products)
    if (elements.shopGrid) {
        elements.shopGrid.addEventListener('click', function(e) {
            const target = e.target;
            const addToCartBtn = target.closest('.add-to-cart');
            const viewDetailsBtn = target.closest('.view-details');
            const productImageLink = target.closest('.product-image-link');
            const productTitleLink = target.closest('.product-title-link');
            
            if (addToCartBtn) {
                const productId = parseInt(addToCartBtn.dataset.id);
                addToCart(productId);
            }
            
            if (viewDetailsBtn) {
                const productId = parseInt(viewDetailsBtn.dataset.id);
                openProductModal(productId);
            }
            
            if (productImageLink) {
                const productId = parseInt(productImageLink.dataset.id);
                openProductModal(productId);
            }
            
            if (productTitleLink) {
                const productId = parseInt(productTitleLink.dataset.id);
                openProductModal(productId);
            }
        });
    }
    
    // Event delegation for cart sidebar
    if (elements.cartItems) {
        elements.cartItems.addEventListener('click', function(e) {
            const target = e.target;
            const minusBtn = target.closest('.quantity-btn.minus');
            const plusBtn = target.closest('.quantity-btn.plus');
            const removeBtn = target.closest('.remove-item');
            
            if (minusBtn) {
                const productId = parseInt(minusBtn.dataset.id);
                updateQuantity(productId, -1);
            }
            
            if (plusBtn) {
                const productId = parseInt(plusBtn.dataset.id);
                updateQuantity(productId, 1);
            }
            
            if (removeBtn) {
                const productId = parseInt(removeBtn.dataset.id);
                removeFromCart(productId);
            }
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
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#search' || this.getAttribute('href') === '#account') {
                e.preventDefault();
            } else {
                closeMobileMenu();
            }
        });
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
    
    // Search button functionality
    if (elements.searchBtn) {
        elements.searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openSearchModal();
        });
    }
    
    // Account button functionality
    if (elements.accountBtn) {
        elements.accountBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'account.html';
        });
    }
    
    // Search Modal functionality
    if (elements.closeSearchModal) {
        elements.closeSearchModal.addEventListener('click', closeSearchModal);
    }
    
    if (elements.searchModal) {
        elements.searchModal.addEventListener('click', function(e) {
            if (e.target === elements.searchModal) {
                closeSearchModal();
            }
        });
    }
    
    if (elements.searchButton) {
        elements.searchButton.addEventListener('click', performSearch);
    }
    
    if (elements.searchInput) {
        elements.searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Mobile search and account
    const mobileSearchBtn = document.querySelector('.mobile-nav-links a[href="#search"]');
    const mobileAccountBtn = document.querySelector('.mobile-nav-links a[href="#account"]');
    
    if (mobileSearchBtn) {
        mobileSearchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeMobileMenu();
            openSearchModal();
        });
    }
    
    if (mobileAccountBtn) {
        mobileAccountBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeMobileMenu();
            window.location.href = 'account.html';
        });
    }
    
    // Modal add to cart button
    if (elements.modalAddToCart) {
        elements.modalAddToCart.addEventListener('click', function() {
            if (currentProduct) {
                const productId = currentProduct.id;
                addToCart(productId, selectedSize, selectedColor);
                closeProductModal();
            }
        });
    }
    
    // Modal thumbnail click events
    document.querySelectorAll('.image-thumbnail').forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const imageType = this.getAttribute('data-image');
            const productId = currentProduct.id;
            const images = productAdditionalImages[productId];
            
            if (images) {
                // Update main image
                if (imageType === 'main') {
                    elements.modalImage.src = images.main;
                } else if (imageType === 'additional1') {
                    elements.modalImage.src = images.additional1;
                } else if (imageType === 'additional2') {
                    elements.modalImage.src = images.additional2;
                }
                
                // Update active thumbnail
                document.querySelectorAll('.image-thumbnail').forEach(t => {
                    t.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
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

// Filter Manual Shop Products
function filterShopProducts(filter) {
    const shopCards = document.querySelectorAll('.shop-card');
    
    shopCards.forEach(card => {
        const availability = card.getAttribute('data-availability');
        const tags = card.getAttribute('data-tags');
        
        let shouldShow = false;
        
        if (filter === 'all') {
            shouldShow = true;
        } else if (filter === 'in-store') {
            shouldShow = availability === 'in-store';
        } else if (filter === 'online') {
            shouldShow = availability === 'online' || availability === 'both';
        } else if (filter === 'new') {
            shouldShow = tags && tags.includes('new');
        } else if (filter === 'sale') {
            shouldShow = tags && tags.includes('sale');
        }
        
        if (shouldShow) {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
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

// Product Modal Functions
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    currentProduct = product;
    selectedSize = product.sizes[0];
    selectedColor = product.colors[0];
    
    // Get additional images for this product
    const additionalImages = productAdditionalImages[productId];
    
    // Calculate discount if applicable
    const hasDiscount = product.originalPrice !== null;
    const discountPercent = hasDiscount ? 
        Math.round((1 - product.price / product.originalPrice) * 100) : 0;
    
    // Format prices
    const formatPrice = (price) => `R${price.toFixed(2)}`;
    
    // Update modal content
    if (elements.modalImage && additionalImages) {
        elements.modalImage.src = additionalImages.main;
        elements.modalImage.alt = product.name;
    }
    
    if (elements.modalTitle) elements.modalTitle.textContent = product.name;
    if (elements.modalCategory) elements.modalCategory.textContent = product.category;
    if (elements.modalDescription) elements.modalDescription.textContent = product.description;
    
    // Update thumbnails
    if (additionalImages) {
        if (elements.thumbnail1) {
            elements.thumbnail1.src = additionalImages.main;
            elements.thumbnail1.alt = `${product.name} - Main`;
        }
        if (elements.thumbnail2) {
            elements.thumbnail2.src = additionalImages.additional1;
            elements.thumbnail2.alt = `${product.name} - View 2`;
        }
        if (elements.thumbnail3) {
            elements.thumbnail3.src = additionalImages.additional2;
            elements.thumbnail3.alt = `${product.name} - View 3`;
        }
    }
    
    // Reset thumbnail active state
    document.querySelectorAll('.image-thumbnail').forEach((thumbnail, index) => {
        thumbnail.classList.remove('active');
        if (index === 0) thumbnail.classList.add('active');
    });
    
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
        if (product.availability === 'in-store') {
            elements.modalAvailability.textContent = 'In-Store Only';
            elements.modalAvailability.style.backgroundColor = 'rgba(198, 167, 94, 0.1)';
            elements.modalAvailability.style.color = 'var(--accent)';
        } else if (product.availability === 'online') {
            elements.modalAvailability.textContent = 'Available Online';
            elements.modalAvailability.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
            elements.modalAvailability.style.color = 'var(--success)';
        } else {
            elements.modalAvailability.textContent = 'Available Both';
            elements.modalAvailability.style.backgroundColor = 'rgba(33, 150, 243, 0.1)';
            elements.modalAvailability.style.color = '#2196f3';
        }
    }
    
    // Update sizes
    if (elements.modalSizes) {
        elements.modalSizes.innerHTML = '';
        product.sizes.forEach(size => {
            const sizeElement = document.createElement('div');
            sizeElement.className = 'size';
            sizeElement.textContent = size;
            sizeElement.dataset.size = size;
            sizeElement.addEventListener('click', () => {
                document.querySelectorAll('.modal-details .size').forEach(s => s.classList.remove('active'));
                sizeElement.classList.add('active');
                selectedSize = size;
            });
            elements.modalSizes.appendChild(sizeElement);
        });
        
        // Activate first size by default
        if (elements.modalSizes.firstChild) {
            elements.modalSizes.firstChild.classList.add('active');
            selectedSize = product.sizes[0];
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
            colorElement.dataset.color = color;
            colorElement.addEventListener('click', () => {
                document.querySelectorAll('.modal-details .color').forEach(c => c.classList.remove('active'));
                colorElement.classList.add('active');
                selectedColor = color;
            });
            elements.modalColors.appendChild(colorElement);
        });
        
        // Activate first color by default
        if (elements.modalColors.firstChild) {
            elements.modalColors.firstChild.classList.add('active');
            selectedColor = product.colors[0];
        }
    }
    
    // Update buttons - Show both buttons in modal
    if (elements.modalAddToCart) {
        elements.modalAddToCart.style.display = 'flex';
        elements.modalAddToCart.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
    }
    
    if (elements.modalViewInStore) {
        if (product.availability === 'in-store') {
            elements.modalViewInStore.style.display = 'flex';
            elements.modalViewInStore.innerHTML = '<i class="fas fa-store"></i> View in Store';
            elements.modalViewInStore.href = '#store';
            elements.modalViewInStore.onclick = () => {
                closeProductModal();
                // Scroll to store section
                document.querySelector('#store').scrollIntoView({ behavior: 'smooth' });
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
    selectedSize = null;
    selectedColor = null;
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
        'Natural': '#f5deb3',
        'Indigo': '#4b0082',
        'Brown': '#8b4513',
        'Multicolor': 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff)',
        'Gold/Red': '#ffd700',
        'Blue/Green': '#1e40af',
        'Custom': '#6b7280',
        'Blue/Gold': '#1e40af',
        'Green/White': '#065f46',
        'Navy/Gold': '#1e3a8a',
        'Emerald/Silver': '#065f46',
        'Burgundy': '#800020',
        'Yellow/Black': '#fbbf24',
        'Blue/White': '#1e40af',
        'Pink/Orange': '#fb7185',
        'Red/Black': '#7f1d1d',
        'Green/Gold': '#065f46',
        'Purple/White': '#7e22ce',
        'Emerald': '#065f46',
        'Royal Blue': '#1e40af',
        'Deep Red': '#7f1d1d',
        'Pink/White': '#f472b6',
        'Blue/Grey': '#4b5563',
        'Green/Beige': '#065f46',
        'Red/Black': '#7f1d1d',
        'Blue/Gold': '#1e40af',
        'Purple/Orange': '#7e22ce',
        'White': '#ffffff',
        'Ivory': '#fffff0',
        'Light Blue': '#93c5fd',
        'Black': '#000000',
        'Navy': '#1e3a8a',
        'Olive': '#3f6212',
        'Red': '#dc2626',
        'Brown': '#8b4513'
    };
    
    return colorMap[colorName] || '#cccccc';
}

// Cart Functions
function addToCart(productId, size = 'M', color = null) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Get default color if not provided
    const defaultColor = color || (product.colors && product.colors[0]) || 'Default';
    const defaultSize = size || (product.sizes && product.sizes[0]) || 'M';
    
    // Check if product is already in cart
    const existingItem = cart.find(item => 
        item.id === productId && 
        item.size === defaultSize && 
        item.color === defaultColor
    );
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image,
            size: defaultSize,
            color: defaultColor
        });
    }
    
    updateCartDisplay();
    showToast(`${product.name} added to cart!`, 'success');
    saveCartToStorage();
    
    // Open cart sidebar
    openCart();
}

function removeFromCart(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        const productName = item.name;
        cart = cart.filter(item => item.id !== productId);
        updateCartDisplay();
        showToast(`${productName} removed from cart`, 'error');
        saveCartToStorage();
    }
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        const newQuantity = item.quantity + change;
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            updateCartDisplay();
            saveCartToStorage();
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
        if (elements.cartTotal) {
            elements.cartTotal.textContent = 'R0.00';
        }
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
                    <div class="cart-item-meta">Size: ${item.size} | Color: ${item.color}</div>
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="quantity-btn minus" data-id="${item.id}"></button>
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
    if (elements.cartTotal) {
        elements.cartTotal.textContent = `R${total.toFixed(2)}`;
    }
}

function saveCartToStorage() {
    try {
        localStorage.setItem('bebeysCart', JSON.stringify(cart));
    } catch (e) {
        console.error('Failed to save cart to localStorage:', e);
    }
}

function loadCartFromStorage() {
    try {
        const savedCart = localStorage.getItem('bebeysCart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
        }
    } catch (e) {
        console.error('Failed to load cart from localStorage:', e);
        cart = [];
    }
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

// Search Modal Functions
function openSearchModal() {
    if (elements.searchModal) {
        elements.searchModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        elements.searchInput.focus();
    }
}

function closeSearchModal() {
    if (elements.searchModal) {
        elements.searchModal.classList.remove('active');
        document.body.style.overflow = '';
        elements.searchInput.value = '';
        elements.searchResults.innerHTML = '';
    }
}

function performSearch() {
    const searchTerm = elements.searchInput.value.trim().toLowerCase();
    if (searchTerm === '') {
        elements.searchResults.innerHTML = '<p class="no-results">Please enter a search term.</p>';
        return;
    }
    
    // Search in products
    const productResults = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
    );
    
    // Search in store events
    const eventResults = storeEvents.filter(event => 
        event.title.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm) ||
        event.type.toLowerCase().includes(searchTerm)
    );
    
    // Search in store exclusives
    const exclusiveResults = storeExclusives.filter(exclusive => 
        exclusive.name.toLowerCase().includes(searchTerm) ||
        exclusive.description.toLowerCase().includes(searchTerm)
    );
    
    let html = '';
    
    if (productResults.length === 0 && eventResults.length === 0 && exclusiveResults.length === 0) {
        html = '<p class="no-results">No results found for "' + searchTerm + '".</p>';
    } else {
        if (productResults.length > 0) {
            html += '<h4>Products:</h4>';
            html += '<div class="search-results-grid">';
            productResults.forEach(product => {
                const formatPrice = (price) => `R${price.toFixed(2)}`;
                html += `
                    <div class="search-result-item" data-id="${product.id}">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="search-result-details">
                            <h5>${product.name}</h5>
                            <p class="search-result-category">${product.category}</p>
                            <p class="search-result-price">${formatPrice(product.price)}</p>
                            <button class="btn btn-small view-product" data-id="${product.id}">View Product</button>
                        </div>
                    </div>
                `;
            });
            html += '</div>';
        }
        
        if (eventResults.length > 0) {
            html += '<h4>Store Events:</h4>';
            html += '<div class="search-results-grid">';
            eventResults.forEach(event => {
                html += `
                    <div class="search-result-item event">
                        <div class="search-result-details">
                            <h5>${event.title}</h5>
                            <p class="search-result-meta">${event.date} • ${event.time}</p>
                            <p class="search-result-description">${event.description}</p>
                            <span class="event-type">${event.type}</span>
                        </div>
                    </div>
                `;
            });
            html += '</div>';
        }
        
        if (exclusiveResults.length > 0) {
            html += '<h4>Store Exclusives:</h4>';
            html += '<div class="search-results-grid">';
            exclusiveResults.forEach(exclusive => {
                const formatPrice = (price) => `R${price.toFixed(2)}`;
                html += `
                    <div class="search-result-item exclusive">
                        <img src="${exclusive.image}" alt="${exclusive.name}">
                        <div class="search-result-details">
                            <h5>${exclusive.name}</h5>
                            <p class="search-result-description">${exclusive.description}</p>
                            <p class="search-result-price">From ${formatPrice(exclusive.price)}</p>
                            <span class="exclusive-type">${exclusive.type}</span>
                        </div>
                    </div>
                `;
            });
            html += '</div>';
        }
    }
    
    elements.searchResults.innerHTML = html;
    
    // Add event listeners to view product buttons
    document.querySelectorAll('.view-product').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            closeSearchModal();
            openProductModal(productId);
        });
    });
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
    openProductModal,
    closeProductModal,
    openSearchModal,
    closeSearchModal,
    performSearch
};

// Update shop link to point to shop.html
document.querySelectorAll('a[href="#shop"]').forEach(link => {
    if (link.getAttribute('href') === '#shop') {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'shop.html';
        });
    }
});