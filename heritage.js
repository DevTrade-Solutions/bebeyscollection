// heritage.js - Heritage Page JavaScript

import { CartManager } from './cart.js';
import { products } from './data.js';

// DOM Elements
const elements = {
    // Navigation
    menuToggle: document.getElementById('menuToggle'),
    mobileMenu: document.getElementById('mobileMenu'),
    closeMenu: document.getElementById('closeMenu'),
    mobileCartBtn: document.getElementById('mobileCartBtn'),
    
    // Search Modal
    searchBtn: document.getElementById('searchBtn'),
    searchModal: document.getElementById('searchModal'),
    closeSearchModal: document.getElementById('closeSearchModal'),
    searchInput: document.getElementById('searchInput'),
    searchButton: document.getElementById('searchButton'),
    searchResults: document.getElementById('searchResults'),
    
    // Cart
    cartBtn: document.getElementById('cartBtn'),
    
    // Heritage Navigation
    heritageNavBtns: document.querySelectorAll('.heritage-nav-btn'),
    heritageSections: document.querySelectorAll('.heritage-section'),
    
    // Fabric Details
    fabricDetailsBtns: document.querySelectorAll('.fabric-details-btn'),
    fabricOverlay: document.getElementById('fabricOverlay'),
    closeFabricOverlay: document.getElementById('closeFabricOverlay'),
    
    // Region Map
    regionDots: document.querySelectorAll('.region-dot'),
    regionDetails: document.querySelectorAll('.region-details'),
    
    // Toast
    toast: document.getElementById('toast')
};

// Fabric Data
const fabricDetails = {
    ankara: {
        title: "Ankara (African Wax Print)",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80",
        caption: "Vibrant wax print fabric with geometric patterns",
        meta: "West Africa • 19th Century • Medium Complexity",
        description: "Originally inspired by Indonesian batik techniques brought to Africa by Dutch traders, Ankara fabric has evolved into a powerful symbol of African identity. The wax-resist dyeing process creates vibrant, colorful patterns that are deeply embedded in African culture.",
        history: "The history of Ankara dates back to the 19th century when Dutch traders introduced batik techniques to West Africa. African artisans adapted these techniques, incorporating local symbols, colors, and patterns. Today, Ankara is worn across the continent for everyday wear and special occasions alike.",
        technique: "Ankara is created using a wax-resist dyeing technique. Hot wax is applied to cotton fabric in specific patterns, then the fabric is dyed. The wax resists the dye, creating the distinctive patterns. This process can be repeated multiple times with different colors to create complex designs."
    },
    kente: {
        title: "Kente Cloth",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
        caption: "Handwoven silk cloth with symbolic patterns",
        meta: "Ghana • 17th Century • High Complexity",
        description: "Kente cloth, known locally as 'nwentoma', is a type of silk and cotton fabric made of interwoven cloth strips native to the Akan ethnic group of Ghana. Each pattern and color combination has specific meanings and is traditionally associated with royalty.",
        history: "Kente originated in the 17th century among the Ashanti people of Ghana. According to legend, two friends learned the art of weaving from a spider. Originally made from raffia fibers, it evolved to use silk imported from Europe via North African trade routes.",
        technique: "Kente is woven on traditional looms by master weavers. The process involves weaving narrow strips (about 4 inches wide) that are then sewn together to create larger pieces. Each strip can take several days to weave, and a full Kente cloth can take weeks or even months to complete."
    },
    mudcloth: {
        title: "Bògòlanfini (Mudcloth)",
        image: "https://images.unsplash.com/photo-1567401893416-8f1f9e5b46ab?auto=format&fit=crop&w=800&q=80",
        caption: "Traditional Malian fabric dyed with fermented mud",
        meta: "Mali • 12th Century • High Complexity",
        description: "Bògòlanfini, commonly known as mudcloth, is a handmade cotton fabric traditionally dyed with fermented mud. It originates from the Bambara people of Mali and is considered a form of writing, with each pattern conveying specific meanings.",
        history: "Mudcloth has been made in Mali for over 800 years. Originally worn by hunters for camouflage and ritual protection, it later became a symbol of cultural identity. Each pattern tells a story or represents specific cultural values and historical events.",
        technique: "The process begins with weaving narrow strips of cotton that are sewn together. The fabric is then dyed with leaves to create a yellow background. Artists paint designs using fermented mud that has been aged for up to a year. After drying in the sun, the mud is washed off, leaving the distinctive dark patterns."
    },
    adinkra: {
        title: "Adinkra Cloth",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
        caption: "Stamped cotton cloth with symbolic Adinkra symbols",
        meta: "Ghana • 19th Century • Medium Complexity",
        description: "Adinkra cloth is a traditional mourning fabric from Ghana, characterized by stamped symbols that convey proverbs, philosophical concepts, and historical events. Each symbol has a specific name and meaning.",
        history: "Adinkra originated among the Akan people of Ghana and Ivory Coast. The word 'Adinkra' means 'farewell' or 'goodbye', reflecting its original use as funeral attire. The symbols are believed to have spiritual significance and are used to communicate values and wisdom.",
        technique: "Adinkra symbols are created using carved calabash stamps dipped in a dye made from the bark of the Badie tree. The stamps are pressed onto cotton fabric in a grid pattern. The process requires precision and skill, as each symbol must be clearly defined and properly spaced."
    }
};

