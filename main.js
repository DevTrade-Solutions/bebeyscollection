import { products, storeInfo, storeEvents, storeExclusives, cart, user } from './data.js';

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
let currentCart = [];

// Home page shop pagination variables
let currentShopPage = 1;
const homeProductsPerPage = 4;
let currentHomeFilter = 'all';

// Initialize App
function init() {
    // Load cart from localStorage
    loadCartFromStorage();
    
    // Load shop products with pagination
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
    
    // Shop filters - FIXED: Proper event delegation
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
    
    // Event delegation for shop grid
    if (elements.shopGrid) {
        elements.shopGrid.addEventListener('click', function(e) {
            const target = e.target;
            const addToCartBtn = target.closest('.add-to-cart');
            const viewDetailsBtn = target.closest('.view-details');
            
            if (addToCartBtn) {
                const productId = parseInt(addToCartBtn.dataset.id);
                addToCart(productId);
            }
            
            if (viewDetailsBtn) {
                const productId = parseInt(viewDetailsBtn.dataset.id);
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
    
    // Search button functionality - FIXED
    if (elements.searchBtn) {
        elements.searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openSearchModal();
        });
    }
    
    // Account button functionality - FIXED: Redirect to account.html
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

// Render Shop Products - UPDATED WITH PAGINATION
function renderShopProducts(filter = 'all') {
    if (!elements.shopGrid) return;
    
    currentHomeFilter = filter;
    
    let filteredProducts = products;
    
    // Apply filter - FIXED: Proper filtering logic
    if (filter !== 'all') {
        filteredProducts = products.filter(product => {
            if (filter === 'in-store') return product.availability === 'in-store';
            if (filter === 'online') return product.availability === 'online' || product.availability === 'both';
            if (filter === 'new') return product.tags && product.tags.includes('new');
            if (filter === 'sale') return product.tags && product.tags.includes('sale');
            return true;
        });
    }
    
    // Calculate pagination
    const totalPages = Math.ceil(filteredProducts.length / homeProductsPerPage);
    const startIndex = (currentShopPage - 1) * homeProductsPerPage;
    const endIndex = startIndex + homeProductsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);
    
    // Clear grid
    elements.shopGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        elements.shopGrid.innerHTML = `
            <div class="no-products" style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: var(--accent); margin-bottom: 1rem;"></i>
                <h3>No products found</h3>
                <p>Try selecting a different filter</p>
            </div>
        `;
        
        // Update pagination
        updateHomePagination(totalPages, filteredProducts.length);
        return;
    }
    
    // Add products
    productsToShow.forEach(product => {
        const shopCard = createShopCard(product);
        elements.shopGrid.appendChild(shopCard);
    });
    
    // Update pagination
    updateHomePagination(totalPages, filteredProducts.length);
}

// Create Shop Card - REMOVED View in Store button
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
                    product.availability === 'online' ?
                    `<span class="availability-tag">Available Online</span>` :
                    `<span class="availability-tag">Available Both</span>`}
            </div>
            
            <div class="shop-actions">
                <button class="btn btn-primary add-to-cart" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                
                <button class="btn btn-secondary view-details" data-id="${product.id}">
                    <i class="fas fa-eye"></i> Details
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Filter Shop Products - FIXED: Proper filtering with pagination reset
function filterShopProducts(filter) {
    currentShopPage = 1; // Reset to first page when filter changes
    renderShopProducts(filter);
}

