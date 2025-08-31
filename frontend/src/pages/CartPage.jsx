import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Load cart items from localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
        setLoading(false);
    }, []);

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;

        const updatedCart = cartItems.map(item =>
            item._id === productId
                ? { ...item, quantity: newQuantity }
                : item
        );
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const removeItem = (productId) => {
        const updatedCart = cartItems.filter(item => item._id !== productId);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart');
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleCheckout = () => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login to proceed with checkout');
            navigate('/login');
            return;
        }

        // Navigate to checkout page with cart data
        const orderData = {
            orderType: 'cart',
            cartItems: cartItems,
            totalPrice: getTotalPrice(),
            orderItems: cartItems.map(item => ({
                product: item._id,
                qty: item.quantity
            }))
        };

        navigate('/checkout', { state: { orderData } });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading cart...</div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">🛒</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
                    <p className="text-gray-600 mb-8">Add some products to get started!</p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
                    <button
                        onClick={clearCart}
                        className="text-red-500 hover:text-red-700 font-medium"
                    >
                        Clear Cart
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            {cartItems.map((item) => (
                                <div key={item._id} className="flex items-center p-6 border-b border-gray-100 last:border-b-0">
                                    <img
                                        src={`http://localhost:8089${item.image}` || '/logo192.png'}
                                        alt={item.title}
                                        className="w-20 h-20 object-cover rounded-lg mr-4"
                                        onError={(e) => {
                                            e.target.src = '/logo192.png';
                                            e.target.onerror = null;
                                        }}
                                    />

                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                                        <p className="text-gray-600 text-sm mb-2">{item.category}</p>
                                        <div className="text-lg font-bold text-blue-600">${item.price}</div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center border border-gray-300 rounded-lg">
                                            <button
                                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                className="px-3 py-1 hover:bg-gray-100 transition"
                                            >
                                                -
                                            </button>
                                            <span className="px-4 py-1 border-x border-gray-300">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                className="px-3 py-1 hover:bg-gray-100 transition"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <div className="text-right">
                                            <div className="text-lg font-bold text-gray-800">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => removeItem(item._id)}
                                            className="text-red-500 hover:text-red-700 p-2"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal ({cartItems.length} items)</span>
                                    <span>${getTotalPrice().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                                <div className="border-t border-gray-200 pt-3">
                                    <div className="flex justify-between text-lg font-bold text-gray-800">
                                        <span>Total</span>
                                        <span>${getTotalPrice().toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition mb-4"
                            >
                                Proceed to Checkout
                            </button>

                            <button
                                onClick={() => navigate('/')}
                                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold transition"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage; 