import React from 'react';

const AddToCart = ({ product }) => {
    const addToCart = () => {
        // Get existing cart from localStorage
        const existingCart = localStorage.getItem('cart');
        const cart = existingCart ? JSON.parse(existingCart) : [];

        // Check if product already exists in cart
        const existingItem = cart.find(item => item._id === product._id);

        if (existingItem) {
            // Update quantity if product already exists
            const updatedCart = cart.map(item =>
                item._id === product._id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        } else {
            // Add new product to cart
            const newItem = { ...product, quantity: 1 };
            cart.push(newItem);
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        // Show success message
        alert('Product added to cart!');
    };

    return (
        <button
            onClick={addToCart}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
            Add to Cart
        </button>
    );
};

export default AddToCart; 