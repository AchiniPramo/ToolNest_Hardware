
// Global state
let cart = {
    cartItems: [],
    totalPrice: 0,
    totalItems: 0,
    discountAmount: 0,
    appliedPromoCode: null
};

document.addEventListener('DOMContentLoaded', function() {
    // Load cart data
    loadCart();

    // Load recommended products
    loadRecommendedProducts();
});

/**
 * Load cart data from API or local storage
 */
function loadCart() {
    const cartContentContainer = document.getElementById('cartContent');

    // Show loading spinner
    cartContentContainer.innerHTML = '<div class="spinner-container"><div class="spinner"></div></div>';

    // Check if user is logged in
    const token = localStorage.getItem('token');

    if (token) {
        // Get cart from API
        fetch('http://localhost:8080/api/v1/cart', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.status === 401 || response.status === 403) {
                    // Token expired or invalid, clear it and load from local storage
                    clearAuthData();
                    loadLocalCart();
                    throw new Error('Authentication failed');
                }
                return response.json();
            })
            .then(data => {
                if (data.code === 200) {
                    // Update global cart state
                    cart = data.data;
                    // Ensure cartItems exists
                    if (!cart.cartItems) {
                        cart.cartItems = [];
                    }
                    // Render cart
                    renderCart();
                } else {
                    throw new Error(data.message || 'Failed to load cart');
                }
            })
            .catch(error => {
                console.error('Error loading cart:', error);
                // If not already handled as auth error, try local cart
                if (error.message !== 'Authentication failed') {
                    loadLocalCart();
                }
            });
    } else {
        // Get cart from local storage
        loadLocalCart();
    }
}

/**
 * Load cart data from local storage
 */
function loadLocalCart() {
    try {
        // Get cart from local storage
        const localCartData = localStorage.getItem('cart');
        if (localCartData) {
            // Parse cart data
            const localCart = JSON.parse(localCartData);

            // Update global cart state with proper validation
            cart = {
                cartItems: Array.isArray(localCart.cartItems) ? localCart.cartItems : [],
                totalItems: localCart.totalItems || 0,
                totalPrice: localCart.totalPrice || 0,
                discountAmount: localCart.discountAmount || 0,
                appliedPromoCode: localCart.appliedPromoCode || null
            };

            // Recalculate totals to ensure accuracy
            recalculateCartTotals();
        } else {
            // Initialize empty cart
            cart = {
                cartItems: [],
                totalItems: 0,
                totalPrice: 0,
                discountAmount: 0,
                appliedPromoCode: null
            };
        }

        // Render cart
        renderCart();
    } catch (error) {
        console.error('Error loading cart from local storage:', error);
        // Initialize empty cart as fallback
        cart = {
            cartItems: [],
            totalItems: 0,
            totalPrice: 0,
            discountAmount: 0,
            appliedPromoCode: null
        };
        renderEmptyCart();
    }
}

/**
 * Render cart content
 */
function renderCart() {
    const cartContentContainer = document.getElementById('cartContent');

    // Check if cart is empty
    if (!cart.cartItems || cart.cartItems.length === 0) {
        renderEmptyCart();
        return;
    }

    // Calculate final totals
    const tax = (cart.totalPrice || 0) * 0.07;
    const shipping = (cart.totalPrice || 0) >= 100 ? 0 : 9.99;
    const discount = cart.discountAmount || 0;
    const total = (cart.totalPrice || 0) + tax + shipping - discount;

    // Create cart layout HTML
    cartContentContainer.innerHTML = `
        <div class="cart-layout">
            <div class="cart-items">
                <div class="cart-header">
                    <h2 class="cart-title">Your Cart</h2>
                    <span class="cart-count">${cart.totalItems} items</span>
                </div>
                <table class="cart-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Subtotal</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="cartItemsContainer">
                        <!-- Cart items will be rendered here -->
                    </tbody>
                </table>
                <div class="cart-actions">
                    <a href="products.html" class="continue-shopping">
                        <span class="continue-icon">←</span> Continue Shopping
                    </a>
                    <button class="btn btn-outline" id="clearCartBtn">Clear Cart</button>
                </div>
            </div>
            <div class="cart-summary">
                <h3 class="summary-title">Order Summary</h3>
                <div class="summary-row">
                    <span class="summary-label">Subtotal</span>
                    <span class="summary-value">$${(cart.totalPrice || 0).toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span class="summary-label">Shipping</span>
                    <span class="summary-value">${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span class="summary-label">Tax</span>
                    <span class="summary-value">$${tax.toFixed(2)}</span>
                </div>
                ${discount > 0 ? `
                <div class="summary-row">
                    <span class="summary-label">Discount</span>
                    <span class="summary-value">-$${discount.toFixed(2)}</span>
                </div>
                ` : ''}
                <div class="summary-row summary-total">
                    <span class="summary-label">Total</span>
                    <span class="summary-value">$${total.toFixed(2)}</span>
                </div>
                <a href="checkout.html" class="btn checkout-btn">Proceed to Checkout</a>
                <div class="promo-code">
                    <h4 class="promo-title">Promo Code</h4>
                    <div class="promo-form">
                        <input type="text" class="promo-input" id="promoInput" placeholder="Enter code">
                        <button class="promo-btn" id="applyPromoBtn">Apply</button>
                    </div>
                    ${cart.appliedPromoCode ? `
                    <div class="applied-promo">
                        <span class="promo-code-text">${cart.appliedPromoCode}</span>
                        <button class="remove-promo" id="removePromoBtn">✕</button>
                    </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;

    // Render cart items
    renderCartItems();

    // Setup event listeners
    setupCartEventListeners();
}

