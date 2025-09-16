import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OrderConfirmation = () => {
    const [orderDetails, setOrderDetails] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Get order details from navigation state or localStorage
        if (location.state?.orderDetails) {
            setOrderDetails(location.state.orderDetails);
        }
    }, [location]);

    if (!orderDetails) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4"></div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h2>
                    <p className="text-gray-600 mb-8">Thank you for your purchase.</p>
                    <button
                        onClick={() => navigate('/profile')}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition"
                    >
                        View My Orders
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <div className="text-center mb-8">
                        <div className="text-6xl mb-4"></div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
                        <p className="text-gray-600">Thank you for your purchase. Your order has been placed successfully.</p>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-gray-600">Order ID:</p>
                                <p className="font-semibold">{orderDetails._id}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Order Date:</p>
                                <p className="font-semibold">
                                    {new Date(orderDetails.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600">Total Amount:</p>
                                <p className="font-semibold text-green-600">${orderDetails.totalPrice}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Status:</p>
                                <p className="font-semibold text-blue-600 capitalize">{orderDetails.orderStatus}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => navigate('/profile')}
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition"
                        >
                            View My Orders
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold transition"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation; 