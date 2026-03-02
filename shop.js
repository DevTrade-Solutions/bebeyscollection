import { products, categories, cart, user } from './data.js';

// Secondary images for hover effect (based on productAdditionalImages from main.js)
const productSecondaryImages = {
    1: "img/shop/2P-set.png",
    2: "img/shop/2P-set1.png",
    3: "img/shop/akara-pant-bnw1.png",
    4: "img/shop/dress-02.png",
    5: "img/shop/kid-top-b2.JPG",
    6: "img/shop/bubu-g2.png",
    7: "img/shop/7-1.jpg",
    8: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
    9: "img/shop/dress-03.JPG",
    10: "img/shop/men/tops/rainbow1.JPG",
    11: "img/shop/akara-pant-bnw1.png",
    12: "img/shop/a2.JPG",
    13: "img/shop/men/tops/d-blue-top.JPG",
    14: "img/shop/a3.JPG",
    15: "img/shop/wrap-dress-blue-01.png",
    16: "img/shop/video/2P-set1.png",
    17: "img/shop/bubu-g2.png",
    18: "img/shop/men/tops/white-red-longsleeve.JPG",
    19: "img/shop/kids/b-kid-short.JPG",
    21: "img/shop/men/tops/rainbow2.JPG",
    22: "img/shop/kids/kids-akara-2.JPG"
};

// Shop Page State
let shopState = {
    currentCategory: 'all',
    currentView: 'grid',
    currentSort: 'default',
    currentPage: 1,
    productsPerPage: 12,
    activeFilters: {
        availability: ['all'],
        tags: [],
        sizes: [],
        priceRange: { min: 0, max: 10000 }
    }
};

// Current cart and wishlist
let currentCart = [];
let wishlist = [];

// DOM Elements
let elements = {};

// Initialize Shop Page
function initShopPage() {
    console.log('Initializing shop page...');
    
    initializeElements();
    loadCartFromStorage();
    loadWishlistFromStorage(); // load wishlist
    
    setupCategories();
    
    if (products && products.length > 0) {
        renderProducts();
    } else {
        console.warn('No products found in data.js – keeping static cards.');
        attachStaticCardEvents();
    }
    
    setupEventListeners();
    updateCartDisplay();
    loadSuggestedItems();
    
    console.log('Shop page initialized with', products ? products.length : 0, 'products from data');
}

// Load wishlist from localStorage
function loadWishlistFromStorage() {
    try {
        const saved = localStorage.getItem('bebeysWishlist');
        if (saved) {
            wishlist = JSON.parse(saved);
        }
    } catch (e) {
        console.error('Failed to load wishlist', e);
        wishlist = [];
    }
}

// Save wishlist to localStorage
function saveWishlistToStorage() {
    try {
        localStorage.setItem('bebeysWishlist', JSON.stringify(wishlist));
    } catch (e) {
        console.error('Failed to save wishlist', e);
    }
}

// Check if product is in wishlist
function isInWishlist(productId) {
    return wishlist.some(item => item.id === productId);
}

// Toggle wishlist item
function toggleWishlist(product) {
    const index = wishlist.findIndex(item => item.id === product.id);
    if (index === -1) {
        wishlist.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category
        });
        showToast(`${product.name} added to wishlist`, 'success');
    } else {
        wishlist.splice(index, 1);
        showToast(`${product.name} removed from wishlist`, 'error');
    }
    saveWishlistToStorage();
    updateWishlistButtonInModal();
}

// Update the wishlist button icon based on current product
function updateWishlistButtonInModal() {
    const wishlistBtn = document.getElementById('modalWishlist');
    if (!wishlistBtn || !currentProduct) return;
    const icon = wishlistBtn.querySelector('i');
    const span = wishlistBtn.querySelector('span');
    if (isInWishlist(currentProduct.id)) {
        icon.className = 'fas fa-heart'; // solid heart
        span.textContent = 'Remove from Wishlist';
    } else {
        icon.className = 'far fa-heart'; // regular heart
        span.textContent = 'Add to Wishlist';
    }
}

// Attach click events to static product cards (if products array is empty)
function attachStaticCardEvents() {
    const container = document.getElementById('productsContainer');
    if (!container) return;
    
    container.addEventListener('click', function(e) {
        const addToCartBtn = e.target.closest('.add-to-cart');
        const viewDetailsBtn = e.target.closest('.view-details');
        
        if (addToCartBtn) {
            const productId = parseInt(addToCartBtn.dataset.id);
            const card = addToCartBtn.closest('.shop-card');
            if (card) {
                const product = {
                    id: productId,
                    name: card.querySelector('.shop-title').textContent.trim(),
                    price: parseFloat(card.querySelector('.price').textContent.replace('R', '').replace(',', '')),
                    image: card.querySelector('.shop-image img').src,
                    category: card.querySelector('.shop-category').textContent.trim(),
                    sizes: ['S', 'M', 'L'],
                    colors: ['Default']
                };
                addToCartFromStatic(product);
            }
        }
        
        if (viewDetailsBtn) {
            const productId = parseInt(viewDetailsBtn.dataset.id);
            openProductModalFromStatic(productId);
        }
    });
}