/**
 * Render all cart items
 */
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItemsContainer');

    if (!cartItemsContainer) return;

    // Clear existing items
    cartItemsContainer.innerHTML = '';

    // Render each cart item
    cart.cartItems.forEach(item => {
        const cartItemRow = document.createElement('tr');

        // Calculate subtotal (handle both unitPrice and price properties)
        const unitPrice = item.unitPrice || item.price || 0;
        const subtotal = unitPrice * item.quantity;

        cartItemRow.innerHTML = `
            <td class="product-col">
                <div class="product-image">
                    <img src="${item.productImage || 'https://via.placeholder.com/80x80?text=Tyre'}" alt="${item.productName}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${item.productName}</h3>
                    <div class="product-meta">
                        ${item.productSize ? item.productSize : ''}
                        ${item.productType ? ` | ${item.productType}` : ''}
                    </div>
                </div>
            </td>
            <td class="quantity-col">
                <div class="quantity-selector">
                    <button class="quantity-btn decrease-btn" data-id="${item.id || item.productId}">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id || item.productId}">
                    <button class="quantity-btn increase-btn" data-id="${item.id || item.productId}">+</button>
                </div>
            </td>
            <td class="price-col">$${unitPrice.toFixed(2)}</td>
            <td class="subtotal-col">$${subtotal.toFixed(2)}</td>
            <td class="remove-col">
                <button class="remove-btn" data-id="${item.id || item.productId}">✕</button>
            </td>
        `;

        cartItemsContainer.appendChild(cartItemRow);
    });
}

/**
 * Render empty cart view
 */
function renderEmptyCart() {
    const cartContentContainer = document.getElementById('cartContent');

    cartContentContainer.innerHTML = `
        <div class="empty-cart">
            <div class="empty-cart-icon">🛒</div>
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <a href="products.html" class="btn">Start Shopping</a>
        </div>
    `;
}

/**
 * Setup cart event listeners
 */
function setupCartEventListeners() {
    // Quantity decrease buttons
    const decreaseButtons = document.querySelectorAll('.decrease-btn');
    decreaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.getAttribute('data-id');
            updateCartItemQuantity(itemId, -1);
        });
    });

    // Quantity increase buttons
    const increaseButtons = document.querySelectorAll('.increase-btn');
    increaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.getAttribute('data-id');
            updateCartItemQuantity(itemId, 1);
        });
    });

    // Quantity input fields
    const quantityInputs = document.querySelectorAll('.quantity-input');
    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            const itemId = this.getAttribute('data-id');
            const newQuantity = parseInt(this.value);
            setCartItemQuantity(itemId, newQuantity);
        });
    });

    // Remove buttons
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.getAttribute('data-id');
            removeCartItem(itemId);
        });
    });

    // Clear cart button
    const clearCartBtn = document.getElementById('clearCartBtn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to clear your cart?')) {
                clearCart();
            }
        });
    }

    // Apply promo button
    const applyPromoBtn = document.getElementById('applyPromoBtn');
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', function() {
            const promoCode = document.getElementById('promoInput').value.trim();
            if (promoCode) {
                applyPromoCode(promoCode);
            } else {
                showError('Please enter a promo code.');
            }
        });
    }

    // Remove promo button
    const removePromoBtn = document.getElementById('removePromoBtn');
    if (removePromoBtn) {
        removePromoBtn.addEventListener('click', function() {
            removePromoCode();
        });
    }
}

