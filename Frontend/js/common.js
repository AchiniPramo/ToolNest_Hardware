/**
 * Common Navigation and Footer Components
 * This file contains JavaScript to inject consistent navigation and footer across all pages
 */

document.addEventListener('DOMContentLoaded', function() {
    // Load the navigation bar
    loadNavbar();

    // Load the footer
    loadFooter();

    // Setup navigation functionality
    setupNavigation();

    // Update cart count
    updateCartCount();

    // Check authentication and update nav items
    checkAuthenticationStatus();
});

/**
 * Injects the navigation bar into the page
 */
function loadNavbar() {
    const headerElement = document.querySelector('header');
    if (!headerElement) return;

    const navbar = `
    <div class="container header-container">
        <a href="index.html" class="logo">Tool<span>nest</span></a>

        <div class="search-bar">
            <input type="text" id="searchInput" placeholder="Search for tools, brands, categories...">
            <button id="searchButton">Search</button>
        </div>

        <button class="mobile-menu-btn">☰</button>

        <ul class="nav-links">
            <li><a href="tool-finder.html">Tool Finder</a></li>
            <li><a href="products.html">Shop</a></li>
            <li><a href="service-booking.html">Services</a></li>
            <li><a href="cart.html" id="cartLink">Cart (0)</a></li>
            <li><a href="../pages/authentication.html" id="accountLink">My Account</a></li>
            <li class="admin-link" style="display: none;"><a href="admin-dashboard.html">Admin</a></li>
        </ul>
    </div>
    `;

    headerElement.innerHTML = navbar;
}

/**
 * Injects the footer into the page
 */
function loadFooter() {
    const footerElement = document.querySelector('footer');
    if (!footerElement) return;

    const footer = `
    <div class="container">
        <div class="footer-container">
            <div class="footer-section">
                <h3>Shop</h3>
                <ul class="footer-links">
                    <li><a href="products.html">All Tools</a></li>
                    <li><a href="tool-finder.html">By Project</a></li>
                    <li><a href="products.html?filter=category">By Category</a></li>
                    <li><a href="products.html?filter=brand">By Brand</a></li>
                    <li><a href="products.html?filter=offers">Special Offers</a></li>
                </ul>
            </div>

            <div class="footer-section">
                <h3>Services</h3>
                <ul class="footer-links">
                    <li><a href="service-booking.html?service=repair">Tool Repair</a></li>
                    <li><a href="service-booking.html?service=rental">Tool Rental</a></li>
                    <li><a href="service-booking.html?service=sharpening">Blade Sharpening</a></li>
                    <li><a href="service-booking.html?service=customization">Custom Orders</a></li>
                    <li><a href="service-booking.html">Service Packages</a></li>
                </ul>
            </div>

            <div class="footer-section">
                <h3>Support</h3>
                <ul class="footer-links">
                    <li><a href="contact.html">Contact Us</a></li>
                    <li><a href="faq.html">FAQ</a></li>
                    <li><a href="shipping.html">Shipping Information</a></li>
                    <li><a href="warranty.html">Returns & Warranty</a></li>
                    <li><a href="tool-guide.html">Tool Care Guide</a></li>
                </ul>
            </div>

            <div class="footer-section">
                <h3>Company</h3>
                <ul class="footer-links">
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="locations.html">Store Locations</a></li>
                    <li><a href="careers.html">Careers</a></li>
                    <li><a href="blog.html">Blog</a></li>
                    <li><a href="privacy.html">Privacy Policy</a></li>
                </ul>
            </div>
        </div>

        <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} Toolnest. All Rights Reserved.</p>
        </div>
    </div>
    `;

    footerElement.innerHTML = footer;
}

/**
 * Sets up navigation functionality
 */
function setupNavigation() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    if (searchInput && searchButton) {
        searchButton.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `products.html?search=${encodeURIComponent(query)}`;
            }
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    window.location.href = `products.html?search=${encodeURIComponent(query)}`;
                }
            }
        });
    }
}

/**
 * Updates the cart count in the navigation
 */
function updateCartCount() {
    const cartLink = document.getElementById('cartLink');
    if (!cartLink) return;

    // Get cart data from local storage or API
    getCartItems()
        .then(cart => {
            const itemCount = cart.totalItems || 0;
            cartLink.textContent = `Cart (${itemCount})`;
        })
        .catch(error => {
            console.error('Error updating cart count:', error);
            cartLink.textContent = 'Cart (0)';
        });
}

/**
 * Checks user authentication status and updates UI
 */
function checkAuthenticationStatus() {
    const accountLink = document.getElementById('accountLink');
    const adminLink = document.querySelector('.admin-link');

    if (!accountLink) return;

    // Check if user is logged in
    const token = localStorage.getItem('authToken');

    if (token) {
        // Get user details from token or API
        getUserDetails()
            .then(user => {
                // Update account link to show user's name
                accountLink.textContent = user.firstName || 'My Account';
                accountLink.href = 'user-account.html';

                // Show admin link if user has admin role
                if (user.roles && user.roles.includes('ROLE_ADMIN') && adminLink) {
                    adminLink.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error getting user details:', error);
                // If token is invalid, clear it
                localStorage.removeItem('authToken');
                accountLink.textContent = 'Sign In';
                accountLink.href = '/pages/authentication.html';
            });
    } else {
        // User is not logged in
        accountLink.textContent = 'Sign In';
        accountLink.href = '/pages/authentication.html';
    }
}

/**
 * Gets cart items from API or local storage
 * @returns {Promise} Promise that resolves with cart data
 */
function getCartItems() {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('authToken');

        if (token) {
            // User is logged in, get cart from API
            fetch('/api/cart', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    if (!response.ok) throw new Error('Failed to fetch cart');
                    return response.json();
                })
                .then(data => resolve(data))
                .catch(error => {
                    console.error('Error fetching cart:', error);
                    // Fallback to local cart
                    resolve(getLocalCart());
                });
        } else {
            // User is not logged in, get cart from local storage
            resolve(getLocalCart());
        }
    });
}

/**
 * Gets local cart from localStorage
 * @returns {Object} Cart object with items and total count
 */
function getLocalCart() {
    const localCart = JSON.parse(localStorage.getItem('cart') || '{"cartItems":[], "totalItems": 0}');
    return localCart;
}

/**
 * Gets user details from API using stored token
 * @returns {Promise} Promise that resolves with user data
 */
function getUserDetails() {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('authToken');

        if (!token) {
            reject(new Error('No authentication token found'));
            return;
        }

        fetch('/api/users/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}