// Add to cart using static product data
function addToCartFromStatic(product) {
    const existingItem = currentCart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        currentCart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image,
            size: 'M',
            color: 'Default'
        });
    }
    
    updateCartDisplay();
    showToast(`✓ Added to cart`, 'success', 1500);
    saveCartToStorage();
}

// Open modal using static card data
function openProductModalFromStatic(productId) {
    const card = document.querySelector(`.shop-card[data-id="${productId}"]`);
    if (!card) return;
    
    const product = {
        id: productId,
        name: card.querySelector('.shop-title').textContent.trim(),
        category: card.querySelector('.shop-category').textContent.trim(),
        description: card.querySelector('.shop-description')?.textContent.trim() || 'No description available',
        price: parseFloat(card.querySelector('.price').textContent.replace('R', '').replace(',', '')),
        originalPrice: card.querySelector('.original-price') ? 
            parseFloat(card.querySelector('.original-price').textContent.replace('R', '').replace(',', '')) : null,
        image: card.querySelector('.shop-image img').src,
        availability: card.dataset.availability || 'online',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Gold', 'Silver', 'Bronze']
    };
    
    openProductModal(product);
}

// Initialize DOM Elements
function initializeElements() {
    elements = {
        productsContainer: document.getElementById('productsContainer'),
        productsCount: document.getElementById('productsCount'),
        viewGrid: document.getElementById('viewGrid'),
        viewList: document.getElementById('viewList'),
        sortSelect: document.getElementById('sortSelect'),
        categoryList: document.getElementById('categoryList'),
        availabilityList: document.getElementById('availabilityList'),
        collectionList: document.getElementById('collectionList'),
        sizeList: document.getElementById('sizeList'),
        minPrice: document.getElementById('minPrice'),
        maxPrice: document.getElementById('maxPrice'),
        priceSlider: document.getElementById('priceSlider'),
        applyPrice: document.getElementById('applyPrice'),
        clearFilters: document.getElementById('clearFilters'),
        prevPage: document.getElementById('prevPage'),
        nextPage: document.getElementById('nextPage'),
        paginationNumbers: document.getElementById('paginationNumbers'),
        mobileSidebarToggle: document.getElementById('mobileSidebarToggle'),
        shopSidebar: document.getElementById('shopSidebar'),
        cartBtn: document.getElementById('cartBtn'),
        mobileCartBtn: document.getElementById('mobileCartBtn'),
        cartItems: document.getElementById('cartItems'),
        cartTotal: document.getElementById('cartTotal'),
        cartSidebar: document.getElementById('cartSidebar'),
        closeCart: document.getElementById('closeCart'),
        continueShopping: document.getElementById('continueShopping'),
        menuToggle: document.getElementById('menuToggle'),
        mobileMenu: document.getElementById('mobileMenu'),
        closeMenu: document.getElementById('closeMenu'),
        searchBtn: document.querySelector('.search-btn'),
        accountBtn: document.querySelector('.account-btn'),
        searchModal: document.getElementById('searchModal'),
        closeSearchModal: document.getElementById('closeSearchModal'),
        searchInput: document.getElementById('searchInput'),
        searchButton: document.getElementById('searchButton'),
        searchResults: document.getElementById('searchResults'),
        searchSuggestions: document.getElementById('searchSuggestions'),
        suggestedItems: document.getElementById('suggestedItems'),
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
        modalWishlist: document.getElementById('modalWishlist'),
        modalViewInStore: document.getElementById('modalViewInStore'),
        toast: document.getElementById('toast')
    };
}