/**
 * Update cart item quantity by a delta
 * @param {string} itemId Cart item ID or product ID
 * @param {number} delta Quantity change amount (-1 or 1)
 */
function updateCartItemQuantity(itemId, delta) {
    // Find the item in the cart
    const item = cart.cartItems.find(item => (item.id || item.productId) == itemId);

    if (!item) return;

    // Calculate new quantity
    const newQuantity = item.quantity + delta;

    // Ensure quantity is at least 1
    if (newQuantity < 1) return;

    // Update quantity
    setCartItemQuantity(itemId, newQuantity);
}

/**
 * Set cart item quantity to a specific value
 * @param {string} itemId Cart item ID or product ID
 * @param {number} quantity New quantity
 */
function setCartItemQuantity(itemId, quantity) {
    // Ensure quantity is at least 1
    quantity = Math.max(1, quantity);

    // Check if user is logged in
    const token = localStorage.getItem('token');

    if (token) {
        // Update cart via API
        fetch(`http://localhost:8080/api/v1/cart/update?cartItemId=${itemId}&quantity=${quantity}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.status === 401 || response.status === 403) {
                    // Token expired or invalid, clear it and update local cart
                    clearAuthData();
                    updateLocalCartItemQuantity(itemId, quantity);
                    throw new Error('Authentication failed');
                }
                return response.json();
            })
            .then(data => {
                if (data.code === 200) {
                    // Update global cart state
                    cart = data.data;
                    // Render updated cart
                    renderCart();
                    // Update header cart count
                    updateCartCount(cart.totalItems);
                    showSuccess('Cart updated successfully.');
                } else {
                    throw new Error(data.message || 'Failed to update cart');
                }
            })
            .catch(error => {
                console.error('Error updating cart:', error);
                if (error.message !== 'Authentication failed') {
                    showError('Failed to update cart. Please try again.');
                }
            });
    } else {
        // Update local cart
        updateLocalCartItemQuantity(itemId, quantity);
    }
}

/**
 * Update cart item quantity in local storage
 * @param {string} itemId Product ID
 * @param {number} quantity New quantity
 */
function updateLocalCartItemQuantity(itemId, quantity) {
    // Find the item in the cart
    const itemIndex = cart.cartItems.findIndex(item => (item.id || item.productId) == itemId);

    if (itemIndex === -1) return;

    // Update quantity
    cart.cartItems[itemIndex].quantity = quantity;

    // Recalculate totals
    recalculateCartTotals();

    // Save to local storage
    saveCartToLocalStorage();

    // Render updated cart
    renderCart();

    // Update header cart count
    updateCartCount(cart.totalItems);

    showSuccess('Cart updated successfully.');
}

/**
 * Remove item from cart
 * @param {string} itemId Cart item ID or product ID
 */
function removeCartItem(itemId) {
    // Check if user is logged in
    const token = localStorage.getItem('token');

    if (token) {
        // Remove item via API
        fetch(`http://localhost:8080/api/v1/cart/remove?cartItemId=${itemId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.status === 401 || response.status === 403) {
                    // Token expired or invalid, clear it and remove from local cart
                    clearAuthData();
                    removeLocalCartItem(itemId);
                    throw new Error('Authentication failed');
                }
                return response.json();
            })
            .then(data => {
                if (data.code === 200) {
                    // Update global cart state
                    cart = data.data;
                    // Render updated cart
                    renderCart();
                    // Update header cart count
                    updateCartCount(cart.totalItems);
                    showSuccess('Item removed from cart.');
                } else {
                    throw new Error(data.message || 'Failed to remove item');
                }
            })
            .catch(error => {
                console.error('Error removing item from cart:', error);
                if (error.message !== 'Authentication failed') {
                    showError('Failed to remove item. Please try again.');
                }
            });
    } else {
        // Remove from local cart
        removeLocalCartItem(itemId);
    }
}

/**
 * Remove item from local cart
 * @param {string} itemId Product ID
 */
function removeLocalCartItem(itemId) {
    // Filter out the item
    cart.cartItems = cart.cartItems.filter(item => (item.id || item.productId) != itemId);

    // Recalculate totals
    recalculateCartTotals();

    // Save to local storage
    saveCartToLocalStorage();

    // Render updated cart
    renderCart();

    // Update header cart count
    updateCartCount(cart.totalItems);

    showSuccess('Item removed from cart.');
}

