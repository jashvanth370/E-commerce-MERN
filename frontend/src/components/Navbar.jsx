import React from 'react';

const Navbar = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };
    const isLoggedIn = !!localStorage.getItem('token');

    return (
        <nav className="bg-white shadow flex items-center justify-between px-8 py-4 sticky top-0 z-10">
            <div className="flex items-center gap-4">
                <a href="/" className="text-2xl font-extrabold text-blue-600">ShopEase</a>
                <a href="/" className="text-gray-700 hover:text-blue-600 font-medium px-3">Home</a>
                <a href="#categories" className="text-gray-700 hover:text-blue-600 font-medium px-3">Categories</a>
                <a href="#featured" className="text-gray-700 hover:text-blue-600 font-medium px-3">Featured</a>
            </div>
            <div className="flex items-center gap-4">
                <a href="/cart" className="relative text-gray-700 hover:text-blue-600 font-medium px-3">🛒 Cart</a>
                <a href="/profile" className="text-gray-700 hover:text-blue-600 font-medium px-3">Profile</a>
                {isLoggedIn && (
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded transition"
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar; 