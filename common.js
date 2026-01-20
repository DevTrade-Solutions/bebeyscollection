
// common.js - Shared functionality across all pages

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Elements
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');
    const searchBtn = document.getElementById('searchBtn');
    const searchModal = document.getElementById('searchModal');
    const closeSearchModal = document.getElementById('closeSearchModal');
    const cartBtn = document.getElementById('cartBtn');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCart = document.getElementById('closeCart');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const continueShoppingBtn = document.getElementById('continueShoppingBtn');

    // Mobile Menu Toggle
    if (menuToggle && mobileMenu && closeMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.classList.add('menu-open');
        });

        closeMenu.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });

        // Close menu when clicking outside
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // Search Modal Toggle
    if (searchBtn && searchModal && closeSearchModal) {
        searchBtn.addEventListener('click', function() {
            searchModal.classList.add('active');
        });

        closeSearchModal.addEventListener('click', function() {
            searchModal.classList.remove('active');
        });

        // Close search when clicking outside
        searchModal.addEventListener('click', function(e) {
            if (e.target === searchModal) {
                searchModal.classList.remove('active');
            }
        });
    }

    // Cart Sidebar Toggle
    if (cartBtn && cartSidebar && closeCart) {
        cartBtn.addEventListener('click', function() {
            cartSidebar.classList.add('active');
        });

        closeCart.addEventListener('click', function() {
            cartSidebar.classList.remove('active');
        });

        // Close cart when clicking outside
        cartSidebar.addEventListener('click', function(e) {
            if (e.target === cartSidebar) {
                cartSidebar.classList.remove('active');
            }
        });
    }

    // Checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            alert('Proceeding to checkout...');
            // In a real app, this would redirect to checkout page
        });
    }

    // Continue Shopping button
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', function() {
            cartSidebar.classList.remove('active');
        });
    }

    // Handle cart item interactions (delegation)
    document.addEventListener('click', function(e) {
        // Remove item from cart
        if (e.target.closest('.remove-item-btn')) {
            const btn = e.target.closest('.remove-item-btn');
            const id = btn.dataset.id;
            const size = btn.dataset.size;
            const color = btn.dataset.color;
            
            if (typeof CartManager !== 'undefined') {
                CartManager.removeFromCart(id, size, color);
            }
        }
        
        // Update quantity
        if (e.target.closest('.quantity-btn')) {
            const btn = e.target.closest('.quantity-btn');
            const id = btn.dataset.id;
            const size = btn.dataset.size;
            const color = btn.dataset.color;
            const isPlus = btn.classList.contains('plus');
            
            const itemElement = btn.closest('.cart-item');
            const quantityDisplay = itemElement.querySelector('.quantity-display');
            let currentQty = parseInt(quantityDisplay.textContent);
            
            if (isPlus) {
                currentQty++;
            } else {
                currentQty = Math.max(1, currentQty - 1);
            }
            
            if (typeof CartManager !== 'undefined') {
                CartManager.updateQuantity(id, currentQty, size, color);
            }
        }
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchSubmit = document.getElementById('searchSubmit');
    const searchResults = document.getElementById('searchResults');

    if (searchInput && searchSubmit && searchResults) {
        searchSubmit.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        function performSearch() {
            const query = searchInput.value.trim().toLowerCase();
            if (!query) return;

            // Clear previous results
            searchResults.innerHTML = '';

            // Import products from data.js
            import('./data.js').then(({ products }) => {
                const filteredProducts = products.filter(product =>
                    product.name.toLowerCase().includes(query) ||
                    product.description.toLowerCase().includes(query) ||
                    product.category.toLowerCase().includes(query)
                );

                if (filteredProducts.length === 0) {
                    searchResults.innerHTML = '<div class="no-results">No products found matching your search.</div>';
                    return;
                }

                const resultsGrid = document.createElement('div');
                resultsGrid.className = 'search-results-grid';

                filteredProducts.slice(0, 5).forEach(product => {
                    const resultItem = document.createElement('div');
                    resultItem.className = 'search-result-item';
                    resultItem.innerHTML = `
                        <img src="${product.image}" alt="${product.name}">
                        <div class="search-result-details">
                            <h5>${product.name}</h5>
                            <div class="search-result-category">${product.category}</div>
                            <div class="search-result-price">R${product.price.toFixed(2)}</div>
                            <div class="search-result-description">${product.description}</div>
                            <button class="btn btn-outline btn-small view-product" data-id="${product.id}">
                                View Product
                            </button>
                        </div>
                    `;
                    resultsGrid.appendChild(resultItem);
                });

                searchResults.appendChild(resultsGrid);

                // Add event listeners to view buttons
                document.querySelectorAll('.view-product').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const productId = parseInt(this.dataset.id);
                        // Close search modal
                        searchModal.classList.remove('active');
                        // Navigate to shop page or open product modal
                        // In a real app, you would implement this based on your needs
                        console.log('View product:', productId);
                    });
                });
            });
        }
    }

    // Initialize cart display
    if (typeof CartManager !== 'undefined') {
        CartManager.updateDisplay();
    }
});