/**
 * Clear entire cart
 */
function clearCart() {
    // Check if user is logged in
    const token = localStorage.getItem('token');

    if (token) {
        // Clear cart via API
        fetch('http://localhost:8080/api/v1/cart/clear', {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.status === 401 || response.status === 403) {
                    // Token expired or invalid, clear it and clear local cart
                    clearAuthData();
                    clearLocalCart();
                    throw new Error('Authentication failed');
                }
                return response.json();
            })
            .then(data => {
                if (data.code === 200) {
                    // Update global cart state
                    cart = data.data;
                    // Render empty cart
                    renderEmptyCart();
                    // Update header cart count
                    updateCartCount(0);
                    showSuccess('Cart cleared successfully.');
                } else {
                    throw new Error(data.message || 'Failed to clear cart');
                }
            })
            .catch(error => {
                console.error('Error clearing cart:', error);
                if (error.message !== 'Authentication failed') {
                    showError('Failed to clear cart. Please try again.');
                }
            });
    } else {
        // Clear local cart
        clearLocalCart();
    }
}

/**
 * Clear local cart
 */
function clearLocalCart() {
    // Reset cart
    cart = {
        cartItems: [],
        totalItems: 0,
        totalPrice: 0,
        discountAmount: 0,
        appliedPromoCode: null
    };

    // Save to local storage
    saveCartToLocalStorage();

    // Render empty cart
    renderEmptyCart();

    // Update header cart count
    updateCartCount(0);

    showSuccess('Cart cleared successfully.');
}

/**
 * Apply promo code to cart
 * @param {string} promoCode Promo code to apply
 */
