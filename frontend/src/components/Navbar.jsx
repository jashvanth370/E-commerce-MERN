import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        // Get cart count from localStorage
        const updateCartCount = () => {
            const cart = localStorage.getItem('cart');
            if (cart) {
                const cartItems = JSON.parse(cart);
                const count = cartItems.reduce((total, item) => total + item.quantity, 0);
                setCartCount(count);
            } else {
                setCartCount(0);
            }
        };

        updateCartCount();
        // Listen for storage changes
        window.addEventListener('storage', updateCartCount);
        return () => window.removeEventListener('storage', updateCartCount);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        window.location.href = '/';
    };

    const handleProfileClick = (e) => {
        e.preventDefault();
        if (!localStorage.getItem('token')) {
            window.location.href = '/login';
        } else {
            window.location.href = '/profile';
        }
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        if (!localStorage.getItem('token')) {
            window.location.href = '/login';
        } else {
            window.location.href = '/cart';
        }
    };

    const isLoggedIn = !!localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    return (
        <nav className="bg-gradient-to-r from-white to-blue-50 shadow-lg border-b border-blue-100 flex items-center justify-between px-8 py-4 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
            <div className="flex items-center gap-6">
                <a href="/" className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform">
                    ShopEase
                </a>
                <div className="hidden md:flex items-center gap-6">
                    <a href="/" className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200">
                        🏠 Home
                    </a>
                    <a href="#categories" className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200">
                        📂 Categories
                    </a>
                    <a href="#featured" className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200">
                        ⭐ Featured
                    </a>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <a
                    href="/cart"
                    onClick={handleCartClick}
                    className="relative text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200 group"
                >
                    <span className="relative">
                        🛒 Cart
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </span>
                </a>
                <a
                    href="/profile"
                    onClick={handleProfileClick}
                    className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                >
                    👤 Profile
                </a>
                {isAdmin && (
                    <a
                        href="/add-product"
                        className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                    >
                        ➕ Add Product
                    </a>
                )}
                {isLoggedIn && (
                    <button
                        onClick={handleLogout}
                        className="text-gray-700 hover:text-red-600 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                    >
                        🚪 Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar; 