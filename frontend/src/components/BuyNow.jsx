import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BuyNow = ({ product }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleBuyNow = () => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login to purchase this product');
            navigate('/login');
            return;
        }

        // Navigate to checkout page with product data
        const orderData = {
            orderType: 'single',
            product: product,
            totalPrice: product.price,
            orderItems: [
                {
                    product: product._id,
                    qty: 1
                }
            ]
        };

        navigate('/checkout', { state: { orderData } });
    };

    return (
        <button
            onClick={handleBuyNow}
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed mb-2"
        >
            {loading ? 'Processing...' : 'Buy Now'}
        </button>
    );
};

export default BuyNow; 