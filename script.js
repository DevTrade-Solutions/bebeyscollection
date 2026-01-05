// Product Data
const products = [
    {
        id: 1,
        name: "Adinkra Heritage Dress",
        category: "Dresses",
        price: 285.00,
        originalPrice: 320.00,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Elegant dress featuring traditional Adinkra symbols with a modern silhouette.",
        badge: "Best Seller",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Blue/Black", "Red/Gold", "Green/Brown"]
    },
    {
        id: 2,
        name: "Golden Sands Top",
        category: "Tops",
        price: 165.00,
        originalPrice: 195.00,
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Luxurious top with gold thread embroidery and intricate beadwork.",
        badge: "New",
        sizes: ["XS", "S", "M"],
        colors: ["Gold", "Ivory", "Bronze"]
    },
    {
        id: 3,
        name: "Ankara Palazzo Pants",
        category: "Bottoms",
        price: 120.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Wide-leg pants in vibrant Ankara print with comfortable elastic waist.",
        badge: null,
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Multi-color", "Blue/White", "Red/Black"]
    },
    {
        id: 4,
        name: "Kente Stole",
        category: "Accessories",
        price: 89.00,
        originalPrice: 110.00,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Handwoven Kente stole with traditional Ashanti patterns.",
        badge: "Sale",
        sizes: ["One Size"],
        colors: ["Gold/Green", "Red/Black", "Blue/White"]
    },
    {
        id: 5,
        name: "Mudcloth Jacket",
        category: "Outerwear",
        price: 220.00,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1567401893416-8f1f9e5b46ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Contemporary jacket made from authentic Malian mudcloth.",
        badge: "Limited Edition",
        sizes: ["S", "M", "L"],
        colors: ["Natural", "Indigo", "Brown"]
    },
    {
        id: 6,
        name: "Beaded Statement Earrings",
        category: "Jewelry",
        price: 65.00,
        originalPrice: 85.00,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Handcrafted beaded earrings with traditional African patterns.",
        badge: "New",
        sizes: ["One Size"],
        colors: ["Multicolor", "Gold/Red", "Blue/Green"]
    }
];

// Cart Data Structure - Starting with empty cart
let cart = [];

// DOM Elements
const cartIcon = document.getElementById('cartIcon');
const cartSlider = document.getElementById('cartSlider');
const cartSliderOverlay = document.getElementById('cartSliderOverlay');
const closeCartSlider = document.getElementById('closeCartSlider');
const cartSliderContent = document.getElementById('cartSliderContent');
const cartBadge = document.getElementById('cartBadge');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartTotal = document.getElementById('cartTotal');
const productsGrid = document.getElementById('productsGrid');
const header = document.querySelector('.header');
const searchBtn = document.getElementById('searchBtn');
const searchOverlay = document.getElementById('searchOverlay');
const closeSearchBtn = document.getElementById('closeSearchBtn');
const searchInput = document.getElementById('searchInput');
const continueShoppingBtn = document.getElementById('continueShoppingBtn');
const newsletterForm = document.getElementById('newsletterForm');
const toastContainer = document.getElementById('toastContainer');


// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Make sure the productsGrid element exists
    if (!productsGrid) {
        console.error('Products grid element not found. Check if the HTML has an element with id="productsGrid"');
    } else {
        renderProducts();
    }
    
    updateCartDisplay();
    
    // Add click event to search submit button
    const searchSubmitBtn = document.querySelector('.search-submit-btn');
    if (searchSubmitBtn) {
        searchSubmitBtn.addEventListener('click', () => {
            if (searchInput.value.trim()) {
                showToast(`Searching for: ${searchInput.value}`, 'success');
                setTimeout(() => {
                    closeSearchOverlay();
                }, 1500);
            }
        });
    }
    
    // Add Enter key support for search
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (searchInput.value.trim()) {
                showToast(`Searching for: ${searchInput.value}`, 'success');
                setTimeout(() => {
                    closeSearchOverlay();
                }, 1500);
            }
        }
    });
    
    // Ensure the "View All Products" button in the shop section links to shop.html
    const shopCtaBtn = document.querySelector('.shop-cta .btn-african');
    if (shopCtaBtn && !shopCtaBtn.getAttribute('href')) {
        shopCtaBtn.setAttribute('href', 'shop.html');
    }
    
    // FIXED: Adjust mobile menu button position dynamically based on screen size
    function adjustMobileMenuPosition() {
        const mobileLogoText = document.querySelector('.mobile-logo-text');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (window.innerWidth <= 992 && mobileLogoText && mobileMenuBtn) {
            // Calculate available space and adjust if needed
            const textWidth = mobileLogoText.scrollWidth;
            const containerWidth = mobileLogoText.parentElement.clientWidth;
            const buttonWidth = 40; // Approximate button width
            
            if (textWidth > (containerWidth - buttonWidth - 40)) {
                // Text is too long, reduce font size
                const currentSize = parseInt(window.getComputedStyle(mobileLogoText).fontSize);
                mobileLogoText.style.fontSize = (currentSize - 1) + 'px';
            }
        }
    }
    
    // Run on load and resize
    adjustMobileMenuPosition();
    window.addEventListener('resize', adjustMobileMenuPosition);
});

