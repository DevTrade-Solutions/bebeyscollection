// UI Management Module
export const UI = (() => {
    // DOM Elements
    const elements = {
        cartIcon: null,
        cartSlider: null,
        cartSliderOverlay: null,
        closeCartSlider: null,
        cartSliderContent: null,
        cartBadge: null,
        cartSubtotal: null,
        cartTotal: null,
        productsGrid: null,
        searchBtn: null,
        searchOverlay: null,
        closeSearchBtn: null,
        searchInput: null,
        mobileMenuBtn: null,
        mobileSidebar: null,
        mobileSidebarOverlay: null,
        closeSidebar: null,
        mobileCartBtn: null,
        mobileCartBadge: null,
        mobileWishlistBadge: null
    };
    
    // Initialize UI
    function init() {
        cacheElements();
        setupAdinkraAnimations();
        setupCategoryNavbar();
    }
    
    // Cache DOM elements
    function cacheElements() {
        elements.cartIcon = document.getElementById('cartIcon');
        elements.cartSlider = document.getElementById('cartSlider');
        elements.cartSliderOverlay = document.getElementById('cartSliderOverlay');
        elements.closeCartSlider = document.getElementById('closeCartSlider');
        elements.cartSliderContent = document.getElementById('cartSliderContent');
        elements.cartBadge = document.getElementById('cartBadge');
        elements.cartSubtotal = document.getElementById('cartSubtotal');
        elements.cartTotal = document.getElementById('cartTotal');
        elements.productsGrid = document.getElementById('productsGrid');
        elements.searchBtn = document.getElementById('searchBtn');
        elements.searchOverlay = document.getElementById('searchOverlay');
        elements.closeSearchBtn = document.getElementById('closeSearchBtn');
        elements.searchInput = document.getElementById('searchInput');
        elements.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        elements.mobileSidebar = document.getElementById('mobileSidebar');
        elements.mobileSidebarOverlay = document.getElementById('mobileSidebarOverlay');
        elements.closeSidebar = document.getElementById('closeSidebar');
        elements.mobileCartBtn = document.getElementById('mobileCartBtn');
        elements.mobileCartBadge = document.getElementById('mobileCartBadge');
        elements.mobileWishlistBadge = document.getElementById('mobileWishlistBadge');
    }
    
    // Render products
    function renderProducts() {
        if (!elements.productsGrid) return;
        
        let html = '';
        
        Data.products.forEach(product => {
            const hasDiscount = product.originalPrice !== null;
            const discountPercent = hasDiscount ? 
                Math.round((1 - product.price / product.originalPrice) * 100) : 0;
            
            html += `
                <div class="product-card fade-in">
                    ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <div class="product-category">${product.category}</div>
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <div class="product-price">
                            <div>
                                ${hasDiscount ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                                <span class="price">$${product.price.toFixed(2)}</span>
                                ${hasDiscount ? `<div style="font-size: 0.9rem; color: var(--accent); font-weight: 600; margin-top: 5px;">Save ${discountPercent}%</div>` : ''}
                            </div>
                            <button class="add-to-cart-btn" data-id="${product.id}">
                                <i class="fas fa-cart-plus"></i> Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        elements.productsGrid.innerHTML = html;
    }
    
    // Show toast message
    function showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;
        
        const toastId = 'toast-' + Date.now();
        
        const toast = document.createElement('div');
        toast.id = toastId;
        toast.className = `toast-message ${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        toastContainer.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
    
    // Open cart slider
    function openCartSlider() {
        if (elements.cartSlider) elements.cartSlider.classList.add('active');
        if (elements.cartSliderOverlay) elements.cartSliderOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close cart slider
    function closeCartSlider() {
        if (elements.cartSlider) elements.cartSlider.classList.remove('active');
        if (elements.cartSliderOverlay) elements.cartSliderOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Open search overlay
    function openSearchOverlay() {
        if (elements.searchOverlay) elements.searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            if (elements.searchInput) elements.searchInput.focus();
        }, 300);
    }
    
    // Close search overlay
    function closeSearchOverlay() {
        if (elements.searchOverlay) elements.searchOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        if (elements.searchInput) elements.searchInput.value = '';
    }
    
    // Open mobile sidebar
    function openMobileSidebar() {
        if (elements.mobileSidebar) elements.mobileSidebar.classList.add('active');
        if (elements.mobileSidebarOverlay) elements.mobileSidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close mobile sidebar
    function closeMobileSidebar() {
        if (elements.mobileSidebar) elements.mobileSidebar.classList.remove('active');
        if (elements.mobileSidebarOverlay) elements.mobileSidebarOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Setup adinkra animations
    function setupAdinkraAnimations() {
        const adinkraSymbols = document.querySelectorAll('.adinkra-symbol');
        adinkraSymbols.forEach((symbol, index) => {
            symbol.style.animationDelay = `${index * 0.5}s`;
            symbol.addEventListener('mouseenter', () => {
                symbol.style.transform = 'scale(1.2) rotate(10deg)';
                symbol.style.transition = 'transform 0.3s ease';
                symbol.style.opacity = '1';
            });
            symbol.addEventListener('mouseleave', () => {
                symbol.style.transform = 'scale(1) rotate(0deg)';
                symbol.style.opacity = '0.8';
            });
        });
    }
    
    // Setup category navbar
    function setupCategoryNavbar() {
        const categoryNavbar = document.getElementById('categoryNavbar');
        const categoryItems = document.querySelectorAll('.category-item');
        
        if (window.innerWidth <= 992) {
            categoryItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    if (this.classList.contains('active')) return;
                    
                    categoryItems.forEach(item => item.classList.remove('active'));
                    this.classList.add('active');
                    
                    const category = this.querySelector('.category-text').textContent;
                    showToast(`Browsing ${category}`, 'success');
                });
            });
            
            // Adjust position on scroll
            window.addEventListener('scroll', () => {
                if (categoryNavbar && window.scrollY > 100) {
                    categoryNavbar.classList.add('scrolled');
                } else if (categoryNavbar) {
                    categoryNavbar.classList.remove('scrolled');
                }
            });
        }
    }
    
    // Adjust mobile menu position
    function adjustMobileMenuPosition() {
        const mobileLogoText = document.querySelector('.mobile-logo-text');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (window.innerWidth <= 992 && mobileLogoText && mobileMenuBtn) {
            const textWidth = mobileLogoText.scrollWidth;
            const containerWidth = mobileLogoText.parentElement.clientWidth;
            const buttonWidth = 40;
            
            if (textWidth > (containerWidth - buttonWidth - 40)) {
                const currentSize = parseInt(window.getComputedStyle(mobileLogoText).fontSize);
                mobileLogoText.style.fontSize = (currentSize - 1) + 'px';
            }
        }
    }
    
    return {
        init,
        renderProducts,
        showToast,
        openCartSlider,
        closeCartSlider,
        openSearchOverlay,
        closeSearchOverlay,
        openMobileSidebar,
        closeMobileSidebar,
        adjustMobileMenuPosition,
        elements
    };
})();