import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

  useEffect(() => {
    const updateCartCount = () => {
      const cart = localStorage.getItem("cart");
      if (cart) {
        const cartItems = JSON.parse(cart);
        const count = cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartCount(count);
      } else {
        setCartCount(0);
      }
    };
    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  if (isLoading) return null;

  return (
    <nav className="bg-gradient-to-r from-white to-blue-50 shadow-lg border-b border-blue-100 flex items-center justify-between px-8 py-4 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="flex items-center gap-6">
        <a
          href="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
        >
          ShopEase
        </a>
        <div className="hidden md:flex items-center gap-6">
          <a
            href="/"
            className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
          >
            🏠 Home
          </a>
          <a
            href="#categories"
            className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
          >
            📂 Categories
          </a>
          <a
            href="#featured"
            className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
          >
            ⭐ Featured
          </a>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <a
          href="/cart"
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

        {isAuthenticated ? (
          <>
            <a
              href="/profile"
              className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
            >
              👤 Profile
            </a>
            <button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
              className="text-gray-700 hover:text-red-600 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-all duration-200"
            >
              🚪 Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => loginWithRedirect()}
            className="text-gray-700 hover:text-green-600 font-medium px-4 py-2 rounded-lg hover:bg-green-50 transition-all duration-200"
          >
            🔑 Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