// Update cart display
function updateCartDisplay() {
    updateCartCount();
    updateCartSlider();
    updateCartTotal();
}

// Update cart count badge
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartBadge.textContent = totalItems;
}

// Update cart slider content
function updateCartSlider() {
    if (!cartSliderContent) return;
    
    if (cart.length === 0) {
        cartSliderContent.innerHTML = `
            <div class="empty-cart-message">
                <div class="empty-cart-icon">
                    <i class="fas fa-shopping-bag"></i>
                </div>
                <h3>Your cart is empty</h3>
                <p>Add some beautiful African attire to get started!</p>
            </div>
        `;
        
        return;
    }
    
    let html = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        html += `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-header">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">$${itemTotal.toFixed(2)}</div>
                    </div>
                    <div class="cart-item-size">Size: ${item.size} | Color: ${item.color}</div>
                    <div class="cart-item-actions">
                        <div class="quantity-controls">
                            <button class="quantity-btn minus" data-id="${item.id}">
                                <i class="fas fa-minus"></i>
                            </button>
                            <div class="quantity-display">${item.quantity}</div>
                            <button class="quantity-btn plus" data-id="${item.id}">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <button class="remove-item-btn" data-id="${item.id}">
                            <i class="fas fa-trash"></i> Remove
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    cartSliderContent.innerHTML = html;
    
    // Update cart totals
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;
    
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    cartTotal.textContent = `$${total.toFixed(2)}`;
    
    // Add event listeners to cart buttons
    addCartEventListeners();
}

// Update cart total
function updateCartTotal() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
}

// Add event listeners to cart items
function addCartEventListeners() {
    // Quantity minus buttons
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const item = cart.find(item => item.id === id);
            
            if (item.quantity > 1) {
                item.quantity--;
                updateCartDisplay();
                showToast(`${item.name} quantity decreased`, 'success');
            }
        });
    });
    
    // Quantity plus buttons
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const item = cart.find(item => item.id === id);
            
            item.quantity++;
            updateCartDisplay();
            showToast(`${item.name} quantity increased`, 'success');
        });
    });
    
    // Remove item buttons
    document.querySelectorAll('.remove-item-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const item = cart.find(item => item.id === id);
            
            cart = cart.filter(item => item.id !== id);
            updateCartDisplay();
            showToast(`${item.name} removed from cart`, 'error');
        });
    });
}

// Add product to cart
function addToCart(productId, size = 'M', color = null) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId && item.size === size && item.color === color);
    
    if (existingItem) {
        existingItem.quantity++;
        showToast(`${product.name} quantity increased`, 'success');
    } else {
        const defaultColor = color || product.colors[0];
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image,
            size: size,
            color: defaultColor
        });
        showToast(`${product.name} added to cart!`, 'success');
    }
    
    updateCartDisplay();
    
    // Open cart slider
    openCartSlider();
}

// Render products
function renderProducts() {
    if (!productsGrid) {
        console.error('Products grid element not found');
        return;
    }
    
    let html = '';
    
    products.forEach(product => {
        const hasDiscount = product.originalPrice !== null;
        const discountPercent = hasDiscount ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
        
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
    
    productsGrid.innerHTML = html;
    
    // Add event listeners to add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Show toast message
function showToast(message, type = 'success') {
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
    cartSlider.classList.add('active');
    cartSliderOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close cart slider
function closeCartSliderFunc() {
    cartSlider.classList.remove('active');
    cartSliderOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Open search overlay
function openSearchOverlay() {
    searchOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        searchInput.focus();
    }, 300);
}

// Close search overlay
function closeSearchOverlay() {
    searchOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    searchInput.value = '';
}

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Fade-in animation on scroll
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

// Cart functionality
cartIcon.addEventListener('click', () => {
    openCartSlider();
});

closeCartSlider.addEventListener('click', () => {
    closeCartSliderFunc();
});

cartSliderOverlay.addEventListener('click', () => {
    closeCartSliderFunc();
});

// Search functionality
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openSearchOverlay();
});

closeSearchBtn.addEventListener('click', () => {
    closeSearchOverlay();
});

searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) {
        closeSearchOverlay();
    }
});

// Continue shopping button
if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener('click', () => {
        closeCartSliderFunc();
    });
}

// Newsletter form submission
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('.newsletter-input').value;
        
        // Simulate form submission
        if (email) {
            showToast('Thank you for subscribing to our newsletter!', 'success');
            newsletterForm.reset();
        }
    });
}

// Fabric Explorer Functionality
const fabricListItems = document.querySelectorAll('#fabricList li');
const fabricImage = document.getElementById('fabricImage');
const fabricTitle = document.getElementById('fabricTitle');
const fabricDescription = document.getElementById('fabricDescription');

const fabricData = {
    ankara: {
        image: 'https://images.unsplash.com/photo-1558769132-cb1c458e4222?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        title: 'Ankara (Wax Print)',
        description: 'Originating from Dutch wax prints, Ankara has become synonymous with African fashion. Each pattern tells a story and carries cultural significance across West Africa. Known for its vibrant colors and bold patterns, Ankara fabric is a staple in African fashion.'
    },
    kente: {
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        title: 'Kente Cloth',
        description: 'Woven by the Ashanti people of Ghana, Kente is characterized by bright colors, geometric patterns, and symbolic designs. Each pattern has a name and meaning, often representing proverbs, historical events, or social status. Traditionally worn by royalty.'
    },
    bogolan: {
        image: 'https://images.unsplash.com/photo-1567401893416-8f1f9e5b46ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        title: 'Bogolan (Mudcloth)',
        description: 'Traditional Malian fabric dyed with fermented mud. Each Bogolan design is unique and often tells stories of history, mythology, or social status. The intricate patterns are hand-painted using natural dyes and traditional techniques passed down through generations.'
    },
    'aso-oke': {
        image: 'https://images.unsplash.com/photo-1523380677598-64d85a1e0dab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        title: 'Aso-Oke',
        description: 'A traditional Yoruba fabric from Nigeria, handwoven on narrow-strip looms. Often used for special occasions like weddings and naming ceremonies. Known for its intricate patterns and rich cultural significance in Yoruba tradition.'
    },
    adire: {
        image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        title: 'Adire (Indigo)',
        description: 'Yoruba resist-dyed cloth using natural indigo dye. Techniques include tie-dye, stitch-resist, and starch-resist methods passed through generations. Each Adire textile is a unique work of art with symbolic patterns representing cultural heritage.'
    }
};

if (fabricListItems.length > 0) {
    fabricListItems.forEach(item => {
        item.addEventListener('click', () => {
            fabricListItems.forEach(li => li.classList.remove('active'));
            item.classList.add('active');
            const fabricType = item.getAttribute('data-fabric');
            const data = fabricData[fabricType];
            fabricImage.src = data.image;
            fabricTitle.textContent = data.title;
            fabricDescription.textContent = data.description;
        });
    });
}

// Calendar Generation
const calendarDates = document.getElementById('calendarDates');

if (calendarDates) {
    function generateCalendar() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const firstDayOfWeek = firstDay.getDay();
        
        calendarDates.innerHTML = '';
        
        for (let i = 0; i < firstDayOfWeek; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'date';
            calendarDates.appendChild(emptyCell);
        }
        
        for (let day = 1; day <= daysInMonth; day++) {
            const dateCell = document.createElement('div');
            dateCell.className = 'date';
            dateCell.textContent = day;
            
            if (day === 15 || day === 20) {
                dateCell.classList.add('event');
                dateCell.addEventListener('click', () => {
                    showToast(`Event on December ${day}: ${day === 15 ? 'Virtual Fashion Show' : 'Artisan Workshop'}`, 'success');
                });
            }
            
            if (day === today.getDate() && month === today.getMonth()) {
                dateCell.style.backgroundColor = 'var(--accent)';
                dateCell.style.color = 'white';
            }
            
            calendarDates.appendChild(dateCell);
        }
    }
    generateCalendar();
}

// Adinkra Symbols Animation
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

// Search suggestions click
document.querySelectorAll('.suggestion-tag').forEach(tag => {
    tag.addEventListener('click', () => {
        searchInput.value = tag.textContent;
        showToast(`Searching for: ${tag.textContent}`, 'success');
        setTimeout(() => {
            closeSearchOverlay();
        }, 1500);
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Make sure the productsGrid element exists
    if (!productsGrid) {
        console.error('Products grid element not found. Check if the HTML has an element with id="productsGrid"');
    } else {
        renderProducts();
    }
    
    updateCartDisplay();
    
    // Add click event to search submit button
    const searchSubmitBtn = document.querySelector('.search-submit-btn');
    if (searchSubmitBtn) {
        searchSubmitBtn.addEventListener('click', () => {
            if (searchInput.value.trim()) {
                showToast(`Searching for: ${searchInput.value}`, 'success');
                setTimeout(() => {
                    closeSearchOverlay();
                }, 1500);
            }
        });
    }
    
    // Add Enter key support for search
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (searchInput.value.trim()) {
                showToast(`Searching for: ${searchInput.value}`, 'success');
                setTimeout(() => {
                    closeSearchOverlay();
                }, 1500);
            }
        }
    });
    
    // Ensure the "View All Products" button in the shop section links to shop.html
    const shopCtaBtn = document.querySelector('.shop-cta .btn-african');
    if (shopCtaBtn && !shopCtaBtn.getAttribute('href')) {
        shopCtaBtn.setAttribute('href', 'shop.html');
    }
});