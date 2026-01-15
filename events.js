// Event Handlers Module
export const EventHandlers = (() => {
    // Initialize event handlers
    function init() {
        setupCartEventListeners();
        setupSearchEventListeners();
        setupMobileEventListeners();
        setupCollectionNavigation();
        setupNewsletterForm();
        setupWindowResizeHandler();
        setupSmoothScrolling();
        setupSearchSuggestions();
    }
    
    // Setup cart event listeners
    function setupCartEventListeners() {
        const cartIcon = document.getElementById('cartIcon');
        const closeCartSlider = document.getElementById('closeCartSlider');
        const cartSliderOverlay = document.getElementById('cartSliderOverlay');
        const continueShoppingBtn = document.getElementById('continueShoppingBtn');
        
        if (cartIcon) {
            cartIcon.addEventListener('click', () => {
                UI.openCartSlider();
            });
        }
        
        if (closeCartSlider) {
            closeCartSlider.addEventListener('click', () => {
                UI.closeCartSlider();
            });
        }
        
        if (cartSliderOverlay) {
            cartSliderOverlay.addEventListener('click', () => {
                UI.closeCartSlider();
            });
        }
        
        if (continueShoppingBtn) {
            continueShoppingBtn.addEventListener('click', () => {
                UI.closeCartSlider();
            });
        }
        
        // Add to cart buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.add-to-cart-btn')) {
                const button = e.target.closest('.add-to-cart-btn');
                const productId = parseInt(button.getAttribute('data-id'));
                CartManager.addToCart(productId);
            }
            
            // Cart quantity controls
            if (e.target.closest('.quantity-btn')) {
                const button = e.target.closest('.quantity-btn');
                const productId = parseInt(button.getAttribute('data-id'));
                const isMinus = button.classList.contains('minus');
                const cart = CartManager.getCart();
                const item = cart.find(item => item.id === productId);
                
                if (item) {
                    const newQuantity = isMinus ? item.quantity - 1 : item.quantity + 1;
                    if (newQuantity > 0) {
                        CartManager.updateQuantity(productId, newQuantity);
                    } else {
                        CartManager.removeFromCart(productId);
                    }
                }
            }
            
            // Remove item buttons
            if (e.target.closest('.remove-item-btn')) {
                const button = e.target.closest('.remove-item-btn');
                const productId = parseInt(button.getAttribute('data-id'));
                CartManager.removeFromCart(productId);
            }
        });
    }
    
    // Setup search event listeners
    function setupSearchEventListeners() {
        const searchBtn = document.getElementById('searchBtn');
        const closeSearchBtn = document.getElementById('closeSearchBtn');
        const searchInput = document.getElementById('searchInput');
        const searchSubmitBtn = document.querySelector('.search-submit-btn');
        const searchOverlay = document.getElementById('searchOverlay');
        
        if (searchBtn) {
            searchBtn.addEventListener('click', (e) => {
                e.preventDefault();
                UI.openSearchOverlay();
            });
        }
        
        if (closeSearchBtn) {
            closeSearchBtn.addEventListener('click', () => {
                UI.closeSearchOverlay();
            });
        }
        
        if (searchSubmitBtn) {
            searchSubmitBtn.addEventListener('click', () => {
                if (searchInput && searchInput.value.trim()) {
                    UI.showToast(`Searching for: ${searchInput.value}`, 'success');
                    setTimeout(() => {
                        UI.closeSearchOverlay();
                    }, 1500);
                }
            });
        }
        
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    if (searchInput.value.trim()) {
                        UI.showToast(`Searching for: ${searchInput.value}`, 'success');
                        setTimeout(() => {
                            UI.closeSearchOverlay();
                        }, 1500);
                    }
                }
            });
        }
        
        if (searchOverlay) {
            searchOverlay.addEventListener('click', (e) => {
                if (e.target === searchOverlay) {
                    UI.closeSearchOverlay();
                }
            });
        }
    }
    
    // Setup mobile event listeners
    function setupMobileEventListeners() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const closeSidebar = document.getElementById('closeSidebar');
        const mobileSidebarOverlay = document.getElementById('mobileSidebarOverlay');
        const mobileCartBtn = document.getElementById('mobileCartBtn');
        
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', UI.openMobileSidebar);
        }
        
        if (closeSidebar) {
            closeSidebar.addEventListener('click', UI.closeMobileSidebar);
        }
        
        if (mobileSidebarOverlay) {
            mobileSidebarOverlay.addEventListener('click', UI.closeMobileSidebar);
        }
        
        if (mobileCartBtn) {
            mobileCartBtn.addEventListener('click', function(e) {
                e.preventDefault();
                UI.closeMobileSidebar();
                UI.openCartSlider();
            });
        }
    }
    
    // Setup collection navigation
    function setupCollectionNavigation() {
        const prevCollectionBtn = document.getElementById('prevCollection');
        const nextCollectionBtn = document.getElementById('nextCollection');
        
        if (prevCollectionBtn && nextCollectionBtn) {
            const collectionCards = document.querySelectorAll('.collection-card-new');
            let currentCollectionIndex = 0;
            
            function updateCollectionNavigation() {
                collectionCards.forEach((card, index) => {
                    if (index === currentCollectionIndex) {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    } else {
                        card.style.opacity = '0.5';
                        card.style.transform = 'translateY(10px)';
                    }
                });
            }
            
            prevCollectionBtn.addEventListener('click', () => {
                currentCollectionIndex = (currentCollectionIndex > 0) ? 
                    currentCollectionIndex - 1 : collectionCards.length - 1;
                updateCollectionNavigation();
                UI.showToast('Previous collection', 'success');
            });
            
            nextCollectionBtn.addEventListener('click', () => {
                currentCollectionIndex = (currentCollectionIndex < collectionCards.length - 1) ? 
                    currentCollectionIndex + 1 : 0;
                updateCollectionNavigation();
                UI.showToast('Next collection', 'success');
            });
            
            // Initialize
            updateCollectionNavigation();
        }
        
        // Collection overlay buttons
        document.querySelectorAll('.collection-overlay-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const collectionTitle = this.closest('.collection-card-new').querySelector('.collection-title-new').textContent;
                UI.showToast(`Opening ${collectionTitle}`, 'success');
            });
        });
    }
    
    // Setup newsletter form
    function setupNewsletterForm() {
        const newsletterForm = document.getElementById('newsletterForm');
        
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = newsletterForm.querySelector('.newsletter-input').value;
                
                if (email && email.includes('@')) {
                    UI.showToast('Thank you for subscribing to our newsletter!', 'success');
                    newsletterForm.reset();
                }
            });
        }
    }
    
    // Setup window resize handler
    function setupWindowResizeHandler() {
        window.addEventListener('resize', () => {
            UI.adjustMobileMenuPosition();
            
            if (window.innerWidth > 992) {
                UI.closeMobileSidebar();
            }
        });
    }
    
    // Setup smooth scrolling
    function setupSmoothScrolling() {
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
    }
    
    // Setup search suggestions
    function setupSearchSuggestions() {
        document.querySelectorAll('.suggestion-tag').forEach(tag => {
            tag.addEventListener('click', () => {
                const searchInput = document.getElementById('searchInput');
                if (searchInput) {
                    searchInput.value = tag.textContent;
                    UI.showToast(`Searching for: ${tag.textContent}`, 'success');
                    setTimeout(() => {
                        UI.closeSearchOverlay();
                    }, 1500);
                }
            });
        });
    }
    
    return {
        init
    };
})();