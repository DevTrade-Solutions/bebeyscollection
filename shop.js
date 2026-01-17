import { products, categories, cart, user } from './data.js';

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

// Current cart
let currentCart = [];

// DOM Elements
let elements = {};

// Initialize Shop Page
function initShopPage() {
    console.log('Initializing shop page...');
    
    // Initialize DOM elements
    initializeElements();
    
    // Load cart from localStorage
    loadCartFromStorage();
    
    // Set up categories
    setupCategories();
    
    // Render initial products
    renderProducts();
    
    // Setup event listeners
    setupEventListeners();
    
    // Update cart display
    updateCartDisplay();
    
    // Load suggested items
    loadSuggestedItems();
    
    console.log('Shop page initialized with', products.length, 'products');
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
        modalAddToCart: document.getElementById('modalAddToCart'),
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
            elements.productsContainer.className = 'products-grid';
            renderProducts();
        });
    }
    
    if (elements.viewList) {
        elements.viewList.addEventListener('click', () => {
            shopState.currentView = 'list';
            elements.viewList.classList.add('active');
            elements.viewGrid.classList.remove('active');
            elements.productsContainer.className = 'products-list';
            renderProducts();
        });
    }
    
    // Sort select
    if (elements.sortSelect) {
        elements.sortSelect.addEventListener('change', function() {
            shopState.currentSort = this.value;
            shopState.currentPage = 1;
            renderProducts();
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
                renderProducts();
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
                renderProducts();
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
                renderProducts();
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
                renderProducts();
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
            renderProducts();
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
            renderProducts();
        });
    }
    
    // Pagination
    if (elements.prevPage) {
        elements.prevPage.addEventListener('click', function() {
            if (shopState.currentPage > 1) {
                shopState.currentPage--;
                renderProducts();
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
                renderProducts();
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
    
    // Product click events
    if (elements.productsContainer) {
        elements.productsContainer.addEventListener('click', function(e) {
            const addToCartBtn = e.target.closest('.add-to-cart');
            const viewDetailsBtn = e.target.closest('.view-details');
            
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
        // Search suggestions as you type
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
    
    if (elements.modalAddToCart) {
        elements.modalAddToCart.addEventListener('click', function() {
            if (currentProduct) {
                addToCart(currentProduct.id);
                closeProductModal();
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
        // If "All Products" is checked, uncheck others
        if (checkbox.checked) {
            document.querySelectorAll('#availabilityList input[type="checkbox"]').forEach(cb => {
                if (cb !== checkbox) cb.checked = false;
            });
            shopState.activeFilters.availability = ['all'];
        }
    } else {
        // If other filter is checked, uncheck "All Products"
        if (checkbox.checked) {
            if (allCheckbox) allCheckbox.checked = false;
            shopState.activeFilters.availability = shopState.activeFilters.availability.filter(f => f !== 'all');
            if (!shopState.activeFilters.availability.includes(filter)) {
                shopState.activeFilters.availability.push(filter);
            }
        } else {
            shopState.activeFilters.availability = shopState.activeFilters.availability.filter(f => f !== filter);
            // If no availability filters are selected, select "all"
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
    
    // Filter by category
    if (shopState.currentCategory !== 'all') {
        const categoryName = shopState.currentCategory.replace('-', ' ');
        filteredProducts = filteredProducts.filter(product => 
            product.category.toLowerCase() === categoryName.toLowerCase()
        );
    }
    
    // Filter by availability
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
    
    // Filter by tags
    if (shopState.activeFilters.tags.length > 0) {
        filteredProducts = filteredProducts.filter(product => {
            return shopState.activeFilters.tags.some(tag => 
                product.tags && product.tags.includes(tag)
            );
        });
    }
    
    // Filter by sizes
    if (shopState.activeFilters.sizes.length > 0) {
        filteredProducts = filteredProducts.filter(product => {
            return shopState.activeFilters.sizes.some(size => 
                product.sizes && product.sizes.includes(size)
            );
        });
    }
    
    // Filter by price range
    filteredProducts = filteredProducts.filter(product => 
        product.price >= shopState.activeFilters.priceRange.min &&
        product.price <= shopState.activeFilters.priceRange.max
    );
    
    // Sort products
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
            // Assuming newer products have higher IDs
            sortedProducts.sort((a, b) => b.id - a.id);
            break;
        case 'bestselling':
            // Sort by tags containing 'bestseller' first
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
            // Default sort: featured first, then by price high to low
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

// Render Products
function renderProducts() {
    const filteredProducts = getFilteredProducts();
    const totalProducts = filteredProducts.length;
    
    // Update products count
    if (elements.productsCount) {
        const start = (shopState.currentPage - 1) * shopState.productsPerPage + 1;
        const end = Math.min(shopState.currentPage * shopState.productsPerPage, totalProducts);
        elements.productsCount.textContent = `Showing ${start}-${end} of ${totalProducts} products`;
    }
    
    // Calculate pagination
    const startIndex = (shopState.currentPage - 1) * shopState.productsPerPage;
    const endIndex = startIndex + shopState.productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);
    
    // Clear container
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
            
            // Add event listener to reset button
            document.getElementById('resetAllFilters')?.addEventListener('click', function() {
                resetFilters();
                renderProducts();
            });
            
            updatePagination(totalProducts);
            return;
        }
        
        // Render products
        productsToShow.forEach((product) => {
            const productCard = createProductCard(product);
            elements.productsContainer.appendChild(productCard);
        });
    }
    
    // Update pagination
    updatePagination(totalProducts);
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'shop-card fade-in';
    card.dataset.id = product.id;
    
    // Calculate discount if applicable
    const hasDiscount = product.originalPrice !== null && product.originalPrice > product.price;
    const discountPercent = hasDiscount ? 
        Math.round((1 - product.price / product.originalPrice) * 100) : 0;
    
    // Format prices
    const formatPrice = (price) => `R${price.toFixed(2)}`;
    
    // Determine availability text
    let availabilityText = '';
    let availabilityClass = '';
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
    
    if (shopState.currentView === 'grid') {
        card.innerHTML = `
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            
            <div class="shop-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x400?text=Product+Image'">
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
    } else {
        // List view
        card.innerHTML = `
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            
            <div class="shop-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x400?text=Product+Image'">
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
    }
    
    return card;
}

// Update Pagination
function updatePagination(totalProducts) {
    const totalPages = Math.ceil(totalProducts / shopState.productsPerPage);
    
    // Update previous/next buttons
    if (elements.prevPage) {
        elements.prevPage.disabled = shopState.currentPage === 1;
    }
    
    if (elements.nextPage) {
        elements.nextPage.disabled = shopState.currentPage === totalPages;
    }
    
    // Update page numbers
    if (elements.paginationNumbers) {
        let html = '';
        const maxVisiblePages = 5;
        let startPage = Math.max(1, shopState.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        // Adjust start page if we're near the end
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        // Add first page if not in range
        if (startPage > 1) {
            html += `<div class="page-number" data-page="1">1</div>`;
            if (startPage > 2) {
                html += `<span style="padding: 0.5rem;">...</span>`;
            }
        }
        
        // Add page numbers
        for (let i = startPage; i <= endPage; i++) {
            const activeClass = i === shopState.currentPage ? 'active' : '';
            html += `<div class="page-number ${activeClass}" data-page="${i}">${i}</div>`;
        }
        
        // Add last page if not in range
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                html += `<span style="padding: 0.5rem;">...</span>`;
            }
            html += `<div class="page-number" data-page="${totalPages}">${totalPages}</div>`;
        }
        
        elements.paginationNumbers.innerHTML = html;
        
        // Add event listeners to page numbers
        elements.paginationNumbers.querySelectorAll('.page-number').forEach(page => {
            page.addEventListener('click', function() {
                const pageNum = parseInt(this.dataset.page);
                if (pageNum !== shopState.currentPage) {
                    shopState.currentPage = pageNum;
                    renderProducts();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        });
    }
}

// Load Suggested Items
function loadSuggestedItems() {
    if (!elements.suggestedItems) return;
    
    // Get random products for suggestions
    const suggestedProducts = [...products]
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
    
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
    
    // Add event listeners to suggested items
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
    
    // Update UI
    updateCategorySelection();
    
    // Reset checkboxes
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
    
    // Reset price inputs
    if (elements.minPrice) elements.minPrice.value = 0;
    if (elements.maxPrice) elements.maxPrice.value = 10000;
    if (elements.priceSlider) elements.priceSlider.value = 10000;
    
    // Reset sort
    if (elements.sortSelect) elements.sortSelect.value = 'default';
    
    // Close mobile sidebar
    if (elements.shopSidebar) {
        elements.shopSidebar.classList.remove('active');
    }
}

// Cart Functions
let currentProduct = null;

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Check if product is already in cart
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
    // Minimal notification
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
    
    // Add event listeners to cart buttons
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

// Product Modal
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    currentProduct = product;
    
    // Calculate discount if applicable
    const hasDiscount = product.originalPrice !== null && product.originalPrice > product.price;
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
            
            // Activate first size by default
            if (elements.modalSizes.firstChild) {
                elements.modalSizes.firstChild.classList.add('active');
            }
        } else {
            elements.modalSizes.innerHTML = '<p>One Size</p>';
        }
    }
    
    // Update colors
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
            
            // Activate first color by default
            if (elements.modalColors.firstChild) {
                elements.modalColors.firstChild.classList.add('active');
            }
        } else {
            elements.modalColors.innerHTML = '<p>Available in all colors</p>';
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

// Show search suggestions as you type
function showSearchSuggestions(searchTerm) {
    if (!elements.searchSuggestions || !searchTerm.trim()) {
        elements.searchSuggestions.innerHTML = '';
        elements.searchSuggestions.classList.remove('active');
        return;
    }
    
    const term = searchTerm.toLowerCase();
    const suggestions = [];
    
    // Search in products
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
    
    // Search in categories
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
    
    // Display suggestions
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
        
        // Add event listeners to suggestions
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
    
    // Search in products
    const productResults = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
    );
    
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
    
    // Add event listeners to view product buttons
    document.querySelectorAll('.view-product').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            closeSearchModal();
            openProductModal(productId);
        });
    });
}

// Toast Notification with shorter duration
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