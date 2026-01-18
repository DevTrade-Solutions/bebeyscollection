// Lookbook JavaScript Module

// Lookbook Data
const lookbookData = {
    1: {
        title: "Ankara Maxi Dress",
        description: "Flowing maxi dress with vibrant Ankara print and traditional embroidery. Perfect for summer celebrations and special occasions. Made from premium cotton with hand-embroidered details.",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
        tags: ["Vibrant", "Ankara", "Evening", "Embroidered", "Summer"],
        shopUrl: "shop.html?product=1"
    },
    2: {
        title: "Modern Ankara Set",
        description: "Contemporary crop top and skirt set with geometric prints. Features puff sleeves and a wrap-around skirt design. Perfect for casual outings or daytime events.",
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
        tags: ["Modern", "Casual", "Printed", "Geometric", "Daytime"],
        shopUrl: "shop.html?product=10"
    },
    3: {
        title: "Beaded Statement Set",
        description: "Handcrafted necklace and earrings with traditional beadwork. Made by artisans using traditional techniques passed down through generations.",
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
        tags: ["Jewelry", "Beaded", "Statement", "Artisan", "Traditional"],
        shopUrl: "shop.html?product=6"
    },
    4: {
        title: "Embroidered Kaftan",
        description: "Elegant kaftan with gold thread embroidery and flowing sleeves. Made from lightweight silk for maximum comfort and elegance.",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
        tags: ["Elegant", "Embroidered", "Evening", "Silk", "Gold"],
        shopUrl: "shop.html?product=9"
    },
    5: {
        title: "Printed Wrap Set",
        description: "Modern wrap top and wide-leg trousers in authentic wax print. Features adjustable wrap closure and elastic waist for comfort.",
        image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
        tags: ["Modern", "Wrap", "Printed", "Wax Print", "Comfort"],
        shopUrl: "shop.html?product=19"
    },
    6: {
        title: "Beaded Evening Gown",
        description: "Luxury evening gown with intricate beadwork and silk fabric. Hand-beaded by artisans over 100 hours of meticulous work.",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
        tags: ["Luxury", "Gown", "Beaded", "Evening", "Silk"],
        shopUrl: "shop.html?product=7"
    },
    7: {
        title: "Mudcloth Jacket",
        description: "Contemporary jacket made from authentic Malian mudcloth. Each mudcloth pattern tells a traditional story or proverb.",
        image: "https://images.unsplash.com/photo-1567401893416-8f1f9e5b46ab?auto=format&fit=crop&w=800&q=80",
        tags: ["Mudcloth", "Jacket", "Warm", "Traditional", "Story"],
        shopUrl: "shop.html?product=5"
    },
    8: {
        title: "Tailored Mudcloth Blazer",
        description: "Sophisticated blazer in premium mudcloth with structured fit. Perfect for professional settings or elegant evenings.",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
        tags: ["Blazer", "Tailored", "Mudcloth", "Professional", "Structured"],
        shopUrl: "shop.html?product=13"
    },
    9: {
        title: "Winter Wrap Dress",
        description: "Silk wrap dress with traditional embroidery for cooler weather. Features long sleeves and a modest neckline.",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
        tags: ["Wrap", "Dress", "Winter", "Silk", "Embroidered"],
        shopUrl: "shop.html?product=15"
    },
    10: {
        title: "Maxi Kimono",
        description: "Lightweight kimono with bold African prints for beach cover-ups or resort wear. Features tassel details and flowing silhouette.",
        image: "https://images.unsplash.com/photo-1542280756-1e9d9774cac6?auto=format&fit=crop&w=800&q=80",
        tags: ["Kimono", "Flowing", "Beach", "Resort", "Tassels"],
        shopUrl: "shop.html?product=17"
    },
    11: {
        title: "Lounge Set",
        description: "Comfortable two-piece set in soft Ankara cotton for resort wear or casual lounging. Features relaxed fit and breathable fabric.",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80",
        tags: ["Lounge", "Set", "Comfort", "Casual", "Cotton"],
        shopUrl: "shop.html?product=16"
    }
};