// Initialize App
function init() {
    // Initialize cart manager
    CartManager.init();
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup animations
    setupAnimations();
    
    // Set active section based on URL hash
    setActiveSectionFromHash();
    
    console.log('Heritage page initialized');
}

// Setup Event Listeners
function setupEventListeners() {
    // Mobile menu toggle
    if (elements.menuToggle) {
        elements.menuToggle.addEventListener('click', toggleMobileMenu);
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
    
    // Search Modal
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
        elements.searchButton.addEventListener('click', performHeritageSearch);
    }
    
    if (elements.searchInput) {
        elements.searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                performHeritageSearch();
            }
        });
    }
    
    // Heritage Navigation
    elements.heritageNavBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const sectionId = this.dataset.section + '-section';
            showHeritageSection(sectionId);
            
            // Update URL hash without scrolling
            history.replaceState(null, null, `#${this.dataset.section}`);
            
            // Update active button
            elements.heritageNavBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Fabric Details Overlay
    elements.fabricDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const fabricId = this.dataset.fabric;
            openFabricOverlay(fabricId);
        });
    });
    
    if (elements.closeFabricOverlay) {
        elements.closeFabricOverlay.addEventListener('click', closeFabricOverlay);
    }
    
    if (elements.fabricOverlay) {
        elements.fabricOverlay.addEventListener('click', function(e) {
            if (e.target === elements.fabricOverlay) {
                closeFabricOverlay();
            }
        });
    }
    
    // Region Map Interaction
    elements.regionDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const regionId = this.dataset.region;
            showRegionDetails(regionId);
        });
        
        dot.addEventListener('mouseenter', function() {
            const regionId = this.dataset.region;
            highlightRegion(regionId);
        });
        
        dot.addEventListener('mouseleave', function() {
            resetRegionHighlights();
        });
    });
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#search') {
                e.preventDefault();
                closeMobileMenu();
                openSearchModal();
            } else if (this.getAttribute('href').startsWith('#')) {
                closeMobileMenu();
            }
        });
    });
    
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
    
    // Overlay action buttons
    const overlayShopBtn = document.getElementById('overlayShopBtn');
    const overlayWorkshopBtn = document.getElementById('overlayWorkshopBtn');
    
    if (overlayShopBtn) {
        overlayShopBtn.addEventListener('click', function() {
            showToast('Redirecting to shop page...', 'success');
            setTimeout(() => {
                window.location.href = 'shop.html';
            }, 1000);
        });
    }
    
    if (overlayWorkshopBtn) {
        overlayWorkshopBtn.addEventListener('click', function() {
            showToast('Heritage workshop details will be available soon', 'success');
        });
    }
}

// Setup Animations
function setupAnimations() {
    // Fade-in animations on scroll
    const fadeElements = document.querySelectorAll('.fade-in, .zoom-in');
    
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
    
    // Trigger initial animations
    setTimeout(fadeInOnScroll, 100);
}

// Heritage Section Navigation
function showHeritageSection(sectionId) {
    // Hide all sections
    elements.heritageSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Scroll to section with offset for header
        const headerHeight = document.querySelector('.header').offsetHeight;
        const sectionTop = targetSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

function setActiveSectionFromHash() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        const sectionId = `${hash}-section`;
        const targetBtn = document.querySelector(`.heritage-nav-btn[data-section="${hash}"]`);
        const targetSection = document.getElementById(sectionId);
        
        if (targetBtn && targetSection) {
            elements.heritageNavBtns.forEach(btn => btn.classList.remove('active'));
            targetBtn.classList.add('active');
            
            elements.heritageSections.forEach(section => section.classList.remove('active'));
            targetSection.classList.add('active');
        }
    }
}

