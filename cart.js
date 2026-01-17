// Cart Management Module
export const CartManager = (() => {
    let cart = [];
    
    // Initialize cart
    function init() {
        loadCartFromStorage();
        updateDisplay();
    }
    
    // Add product to cart
    function addToCart(productId, size = 'M', color = null) {
        const product = Data.products.find(p => p.id === productId);
        if (!product) return;
        
        // Get default color if not provided
        const defaultColor = color || (product.colors && product.colors[0]) || 'Default';
        const defaultSize = size || (product.sizes && product.sizes[0]) || 'M';
        
        // Check if product is already in cart with same size and color
        const existingItem = cart.find(item => 
            item.id === productId && 
            item.size === defaultSize && 
            item.color === defaultColor
        );
        
        if (existingItem) {
            existingItem.quantity++;
            UI.showToast(`${product.name} quantity increased`, 'success');
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
            UI.showToast(`${product.name} added to cart!`, 'success');
        }
        
        updateDisplay();
        saveCartToStorage();
    }
    
    // Remove item from cart
    function removeFromCart(productId, size, color) {
        const itemIndex = cart.findIndex(item => 
            item.id === productId && 
            item.size === size && 
            item.color === color
        );
        
        if (itemIndex !== -1) {
            const item = cart[itemIndex];
            cart.splice(itemIndex, 1);
            UI.showToast(`${item.name} removed from cart`, 'error');
            updateDisplay();
            saveCartToStorage();
        }
    }
    
    // Update item quantity
    function updateQuantity(productId, newQuantity, size, color) {
        const item = cart.find(item => 
            item.id === productId && 
            item.size === size && 
            item.color === color
        );
        
        if (item) {
            if (newQuantity > 0) {
                item.quantity = newQuantity;
            } else {
                removeFromCart(productId, size, color);
            }
            updateDisplay();
            saveCartToStorage();
        }
    }
    
    // Calculate cart totals
    function calculateTotals() {
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const tax = subtotal * 0.08; // 8% tax
        const total = subtotal + tax;
        
        return {
            subtotal,
            tax,
            total,
            itemCount: cart.reduce((count, item) => count + item.quantity, 0)
        };
    }
    
    // Update cart display
    function updateDisplay() {
        updateCartCount();
        updateCartSlider();
        updateCartTotal();
        updateMobileCartBadge();
    }
    
    // Update cart count badge
    function updateCartCount() {
        const totals = calculateTotals();
        const cartBadge = document.getElementById('cartBadge');
        if (cartBadge) {
            cartBadge.textContent = totals.itemCount;
            cartBadge.style.display = totals.itemCount > 0 ? 'flex' : 'none';
        }
    }
    
    // Update mobile cart badge
    function updateMobileCartBadge() {
        const totals = calculateTotals();
        const mobileCartBadge = document.getElementById('mobileCartBadge');
        if (mobileCartBadge) {
            mobileCartBadge.textContent = totals.itemCount;
            mobileCartBadge.style.display = totals.itemCount > 0 ? 'inline-block' : 'none';
        }
    }
    
    // Update cart slider content
    function updateCartSlider() {
        const cartSliderContent = document.getElementById('cartSliderContent');
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
        const totals = calculateTotals();
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            
            html += `
                <div class="cart-item" data-id="${item.id}" data-size="${item.size}" data-color="${item.color}">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <div class="cart-item-header">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">R${itemTotal.toFixed(2)}</div>
                        </div>
                        <div class="cart-item-size">Size: ${item.size} | Color: ${item.color}</div>
                        <div class="cart-item-actions">
                            <div class="quantity-controls">
                                <button class="quantity-btn minus" data-id="${item.id}" data-size="${item.size}" data-color="${item.color}">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <div class="quantity-display">${item.quantity}</div>
                                <button class="quantity-btn plus" data-id="${item.id}" data-size="${item.size}" data-color="${item.color}">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                            <button class="remove-item-btn" data-id="${item.id}" data-size="${item.size}" data-color="${item.color}">
                                <i class="fas fa-trash"></i> Remove
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        cartSliderContent.innerHTML = html;
        
        // Update cart totals display
        const cartSubtotal = document.getElementById('cartSubtotal');
        const cartTotal = document.getElementById('cartTotal');
        
        if (cartSubtotal) cartSubtotal.textContent = `R${totals.subtotal.toFixed(2)}`;
        if (cartTotal) cartTotal.textContent = `R${totals.total.toFixed(2)}`;
    }
    
    // Update cart total display
    function updateCartTotal() {
        const totals = calculateTotals();
        const cartTotal = document.getElementById('cartTotal');
        if (cartTotal) {
            cartTotal.textContent = `R${totals.total.toFixed(2)}`;
        }
    }
    
    // Save cart to localStorage
    function saveCartToStorage() {
        try {
            localStorage.setItem('bebeysCart', JSON.stringify(cart));
        } catch (e) {
            console.error('Failed to save cart to localStorage:', e);
        }
    }
    
    // Load cart from localStorage
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
    
    // Get cart items
    function getCart() {
        return cart;
    }
    
    // Clear cart
    function clearCart() {
        cart = [];
        updateDisplay();
        saveCartToStorage();
    }
    
    return {
        init,
        addToCart,
        removeFromCart,
        updateQuantity,
        calculateTotals,
        updateDisplay,
        getCart,
        clearCart
    };
})();