// Initialize Lookbook
function initLookbook() {
    console.log('Initializing Lookbook...');
    
    // Setup mobile menu
    setupMobileMenu();
    
    // Setup filtering
    setupFiltering();
    
    // Setup lookbook overlay
    setupLookbookOverlay();
    
    // Setup search functionality
    setupSearch();
    
    // Setup floating CTA
    setupFloatingCTA();
    
    // Setup scroll animations
    setupScrollAnimations();
    
    // Setup collection buttons
    setupCollectionButtons();
    
    console.log('Lookbook initialized successfully!');
}

// Setup Mobile Menu
function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    if (closeMenu) {
        closeMenu.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#search') {
                e.preventDefault();
                closeMobileMenu();
                openSearchModal();
            } else {
                closeMobileMenu();
            }
        });
    });
    
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Setup Filtering
function setupFiltering() {
    const seasonBtns = document.querySelectorAll('.season-btn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const masonryItems = document.querySelectorAll('.masonry-item');
    const collections = document.querySelectorAll('.lookbook-collection');
    
    // Season filtering
    seasonBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            seasonBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const season = this.dataset.season;
            
            // Filter items with animation
            filterItems(season, 'season');
            
            // Show/hide collections
            collections.forEach(collection => {
                if (season === 'all' || collection.id.includes(season)) {
                    collection.style.display = 'block';
                    setTimeout(() => {
                        collection.classList.add('visible');
                    }, 50);
                } else {
                    collection.style.display = 'none';
                    collection.classList.remove('visible');
                }
            });
        });
    });
    
    // Category filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.filter;
            
            // Filter items
            filterItems(category, 'category');
        });
    });
    
    function filterItems(filterValue, filterType) {
        masonryItems.forEach(item => {
            const shouldShow = filterValue === 'all' || item.dataset[filterType] === filterValue;
            
            if (shouldShow) {
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
    }
}

// Setup Lookbook Overlay
function setupLookbookOverlay() {
    const viewLookBtns = document.querySelectorAll('.view-look');
    const lookbookOverlay = document.getElementById('lookbookOverlay');
    const closeOverlay = document.getElementById('closeOverlay');
    const overlayImage = document.getElementById('overlayImage');
    const overlayTitle = document.getElementById('overlayTitle');
    const overlayDescription = document.getElementById('overlayDescription');
    const overlayTags = document.getElementById('overlayTags');
    const overlayShopBtn = document.getElementById('overlayShopBtn');
    const overlayStylingBtn = document.getElementById('overlayStylingBtn');
    
    // View look buttons
    viewLookBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const lookId = this.dataset.look;
            openLookbookOverlay(lookId);
        });
    });
    
    // Shop look buttons
    document.querySelectorAll('.shop-look').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.dataset.product;
            window.location.href = `shop.html?product=${productId}`;
        });
    });
    
    function openLookbookOverlay(lookId) {
        const lookData = lookbookData[lookId];
        
        if (lookData) {
            overlayImage.src = lookData.image;
            overlayTitle.textContent = lookData.title;
            overlayDescription.textContent = lookData.description;
            
            // Set shop button URL
            overlayShopBtn.onclick = () => {
                window.location.href = lookData.shopUrl;
            };
            
            // Set styling button URL
            overlayStylingBtn.onclick = () => {
                window.location.href = 'index.html#appointment';
            };
            
            // Clear and add tags
            overlayTags.innerHTML = '';
            lookData.tags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'overlay-tag';
                tagElement.textContent = tag;
                overlayTags.appendChild(tagElement);
            });
            
            // Show overlay
            lookbookOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Close overlay
    if (closeOverlay) {
        closeOverlay.addEventListener('click', function() {
            closeLookbookOverlay();
        });
    }
    
    // Close overlay when clicking outside
    lookbookOverlay.addEventListener('click', function(e) {
        if (e.target === this) {
            closeLookbookOverlay();
        }
    });
    
    // Close overlay with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lookbookOverlay.classList.contains('active')) {
            closeLookbookOverlay();
        }
    });
    
    function closeLookbookOverlay() {
        lookbookOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Setup Search
function setupSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const searchModal = document.getElementById('searchModal');
    const closeSearchModal = document.getElementById('closeSearchModal');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    
    // Open search modal
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openSearchModal();
        });
    }
    
    // Mobile search link
    document.querySelector('.mobile-nav-links a[href="#search"]')?.addEventListener('click', function(e) {
        e.preventDefault();
        closeMobileMenu();
        openSearchModal();
    });
    
    function openSearchModal() {
        searchModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        searchInput.focus();
    }
    
    // Close search modal
    if (closeSearchModal) {
        closeSearchModal.addEventListener('click', function() {
            closeSearchModalFunc();
        });
    }
    
    // Close modal when clicking outside
    searchModal.addEventListener('click', function(e) {
        if (e.target === searchModal) {
            closeSearchModalFunc();
        }
    });
    
    function closeSearchModalFunc() {
        searchModal.classList.remove('active');
        document.body.style.overflow = '';
        searchInput.value = '';
        searchResults.innerHTML = '';
    }
    
    // Search functionality
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm === '') {
            searchResults.innerHTML = '<p class="no-results">Please enter a search term.</p>';
            return;
        }
        
        let results = [];
        
        // Search in lookbook items
        const masonryItems = document.querySelectorAll('.masonry-item');
        masonryItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            const tags = item.dataset.tags.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm) || tags.includes(searchTerm)) {
                const lookId = item.querySelector('.view-look').dataset.look;
                const lookData = lookbookData[lookId];
                if (lookData) {
                    results.push({...lookData, id: lookId});
                }
            }
        });
        
        // Display results
        if (results.length === 0) {
            searchResults.innerHTML = '<p class="no-results">No looks found for "' + searchTerm + '".</p>';
        } else {
            let html = '<h4>Search Results:</h4>';
            html += '<div class="search-results-grid">';
            results.forEach(look => {
                html += `
                    <div class="search-result-item">
                        <img src="${look.image}" alt="${look.title}" loading="lazy">
                        <div class="search-result-details">
                            <h5>${look.title}</h5>
                            <p class="search-result-description">${look.description.substring(0, 100)}...</p>
                            <button class="btn btn-small view-search-look" data-lookid="${look.id}">
                                View Look
                            </button>
                        </div>
                    </div>
                `;
            });
            html += '</div>';
            searchResults.innerHTML = html;
            
            // Add event listeners to view buttons in search results
            document.querySelectorAll('.view-search-look').forEach(btn => {
                btn.addEventListener('click', function() {
                    const lookId = this.dataset.lookid;
                    
                    // Close search modal
                    closeSearchModalFunc();
                    
                    // Open lookbook overlay
                    setTimeout(() => {
                        openLookbookOverlay(lookId);
                    }, 300);
                });
            });
        }
    }
    
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