function applyPromoCode(promoCode) {
    // Check if user is logged in
    const token = localStorage.getItem('token');

    if (token) {
        // Apply promo via API
        fetch(`http://localhost:8080/api/v1/cart/apply-promo?promoCode=${promoCode}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.status === 401 || response.status === 403) {
                    // Token expired or invalid, clear it and apply to local cart
                    clearAuthData();
                    applyLocalPromoCode(promoCode);
                    throw new Error('Authentication failed');
                }
                return response.json();
            })
            .then(data => {
                if (data.code === 200) {
                    // Update global cart state
                    cart = data.data;
                    // Render updated cart
                    renderCart();
                    showSuccess('Promo code applied successfully.');
                } else {
                    throw new Error(data.message || 'Failed to apply promo code');
                }
            })
            .catch(error => {
                console.error('Error applying promo code:', error);
                if (error.message !== 'Authentication failed') {
                    showError('Invalid promo code. Please try again.');
                }
            });
    } else {
        // Apply promo to local cart
        applyLocalPromoCode(promoCode);
    }
}

/**
 * Apply promo code to local cart
 * @param {string} promoCode Promo code to apply
 */
function applyLocalPromoCode(promoCode) {
    // For demo, validate promo codes
    if (promoCode.toUpperCase() === 'WELCOME10') {
        cart.discountAmount = cart.totalPrice * 0.1; // 10% discount
        cart.appliedPromoCode = promoCode;
        showSuccess('Promo code applied successfully.');
    } else if (promoCode.toUpperCase() === 'SUMMER20') {
        cart.discountAmount = cart.totalPrice * 0.2; // 20% discount
        cart.appliedPromoCode = promoCode;
        showSuccess('Promo code applied successfully.');
    } else {
        showError('Invalid promo code. Please try again.');
        return;
    }

    // Save to local storage
    saveCartToLocalStorage();

    // Render updated cart
    renderCart();
}

/**
 * Remove promo code from cart
 */
function removePromoCode() {
    // Check if user is logged in
    const token = localStorage.getItem('token');

    if (token) {
        // Remove promo via API
        fetch('http://localhost:8080/api/v1/cart/remove-promo', {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.status === 401 || response.status === 403) {
                    // Token expired or invalid, clear it and remove from local cart
                    clearAuthData();
                    removeLocalPromoCode();
                    throw new Error('Authentication failed');
                }
                return response.json();
            })
            .then(data => {
                if (data.code === 200) {
                    // Update global cart state
                    cart = data.data;
                    // Render updated cart
                    renderCart();
                    showSuccess('Promo code removed.');
                } else {
                    throw new Error(data.message || 'Failed to remove promo code');
                }
            })
            .catch(error => {
                console.error('Error removing promo code:', error);
                if (error.message !== 'Authentication failed') {
                    showError('Failed to remove promo code. Please try again.');
                }
            });
    } else {
        // Remove promo from local cart
        removeLocalPromoCode();
    }
}

/**
 * Remove promo code from local cart
 */
function removeLocalPromoCode() {
    cart.discountAmount = 0;
    cart.appliedPromoCode = null;

    // Save to local storage
    saveCartToLocalStorage();

    // Render updated cart
    renderCart();

    showSuccess('Promo code removed.');
}

/**
 * Recalculate cart totals
 */
function recalculateCartTotals() {
    // Reset totals
    cart.totalItems = 0;
    cart.totalPrice = 0;

    // Calculate from cart items
    if (Array.isArray(cart.cartItems)) {
        cart.cartItems.forEach(item => {
            const unitPrice = item.unitPrice || item.price || 0;
            cart.totalItems += item.quantity;
            cart.totalPrice += unitPrice * item.quantity;
        });
    }

    // Recalculate discount if promo code is applied
    if (cart.appliedPromoCode) {
        if (cart.appliedPromoCode.toUpperCase() === 'WELCOME10') {
            cart.discountAmount = cart.totalPrice * 0.1; // 10% discount
        } else if (cart.appliedPromoCode.toUpperCase() === 'SUMMER20') {
            cart.discountAmount = cart.totalPrice * 0.2; // 20% discount
        }
    }
}

/**
 * Save cart to localStorage
 */
function saveCartToLocalStorage() {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Error saving cart to localStorage:', error);
        showError('Failed to save cart. Your browser storage may be full or restricted.');
    }
}

/**
 * Load recommended products
 */
function loadRecommendedProducts() {
    const recommendedProductsContainer = document.getElementById('recommendedProducts');

    // Call API to get featured or best-selling products
    fetch('http://localhost:8080/api/v1/products?page=0&size=4')
        .then(response => response.json())
        .then(data => {
            if (data.code === 200) {
                const products = data.data.content || [];

                // Clear loading spinner
                recommendedProductsContainer.innerHTML = '';

                if (products.length === 0) {
                    recommendedProductsContainer.innerHTML = '<p>No recommended products available.</p>';
                    return;
                }

                // Render each product
                products.forEach(product => {
                    const productCard = createProductCard(product);
                    recommendedProductsContainer.appendChild(productCard);
                });
            } else {
                throw new Error(data.message || 'Failed to load recommended products');
            }
        })
        .catch(error => {
            console.error('Error loading recommended products:', error);
            recommendedProductsContainer.innerHTML = '<p>Failed to load recommended products.</p>';
        });
}

/**
 * Create a product card element
 * @param {Object} product Product data
 * @returns {HTMLElement} Product card element
 */
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';

    productCard.innerHTML = `
        <div class="product-card-image">
            <img src="${product.imageUrl || 'https://via.placeholder.com/300x300?text=Tyre'}" alt="${product.name}">
        </div>
        <div class="product-card-info">
            <h3 class="product-card-title">${product.name}</h3>
            <div class="product-card-price">$${(product.price || 0).toFixed(2)}</div>
            <a href="product-detail.html?id=${product.id}" class="btn">View Details</a>
        </div>
    `;

    return productCard;
}

/**
 * Update cart count in header
 * @param {number} count Cart item count
 */
function updateCartCount(count) {
    const cartLinks = document.querySelectorAll('a[href="cart.html"]');
    cartLinks.forEach(link => {
        link.textContent = `Cart (${count || 0})`;
    });
}

/**
 * Show success message
 * @param {string} message Success message text
 */
function showSuccess(message) {
    const alert = document.getElementById('alertSuccess');
    if (alert) {
        alert.textContent = message;
        alert.classList.add('show');

        // Hide after 5 seconds
        setTimeout(() => {
            alert.classList.remove('show');
        }, 5000);
    }
}

/**
 * Show error message
 * @param {string} message Error message text
 */
function showError(message) {
    const alert = document.getElementById('alertError');
    if (alert) {
        alert.textContent = message;
        alert.classList.add('show');

        // Hide after 5 seconds
        setTimeout(() => {
            alert.classList.remove('show');
        }, 5000);
    }
}

/**
 * Clear authentication data
 */
function clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
}