// Fabric Details Overlay
function openFabricOverlay(fabricId) {
    const fabric = fabricDetails[fabricId];
    if (!fabric) return;
    
    // Update overlay content
    document.getElementById('overlayFabricImage').src = fabric.image;
    document.getElementById('overlayFabricImage').alt = fabric.title;
    document.getElementById('overlayImageCaption').textContent = fabric.caption;
    document.getElementById('overlayFabricTitle').textContent = fabric.title;
    document.getElementById('overlayFabricMeta').textContent = fabric.meta;
    document.getElementById('overlayFabricDescription').textContent = fabric.description;
    document.getElementById('overlayFabricHistory').textContent = fabric.history;
    document.getElementById('overlayFabricTechnique').textContent = fabric.technique;
    
    // Show overlay
    elements.fabricOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeFabricOverlay() {
    elements.fabricOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Region Map Functions
function showRegionDetails(regionId) {
    // Hide all region details
    elements.regionDetails.forEach(detail => {
        detail.classList.remove('active');
    });
    
    // Show selected region details
    const targetDetail = document.querySelector(`.region-details[data-region="${regionId}"]`);
    if (targetDetail) {
        targetDetail.classList.add('active');
    }
}

function highlightRegion(regionId) {
    // Add visual feedback for hovered region
    const regionDot = document.querySelector(`.region-dot[data-region="${regionId}"]`);
    const regionLabel = document.querySelector(`.map-region[data-region="${regionId}"] .region-label`);
    
    if (regionDot) {
        regionDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        regionDot.style.boxShadow = '0 0 0 12px rgba(198, 167, 94, 0.5)';
    }
    
    if (regionLabel) {
        regionLabel.style.opacity = '1';
    }
}

function resetRegionHighlights() {
    // Reset all region visual feedback
    elements.regionDots.forEach(dot => {
        dot.style.transform = 'translate(-50%, -50%)';
        dot.style.boxShadow = '0 0 0 8px rgba(198, 167, 94, 0.3)';
    });
    
    document.querySelectorAll('.region-label').forEach(label => {
        label.style.opacity = '0';
    });
}

// Search Functionality
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

function performHeritageSearch() {
    const searchTerm = elements.searchInput.value.trim().toLowerCase();
    if (searchTerm === '') {
        elements.searchResults.innerHTML = '<p class="no-results">Please enter a search term.</p>';
        return;
    }
    
    // Search in fabric details
    const fabricResults = Object.entries(fabricDetails).filter(([id, fabric]) =>
        fabric.title.toLowerCase().includes(searchTerm) ||
        fabric.description.toLowerCase().includes(searchTerm) ||
        fabric.history.toLowerCase().includes(searchTerm) ||
        fabric.technique.toLowerCase().includes(searchTerm)
    );
    
    // Search in heritage content
    const heritageContent = document.querySelectorAll('.heritage-section');
    const contentResults = [];
    
    heritageContent.forEach(section => {
        const text = section.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            const title = section.querySelector('.section-title')?.textContent || 'Heritage Section';
            contentResults.push({ title, section: section.id });
        }
    });
    
    let html = '';
    
    if (fabricResults.length === 0 && contentResults.length === 0) {
        html = '<p class="no-results">No results found for "' + searchTerm + '".</p>';
    } else {
        if (fabricResults.length > 0) {
            html += '<h4>Traditional Fabrics:</h4>';
            html += '<div class="search-results-grid">';
            fabricResults.forEach(([id, fabric]) => {
                html += `
                    <div class="search-result-item" data-id="${id}">
                        <img src="${fabric.image}" alt="${fabric.title}">
                        <div class="search-result-details">
                            <h5>${fabric.title}</h5>
                            <p class="search-result-description">${fabric.description.substring(0, 150)}...</p>
                            <button class="btn btn-small view-fabric" data-fabric="${id}">View Details</button>
                        </div>
                    </div>
                `;
            });
            html += '</div>';
        }
        
        if (contentResults.length > 0) {
            html += '<h4>Heritage Content:</h4>';
            html += '<div class="search-results-grid">';
            contentResults.forEach(result => {
                html += `
                    <div class="search-result-item content">
                        <div class="search-result-details">
                            <h5>${result.title}</h5>
                            <button class="btn btn-small view-section" data-section="${result.section}">Go to Section</button>
                        </div>
                    </div>
                `;
            });
            html += '</div>';
        }
    }
    
    elements.searchResults.innerHTML = html;
    
    // Add event listeners to result buttons
    document.querySelectorAll('.view-fabric').forEach(button => {
        button.addEventListener('click', function() {
            const fabricId = this.dataset.fabric;
            closeSearchModal();
            openFabricOverlay(fabricId);
        });
    });
    
    document.querySelectorAll('.view-section').forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.dataset.section;
            closeSearchModal();
            
            // Extract section name from id (remove '-section' suffix)
            const sectionName = sectionId.replace('-section', '');
            const targetBtn = document.querySelector(`.heritage-nav-btn[data-section="${sectionName}"]`);
            
            if (targetBtn) {
                targetBtn.click();
            }
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

// Cart Functions
function openCart() {
    // Use CartManager to open cart sidebar
    // This would need to be implemented based on your existing cart system
    showToast('Cart functionality loaded', 'success');
}

// Toast Notification
function showToast(message, type = 'success') {
    if (!elements.toast) return;
    
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    elements.toast.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
    elements.toast.className = 'toast';
    elements.toast.classList.add(type);
    elements.toast.classList.add('show');
    
    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 3000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Heritage DOM loaded, initializing...');
    init();
    
    // Handle hash changes
    window.addEventListener('hashchange', setActiveSectionFromHash);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        // Close mobile menu on larger screens
        if (window.innerWidth > 992) {
            closeMobileMenu();
        }
    });
});

// Export for console debugging
window.HeritagePage = {
    init,
    showHeritageSection,
    openFabricOverlay,
    closeFabricOverlay,
    showRegionDetails,
    openSearchModal,
    closeSearchModal,
    performHeritageSearch,
    showToast
};