// Setup Floating CTA
function setupFloatingCTA() {
    const floatingCTA = document.getElementById('floatingCTA');
    if (floatingCTA) {
        floatingCTA.addEventListener('click', function() {
            showToast('Share your Bebeys Collection look on Instagram and tag us @bebeyscollection for a chance to be featured!', 'success');
        });
    }
}

// Setup Scroll Animations
function setupScrollAnimations() {
    function checkVisibility() {
        const fadeElements = document.querySelectorAll('.fade-in, .zoom-in');
        const windowHeight = window.innerHeight;
        
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    // Initial check
    checkVisibility();
    
    // Check on scroll
    window.addEventListener('scroll', checkVisibility);
    
    // Check on resize
    window.addEventListener('resize', checkVisibility);
}

// Setup Collection Buttons
function setupCollectionButtons() {
    document.querySelectorAll('.explore-collection').forEach(btn => {
        btn.addEventListener('click', function() {
            const collection = this.dataset.collection;
            window.location.href = `shop.html?collection=${collection}`;
        });
    });
}

// Toast Notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    toast.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
    toast.className = 'toast';
    toast.classList.add(type);
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#search') {
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
            }
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing lookbook...');
    initLookbook();
    setupSmoothScrolling();
    
    // Cart functionality placeholder
    const cartBtn = document.getElementById('cartBtn');
    const mobileCartBtn = document.getElementById('mobileCartBtn');
    
    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            showToast('Cart functionality will be implemented in the final version.', 'success');
        });
    }
    
    if (mobileCartBtn) {
        mobileCartBtn.addEventListener('click', function() {
            showToast('Cart functionality will be implemented in the final version.', 'success');
        });
    }
});

// Export for debugging
window.Lookbook = {
    initLookbook,
    openLookbookOverlay,
    showToast
};