// Update Home Page Pagination
function updateHomePagination(totalPages, totalProducts) {
    // Remove existing pagination if any
    let existingPagination = document.getElementById('homeShopPagination');
    if (existingPagination) {
        existingPagination.remove();
    }
    
    if (totalPages <= 1) return;
    
    // Create pagination container
    const paginationContainer = document.createElement('div');
    paginationContainer.id = 'homeShopPagination';
    paginationContainer.className = 'shop-pagination';
    paginationContainer.style.cssText = 'display: flex; justify-content: center; align-items: center; gap: 1rem; margin-top: 2rem;';
    
    // Create Previous button
    const prevButton = document.createElement('button');
    prevButton.className = 'pagination-btn';
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevButton.disabled = currentShopPage === 1;
    prevButton.addEventListener('click', () => {
        if (currentShopPage > 1) {
            currentShopPage--;
            renderShopProducts(currentHomeFilter);
            window.scrollTo({
                top: document.getElementById('shop').offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
    
    // Create page info
    const pageInfo = document.createElement('span');
    pageInfo.textContent = `Page ${currentShopPage} of ${totalPages} (${totalProducts} products)`;
    pageInfo.style.cssText = 'font-size: 0.9rem; color: var(--text-light);';
    
    // Create Next button
    const nextButton = document.createElement('button');
    nextButton.className = 'pagination-btn';
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextButton.disabled = currentShopPage === totalPages;
    nextButton.addEventListener('click', () => {
        if (currentShopPage < totalPages) {
            currentShopPage++;
            renderShopProducts(currentHomeFilter);
            window.scrollTo({
                top: document.getElementById('shop').offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
    
    // Add CSS for pagination buttons
    const style = document.createElement('style');
    style.textContent = `
        .pagination-btn {
            padding: 0.5rem 1rem;
            border: 1px solid var(--border);
            background: none;
            border-radius: var(--radius-sm);
            cursor: pointer;
            color: var(--text);
            transition: var(--transition-normal);
        }
        .pagination-btn:hover:not(:disabled) {
            border-color: var(--accent);
            background-color: var(--accent);
            color: var(--primary);
        }
        .pagination-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    `;
    document.head.appendChild(style);
    
    paginationContainer.appendChild(prevButton);
    paginationContainer.appendChild(pageInfo);
    paginationContainer.appendChild(nextButton);
    
    // Add pagination after shop grid
    if (elements.shopGrid && elements.shopGrid.parentNode) {
        elements.shopGrid.parentNode.insertBefore(paginationContainer, elements.shopGrid.nextSibling);
    }
}

// Product Modal Functions
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    currentProduct = product;
    selectedSize = product.sizes[0];
    selectedColor = product.colors[0];
    
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
        'Green/White': '#065f46'
    };
    
    return colorMap[colorName] || '#cccccc';
}

// Cart Functions - FIXED: Working cart system
function addToCart(productId, size = 'M', color = null) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Get default color if not provided
    const defaultColor = color || (product.colors && product.colors[0]) || 'Default';
    const defaultSize = size || (product.sizes && product.sizes[0]) || 'M';
    
    // Check if product is already in cart
    const existingItem = currentCart.find(item => 
        item.id === productId && 
        item.size === defaultSize && 
        item.color === defaultColor
    );
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        currentCart.push({
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
    const index = currentCart.findIndex(item => item.id === productId);
    if (index !== -1) {
        const productName = currentCart[index].name;
        currentCart.splice(index, 1);
        updateCartDisplay();
        showToast(`${productName} removed from cart`, 'error');
        saveCartToStorage();
    }
}

function updateQuantity(productId, change) {
    const item = currentCart.find(item => item.id === productId);
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
    const totalItems = currentCart.reduce((total, item) => total + item.quantity, 0);
    
    cartCounts.forEach(count => {
        count.textContent = totalItems;
        count.style.display = totalItems > 0 ? 'flex' : 'none';
    });
    
    // Update cart sidebar
    updateCartSidebar();
}

function updateCartSidebar() {
    if (!elements.cartItems) return;
    
    if (currentCart.length === 0) {
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
    
    currentCart.forEach(item => {
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
    if (elements.cartTotal) {
        elements.cartTotal.textContent = `R${total.toFixed(2)}`;
    }
}

function saveCartToStorage() {
    try {
        localStorage.setItem('bebeysCart', JSON.stringify(currentCart));
    } catch (e) {
        console.error('Failed to save cart to localStorage:', e);
    }
}

function loadCartFromStorage() {
    try {
        const savedCart = localStorage.getItem('bebeysCart');
        if (savedCart) {
            currentCart = JSON.parse(savedCart);
        }
    } catch (e) {
        console.error('Failed to load cart from localStorage:', e);
        currentCart = [];
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
    renderShopProducts,
    openProductModal,
    closeProductModal,
    openSearchModal,
    closeSearchModal,
    performSearch
};

// In the existing setupEventListeners function in main.js, ensure shop links point to shop.html
document.querySelectorAll('a[href="#shop"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'shop.html';
    });
});

// Also update the mobile menu shop link
document.querySelectorAll('.mobile-nav-links a[href="#shop"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        closeMobileMenu();
        window.location.href = 'shop.html';
    });
});