// Setup Event Listeners
function setupEventListeners() {
    // View toggle
    if (elements.viewGrid) {
        elements.viewGrid.addEventListener('click', () => {
            shopState.currentView = 'grid';
            elements.viewGrid.classList.add('active');
            elements.viewList.classList.remove('active');
            if (elements.productsContainer) {
                elements.productsContainer.className = 'products-grid';
            }
            if (products && products.length > 0) {
                renderProducts();
            }
        });
    }
    
    if (elements.viewList) {
        elements.viewList.addEventListener('click', () => {
            shopState.currentView = 'list';
            elements.viewList.classList.add('active');
            elements.viewGrid.classList.remove('active');
            if (elements.productsContainer) {
                elements.productsContainer.className = 'products-list';
            }
            if (products && products.length > 0) {
                renderProducts();
            }
        });
    }
    
    // Sort select
    if (elements.sortSelect) {
        elements.sortSelect.addEventListener('change', function() {
            shopState.currentSort = this.value;
            shopState.currentPage = 1;
            if (products && products.length > 0) {
                renderProducts();
            }
        });
    }
    
    // Category filter
    if (elements.categoryList) {
        elements.categoryList.addEventListener('click', function(e) {
            const categoryLink = e.target.closest('.category-link');
            if (categoryLink) {
                e.preventDefault();
                const category = categoryLink.dataset.category;
                shopState.currentCategory = category;
                shopState.currentPage = 1;
                updateCategorySelection();
                if (products && products.length > 0) {
                    renderProducts();
                }
            }
        });
    }
    
    // Availability filter
    if (elements.availabilityList) {
        elements.availabilityList.addEventListener('change', function(e) {
            if (e.target.type === 'checkbox') {
                const filter = e.target.parentElement.dataset.filter;
                handleAvailabilityFilter(e.target, filter);
                shopState.currentPage = 1;
                if (products && products.length > 0) {
                    renderProducts();
                }
            }
        });
    }
    
    // Collection filter
    if (elements.collectionList) {
        elements.collectionList.addEventListener('change', function(e) {
            if (e.target.type === 'checkbox') {
                const tag = e.target.parentElement.dataset.tag;
                if (e.target.checked) {
                    shopState.activeFilters.tags.push(tag);
                } else {
                    shopState.activeFilters.tags = shopState.activeFilters.tags.filter(t => t !== tag);
                }
                shopState.currentPage = 1;
                if (products && products.length > 0) {
                    renderProducts();
                }
            }
        });
    }
    
    // Size filter
    if (elements.sizeList) {
        elements.sizeList.addEventListener('change', function(e) {
            if (e.target.type === 'checkbox') {
                const size = e.target.parentElement.dataset.size;
                if (e.target.checked) {
                    shopState.activeFilters.sizes.push(size.toUpperCase());
                } else {
                    shopState.activeFilters.sizes = shopState.activeFilters.sizes.filter(s => s !== size.toUpperCase());
                }
                shopState.currentPage = 1;
                if (products && products.length > 0) {
                    renderProducts();
                }
            }
        });
    }
    
    // Price filter
    if (elements.applyPrice) {
        elements.applyPrice.addEventListener('click', function() {
            const min = parseInt(elements.minPrice.value) || 0;
            const max = parseInt(elements.maxPrice.value) || 10000;
            shopState.activeFilters.priceRange = { min, max };
            shopState.currentPage = 1;
            if (products && products.length > 0) {
                renderProducts();
            }
        });
    }
    
    if (elements.priceSlider) {
        elements.priceSlider.addEventListener('input', function() {
            elements.maxPrice.value = this.value;
        });
    }
    
    // Clear filters
    if (elements.clearFilters) {
        elements.clearFilters.addEventListener('click', function() {
            resetFilters();
            if (products && products.length > 0) {
                renderProducts();
            }
        });
    }
    
    // Pagination
    if (elements.prevPage) {
        elements.prevPage.addEventListener('click', function() {
            if (shopState.currentPage > 1) {
                shopState.currentPage--;
                if (products && products.length > 0) {
                    renderProducts();
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
    
    if (elements.nextPage) {
        elements.nextPage.addEventListener('click', function() {
            const filteredProducts = getFilteredProducts();
            const totalPages = Math.ceil(filteredProducts.length / shopState.productsPerPage);
            if (shopState.currentPage < totalPages) {
                shopState.currentPage++;
                if (products && products.length > 0) {
                    renderProducts();
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
    
    // Mobile sidebar toggle
    if (elements.mobileSidebarToggle) {
        elements.mobileSidebarToggle.addEventListener('click', function() {
            elements.shopSidebar.classList.toggle('active');
        });
    }
    
    // Product click events (delegation)
    if (elements.productsContainer) {
        elements.productsContainer.addEventListener('click', function(e) {
            const addToCartBtn = e.target.closest('.add-to-cart');
            const viewDetailsBtn = e.target.closest('.view-details');
            
            if (addToCartBtn) {
                const productId = parseInt(addToCartBtn.dataset.id);
                if (products && products.length > 0) {
                    addToCart(productId);
                } else {
                    const card = addToCartBtn.closest('.shop-card');
                    if (card) {
                        const product = {
                            id: productId,
                            name: card.querySelector('.shop-title').textContent.trim(),
                            price: parseFloat(card.querySelector('.price').textContent.replace('R', '').replace(',', '')),
                            image: card.querySelector('.shop-image img').src,
                            category: card.querySelector('.shop-category').textContent.trim(),
                            sizes: ['S', 'M', 'L'],
                            colors: ['Default']
                        };
                        addToCartFromStatic(product);
                    }
                }
            }
            
            if (viewDetailsBtn) {
                const productId = parseInt(viewDetailsBtn.dataset.id);
                if (products && products.length > 0) {
                    openProductModal(productId);
                } else {
                    openProductModalFromStatic(productId);
                }
            }
        });
    }
    
    // Cart functionality
    if (elements.cartBtn) {
        elements.cartBtn.addEventListener('click', openCart);
    }
    
    if (elements.mobileCartBtn) {
        elements.mobileCartBtn.addEventListener('click', openCart);
    }
    
    if (elements.closeCart) {
        elements.closeCart.addEventListener('click', closeCart);
    }
    
    if (elements.continueShopping) {
        elements.continueShopping.addEventListener('click', closeCart);
    }
    
    // Mobile menu
    if (elements.menuToggle) {
        elements.menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    if (elements.closeMenu) {
        elements.closeMenu.addEventListener('click', closeMobileMenu);
    }
    
    // Search functionality
    if (elements.searchBtn) {
        elements.searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openSearchModal();
        });
    }
    
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
        elements.searchInput.addEventListener('input', function() {
            showSearchSuggestions(this.value);
        });
        
        elements.searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Product modal
    if (elements.closeModal) {
        elements.closeModal.addEventListener('click', closeProductModal);
    }
    
    if (elements.productModal) {
        elements.productModal.addEventListener('click', function(e) {
            if (e.target === elements.productModal) {
                closeProductModal();
            }
        });
    }
    
    // Wishlist button in modal
    if (elements.modalWishlist) {
        elements.modalWishlist.addEventListener('click', function() {
            if (currentProduct) {
                toggleWishlist(currentProduct);
            }
        });
    }
    
    // Account button
    if (elements.accountBtn) {
        elements.accountBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'account.html';
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992 && 
            elements.shopSidebar && 
            elements.shopSidebar.classList.contains('active') &&
            !elements.shopSidebar.contains(e.target) &&
            e.target !== elements.mobileSidebarToggle &&
            !elements.mobileSidebarToggle.contains(e.target)) {
            elements.shopSidebar.classList.remove('active');
        }
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

// Setup Categories
function setupCategories() {
    if (!elements.categoryList) return;
    
    let html = '';
    categories.forEach(category => {
        const activeClass = category.id === shopState.currentCategory ? 'active' : '';
        html += `
            <li class="category-item">
                <a href="shop.html?category=${category.id}" class="category-link ${activeClass}" data-category="${category.id}">
                    ${category.name}
                    <span class="category-count">${category.count}</span>
                </a>
            </li>
        `;
    });
    
    elements.categoryList.innerHTML = html;
}

// Update Category Selection
function updateCategorySelection() {
    document.querySelectorAll('.category-link').forEach(link => {
        if (link.dataset.category === shopState.currentCategory) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Handle Availability Filter
function handleAvailabilityFilter(checkbox, filter) {
    const allCheckbox = document.querySelector('#availabilityList input[data-filter="all"]');
    
    if (filter === 'all') {
        if (checkbox.checked) {
            document.querySelectorAll('#availabilityList input[type="checkbox"]').forEach(cb => {
                if (cb !== checkbox) cb.checked = false;
            });
            shopState.activeFilters.availability = ['all'];
        }
    } else {
        if (checkbox.checked) {
            if (allCheckbox) allCheckbox.checked = false;
            shopState.activeFilters.availability = shopState.activeFilters.availability.filter(f => f !== 'all');
            if (!shopState.activeFilters.availability.includes(filter)) {
                shopState.activeFilters.availability.push(filter);
            }
        } else {
            shopState.activeFilters.availability = shopState.activeFilters.availability.filter(f => f !== filter);
            if (shopState.activeFilters.availability.length === 0) {
                shopState.activeFilters.availability = ['all'];
                if (allCheckbox) allCheckbox.checked = true;
            }
        }
    }
}

// Get Filtered Products
function getFilteredProducts() {
    let filteredProducts = [...products];
    
    if (shopState.currentCategory !== 'all') {
        const categoryName = shopState.currentCategory.replace('-', ' ');
        filteredProducts = filteredProducts.filter(product => 
            product.category.toLowerCase() === categoryName.toLowerCase()
        );
    }
    
    if (shopState.activeFilters.availability.length > 0 && !shopState.activeFilters.availability.includes('all')) {
        filteredProducts = filteredProducts.filter(product => {
            return shopState.activeFilters.availability.some(filter => {
                if (filter === 'in-store') return product.availability === 'in-store';
                if (filter === 'online') return product.availability === 'online';
                if (filter === 'both') return product.availability === 'both';
                return true;
            });
        });
    }
    
    if (shopState.activeFilters.tags.length > 0) {
        filteredProducts = filteredProducts.filter(product => {
            return shopState.activeFilters.tags.some(tag => 
                product.tags && product.tags.includes(tag)
            );
        });
    }
    
    if (shopState.activeFilters.sizes.length > 0) {
        filteredProducts = filteredProducts.filter(product => {
            return shopState.activeFilters.sizes.some(size => 
                product.sizes && product.sizes.includes(size)
            );
        });
    }
    
    filteredProducts = filteredProducts.filter(product => 
        product.price >= shopState.activeFilters.priceRange.min &&
        product.price <= shopState.activeFilters.priceRange.max
    );
    
    filteredProducts = sortProducts(filteredProducts, shopState.currentSort);
    
    return filteredProducts;
}

// Sort Products
function sortProducts(products, sortType) {
    const sortedProducts = [...products];
    
    switch (sortType) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'newest':
            sortedProducts.sort((a, b) => b.id - a.id);
            break;
        case 'bestselling':
            sortedProducts.sort((a, b) => {
                const aIsBestseller = a.tags && a.tags.includes('bestseller') ? 1 : 0;
                const bIsBestseller = b.tags && b.tags.includes('bestseller') ? 1 : 0;
                if (aIsBestseller !== bIsBestseller) {
                    return bIsBestseller - aIsBestseller;
                }
                return b.price - a.price;
            });
            break;
        default:
            sortedProducts.sort((a, b) => {
                const aIsFeatured = a.tags && a.tags.includes('featured') ? 1 : 0;
                const bIsFeatured = b.tags && b.tags.includes('featured') ? 1 : 0;
                if (aIsFeatured !== bIsFeatured) {
                    return bIsFeatured - aIsFeatured;
                }
                return b.price - a.price;
            });
            break;
    }
    
    return sortedProducts;
}

// Render Products (only called when products array exists)
function renderProducts() {
    const filteredProducts = getFilteredProducts();
    const totalProducts = filteredProducts.length;
    
    if (elements.productsCount) {
        const start = (shopState.currentPage - 1) * shopState.productsPerPage + 1;
        const end = Math.min(shopState.currentPage * shopState.productsPerPage, totalProducts);
        elements.productsCount.textContent = `Showing ${start}-${end} of ${totalProducts} products`;
    }
    
    const startIndex = (shopState.currentPage - 1) * shopState.productsPerPage;
    const endIndex = startIndex + shopState.productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);
    
    if (elements.productsContainer) {
        elements.productsContainer.innerHTML = '';
        
        if (productsToShow.length === 0) {
            elements.productsContainer.innerHTML = `
                <div class="empty-shop" style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                    <i class="fas fa-search" style="font-size: 3rem; color: var(--accent); margin-bottom: 1rem;"></i>
                    <h3>No products found</h3>
                    <p>Try adjusting your filters or browse all products.</p>
                    <button class="btn btn-primary" id="resetAllFilters" style="margin-top: 1rem;">Reset All Filters</button>
                </div>
            `;
            
            document.getElementById('resetAllFilters')?.addEventListener('click', function() {
                resetFilters();
                renderProducts();
            });
            
            updatePagination(totalProducts);
            return;
        }
        
        productsToShow.forEach((product) => {
            const productCard = createProductCard(product);
            elements.productsContainer.appendChild(productCard);
        });
    }
    
    updatePagination(totalProducts);
}

// Create Product Card (with secondary image if available)
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'shop-card fade-in';
    card.dataset.id = product.id;

    const hasDiscount = product.originalPrice !== null && product.originalPrice > product.price;
    const discountPercent = hasDiscount ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
    const formatPrice = (price) => `R${price.toFixed(2)}`;

    let availabilityText = '', availabilityClass = '';
    if (product.availability === 'in-store') {
        availabilityText = 'In-Store Only';
        availabilityClass = 'in-store';
    } else if (product.availability === 'online') {
        availabilityText = 'Available Online';
        availabilityClass = 'online';
    } else {
        availabilityText = 'Available Both';
        availabilityClass = 'both';
    }

    const secondaryImage = productSecondaryImages[product.id];

    if (shopState.currentView === 'grid') {
        card.innerHTML = `
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            <div class="shop-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy" class="product-image-main" onerror="this.src='https://via.placeholder.com/300x400?text=Product+Image'">
                ${secondaryImage ? `<img src="${secondaryImage}" alt="${product.name} hover" class="product-image-secondary" loading="lazy" onerror="this.style.display='none'">` : ''}
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
                    <span class="availability-tag ${availabilityClass}">${availabilityText}</span>
                </div>
                <div class="shop-actions" style="display: flex; flex-direction: row;">
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}" aria-label="Add to Cart">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                    <button class="btn btn-secondary view-details" data-id="${product.id}" aria-label="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        `;
    } else {
        // List view
        card.innerHTML = `
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            <div class="shop-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy" class="product-image-main" onerror="this.src='https://via.placeholder.com/300x400?text=Product+Image'">
                ${secondaryImage ? `<img src="${secondaryImage}" alt="${product.name} hover" class="product-image-secondary" loading="lazy" onerror="this.style.display='none'">` : ''}
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
                    <span class="availability-tag ${availabilityClass}">${availabilityText}</span>
                </div>
                <div class="shop-actions" style="display: flex; flex-direction: row;">
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}" aria-label="Add to Cart">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                    <button class="btn btn-secondary view-details" data-id="${product.id}" aria-label="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        `;
    }

    return card;
}

// Update Pagination
function updatePagination(totalProducts) {
    const totalPages = Math.ceil(totalProducts / shopState.productsPerPage);
    
    if (elements.prevPage) {
        elements.prevPage.disabled = shopState.currentPage === 1;
    }
    
    if (elements.nextPage) {
        elements.nextPage.disabled = shopState.currentPage === totalPages;
    }
    
    if (elements.paginationNumbers) {
        let html = '';
        const maxVisiblePages = 5;
        let startPage = Math.max(1, shopState.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        if (startPage > 1) {
            html += `<div class="page-number" data-page="1">1</div>`;
            if (startPage > 2) {
                html += `<span style="padding: 0.5rem;">...</span>`;
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            const activeClass = i === shopState.currentPage ? 'active' : '';
            html += `<div class="page-number ${activeClass}" data-page="${i}">${i}</div>`;
        }
        
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                html += `<span style="padding: 0.5rem;">...</span>`;
            }
            html += `<div class="page-number" data-page="${totalPages}">${totalPages}</div>`;
        }
        
        elements.paginationNumbers.innerHTML = html;
        
        elements.paginationNumbers.querySelectorAll('.page-number').forEach(page => {
            page.addEventListener('click', function() {
                const pageNum = parseInt(this.dataset.page);
                if (pageNum !== shopState.currentPage) {
                    shopState.currentPage = pageNum;
                    if (products && products.length > 0) {
                        renderProducts();
                    }
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        });
    }
}

// Load Suggested Items
function loadSuggestedItems() {
    if (!elements.suggestedItems) return;
    
    const suggestedProducts = products && products.length > 0 
        ? [...products].sort(() => 0.5 - Math.random()).slice(0, 4)
        : [];
    
    let html = '';
    suggestedProducts.forEach(product => {
        const hasDiscount = product.originalPrice !== null && product.originalPrice > product.price;
        const discountPercent = hasDiscount ? 
            Math.round((1 - product.price / product.originalPrice) * 100) : 0;
        
        const formatPrice = (price) => `R${price.toFixed(2)}`;
        
        html += `
            <div class="featured-item">
                <div class="featured-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x200?text=Product'">
                </div>
                <div class="featured-content">
                    <h4>${product.name}</h4>
                    <p>${product.category}</p>
                    <div class="shop-price">
                        ${hasDiscount ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
                        <span class="price">${formatPrice(product.price)}</span>
                        ${hasDiscount ? `<div class="discount">Save ${discountPercent}%</div>` : ''}
                    </div>
                    <button class="btn btn-small add-to-cart" data-id="${product.id}" style="margin-top: 0.5rem;">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
    });
    
    elements.suggestedItems.innerHTML = html;
    
    elements.suggestedItems.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            addToCart(productId);
        });
    });
}

// Reset Filters
function resetFilters() {
    shopState.currentCategory = 'all';
    shopState.activeFilters = {
        availability: ['all'],
        tags: [],
        sizes: [],
        priceRange: { min: 0, max: 10000 }
    };
    shopState.currentPage = 1;
    shopState.currentSort = 'default';
    
    updateCategorySelection();
    
    document.querySelectorAll('#availabilityList input[type="checkbox"]').forEach(cb => {
        if (cb.parentElement.dataset.filter === 'all') {
            cb.checked = true;
        } else {
            cb.checked = false;
        }
    });
    
    document.querySelectorAll('#collectionList input[type="checkbox"], #sizeList input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });
    
    if (elements.minPrice) elements.minPrice.value = 0;
    if (elements.maxPrice) elements.maxPrice.value = 10000;
    if (elements.priceSlider) elements.priceSlider.value = 10000;
    
    if (elements.sortSelect) elements.sortSelect.value = 'default';
    
    if (elements.shopSidebar) {
        elements.shopSidebar.classList.remove('active');
    }
}

// Cart Functions
let currentProduct = null;

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = currentCart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        currentCart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image,
            size: product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'M',
            color: product.colors && product.colors.length > 0 ? product.colors[0] : 'Default'
        });
    }
    
    updateCartDisplay();
    showToast(`✓ Added to cart`, 'success', 1500);
    saveCartToStorage();
}

function removeFromCart(productId) {
    const index = currentCart.findIndex(item => item.id === productId);
    if (index !== -1) {
        currentCart.splice(index, 1);
        updateCartDisplay();
        showToast(`Item removed`, 'error', 1500);
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
    const cartCounts = document.querySelectorAll('.cart-count');
    const totalItems = currentCart.reduce((total, item) => total + item.quantity, 0);
    
    cartCounts.forEach(count => {
        count.textContent = totalItems;
        count.style.display = totalItems > 0 ? 'flex' : 'none';
    });
    
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
                <a href="shop.html" class="btn btn-primary">Continue Shopping</a>
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
                    <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/100x100?text=Product'">
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
    
    elements.cartItems.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id || e.target.closest('[data-id]').dataset.id);
            updateQuantity(productId, -1);
        });
    });
    
    elements.cartItems.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id || e.target.closest('[data-id]').dataset.id);
            updateQuantity(productId, 1);
        });
    });
    
    elements.cartItems.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id || e.target.closest('[data-id]').dataset.id);
            removeFromCart(productId);
        });
    });
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

// Product Modal (for dynamic products)
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    currentProduct = product;
    
    const hasDiscount = product.originalPrice !== null && product.originalPrice > product.price;
    const discountPercent = hasDiscount ? 
        Math.round((1 - product.price / product.originalPrice) * 100) : 0;
    
    const formatPrice = (price) => `R${price.toFixed(2)}`;
    
    if (elements.modalImage) elements.modalImage.src = product.image;
    if (elements.modalImage) elements.modalImage.alt = product.name;
    if (elements.modalTitle) elements.modalTitle.textContent = product.name;
    if (elements.modalCategory) elements.modalCategory.textContent = product.category;
    if (elements.modalDescription) elements.modalDescription.textContent = product.description;
    
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
    
    if (elements.modalSizes) {
        elements.modalSizes.innerHTML = '';
        if (product.sizes && product.sizes.length > 0) {
            product.sizes.forEach(size => {
                const sizeElement = document.createElement('div');
                sizeElement.className = 'size';
                sizeElement.textContent = size;
                sizeElement.dataset.size = size;
                sizeElement.addEventListener('click', () => {
                    document.querySelectorAll('.modal-details .size').forEach(s => s.classList.remove('active'));
                    sizeElement.classList.add('active');
                });
                elements.modalSizes.appendChild(sizeElement);
            });
            
            if (elements.modalSizes.firstChild) {
                elements.modalSizes.firstChild.classList.add('active');
            }
        } else {
            elements.modalSizes.innerHTML = '<p>One Size</p>';
        }
    }
    
    if (elements.modalColors) {
        elements.modalColors.innerHTML = '';
        if (product.colors && product.colors.length > 0) {
            product.colors.forEach(color => {
                const colorElement = document.createElement('div');
                colorElement.className = 'color';
                colorElement.style.backgroundColor = getColorValue(color);
                colorElement.title = color;
                colorElement.dataset.color = color;
                colorElement.addEventListener('click', () => {
                    document.querySelectorAll('.modal-details .color').forEach(c => c.classList.remove('active'));
                    colorElement.classList.add('active');
                });
                elements.modalColors.appendChild(colorElement);
            });
            
            if (elements.modalColors.firstChild) {
                elements.modalColors.firstChild.classList.add('active');
            }
        } else {
            elements.modalColors.innerHTML = '<p>Available in all colors</p>';
        }
    }
    
    // Update wishlist button state
    updateWishlistButtonInModal();
    
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
        'Yellow/Black': '#ffd700',
        'Pink/Orange': '#ff69b4',
        'Green/Gold': '#065f46',
        'Purple/White': '#6b21a8',
        'Black': '#000000',
        'Navy': '#000080',
        'Olive': '#808000',
        'Red': '#ff0000',
        'Light Blue': '#93c5fd',
        'White': '#ffffff',
        'Emerald': '#065f46',
        'Royal Blue': '#1e40af',
        'Deep Red': '#7f1d1d',
        'Pink/White': '#f9a8d4',
        'Blue/Grey': '#374151',
        'Green/Beige': '#065f46',
        'Red/Black': '#7f1d1d',
        'Purple/Orange': '#6b21a8',
        'Mixed Metals': 'linear-gradient(45deg, #d4af37, #c0c0c0)'
    };
    
    return colorMap[colorName] || '#cccccc';
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
        updateCartSidebar();
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

// Search Functions
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
        elements.searchSuggestions.innerHTML = '';
        elements.searchSuggestions.classList.remove('active');
    }
}

function showSearchSuggestions(searchTerm) {
    if (!elements.searchSuggestions || !searchTerm.trim()) {
        elements.searchSuggestions.innerHTML = '';
        elements.searchSuggestions.classList.remove('active');
        return;
    }
    
    const term = searchTerm.toLowerCase();
    const suggestions = [];
    
    if (products && products.length > 0) {
        products.forEach(product => {
            if (product.name.toLowerCase().includes(term) || 
                product.category.toLowerCase().includes(term) ||
                (product.tags && product.tags.some(tag => tag.toLowerCase().includes(term)))) {
                suggestions.push({
                    type: 'product',
                    id: product.id,
                    name: product.name,
                    category: product.category,
                    price: product.price,
                    image: product.image
                });
            }
        });
    }
    
    categories.forEach(category => {
        if (category.name.toLowerCase().includes(term)) {
            suggestions.push({
                type: 'category',
                id: category.id,
                name: category.name,
                description: `${category.count} products`
            });
        }
    });
    
    if (suggestions.length > 0) {
        let html = '';
        suggestions.slice(0, 5).forEach(item => {
            if (item.type === 'product') {
                html += `
                    <div class="suggestion-item" data-id="${item.id}" data-type="product">
                        <h5>${item.name}</h5>
                        <p>${item.category} • R${item.price.toFixed(2)}</p>
                    </div>
                `;
            } else {
                html += `
                    <div class="suggestion-item" data-id="${item.id}" data-type="category">
                        <h5>${item.name}</h5>
                        <p>${item.description}</p>
                    </div>
                `;
            }
        });
        
        elements.searchSuggestions.innerHTML = html;
        elements.searchSuggestions.classList.add('active');
        
        elements.searchSuggestions.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', function() {
                const id = this.dataset.id;
                const type = this.dataset.type;
                
                if (type === 'product') {
                    closeSearchModal();
                    openProductModal(parseInt(id));
                } else if (type === 'category') {
                    window.location.href = `shop.html?category=${id}`;
                }
            });
        });
    } else {
        elements.searchSuggestions.innerHTML = '';
        elements.searchSuggestions.classList.remove('active');
    }
}

function performSearch() {
    const searchTerm = elements.searchInput.value.trim().toLowerCase();
    if (searchTerm === '') {
        elements.searchResults.innerHTML = '<p class="no-results">Please enter a search term.</p>';
        return;
    }
    
    let productResults = [];
    if (products && products.length > 0) {
        productResults = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
        );
    }
    
    let html = '';
    
    if (productResults.length === 0) {
        html = '<p class="no-results">No products found for "' + searchTerm + '".</p>';
    } else {
        html += '<h4>Search Results:</h4>';
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
    
    elements.searchResults.innerHTML = html;
    
    document.querySelectorAll('.view-product').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            closeSearchModal();
            openProductModal(productId);
        });
    });
}

// Toast Notification
function showToast(message, type = 'success', duration = 1500) {
    if (!elements.toast) {
        elements.toast = document.createElement('div');
        elements.toast.id = 'toast';
        elements.toast.className = 'toast';
        document.body.appendChild(elements.toast);
    }
    
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    elements.toast.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
    elements.toast.className = 'toast';
    elements.toast.classList.add(type);
    elements.toast.classList.add('show');
    
    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, duration);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Shop page loaded, initializing...');
    initShopPage();
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
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
                
                closeMobileMenu();
            }
        });
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
        closeMobileMenu();
        if (elements.shopSidebar) {
            elements.shopSidebar.classList.remove('active');
        }
    }
});

// Debug helper
window.debugShop = {
    getState: () => shopState,
    getProducts: () => products,
    getFilteredProducts: () => getFilteredProducts(),
    renderProducts: () => renderProducts(),
    resetFilters: () => resetFilters(),
    getCart: () => currentCart,
    addToCart: (id) => addToCart(id)
};

console.log('Shop.js loaded successfully!');