import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createOrder } from '../service/orderApi';
import CheckoutForm from '../components/CheckoutForm';

const CheckoutPage = () => {
    const [loading, setLoading] = useState(false);
    const [orderData, setOrderData] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Get order data from navigation state
        if (location.state?.orderData) {
            setOrderData(location.state.orderData);
        } else {
            // If no order data, redirect to home
            navigate('/');
        }
    }, [location, navigate]);

    const handleCheckoutSubmit = async (checkoutData) => {
        setLoading(true);
        try {
            const finalOrderData = {
                ...orderData,
                shippingAddress: checkoutData.shippingAddress,
                paymentMethod: checkoutData.paymentMethod
            };

            const response = await createOrder(finalOrderData);

            if (response.success) {
                // Clear cart if it was a cart order
                if (orderData.orderType === 'cart') {
                    localStorage.removeItem('cart');
                }

                // Navigate to order confirmation page with order details
                navigate('/order-confirmation', {
                    state: { orderDetails: response.orderDetails }
                });
            } else {
                alert('Failed to place order: ' + response.message);
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Error placing order: ' + (error.message || 'Something went wrong'));
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (!orderData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl">Loading checkout...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={handleBack}
                        className="text-blue-500 hover:text-blue-700 font-medium mb-4 flex items-center"
                    >
                        ← Back
                    </button>
                    <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

                            {orderData.orderType === 'single' ? (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                        <img
                                            src={`http://localhost:8089${orderData.product.image}` || '/logo192.png'}
                                            alt={orderData.product.title}
                                            className="w-16 h-16 object-cover rounded"
                                            onError={(e) => {
                                                e.target.src = '/logo192.png';
                                                e.target.onerror = null;
                                            }}
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-800">{orderData.product.title}</h3>
                                            <p className="text-sm text-gray-600">{orderData.product.category}</p>
                                            <p className="text-lg font-bold text-green-600">${orderData.product.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {orderData.cartItems.map((item) => (
                                        <div key={item._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={`http://localhost:8089${item.image}` || '/logo192.png'}
                                                    alt={item.title}
                                                    className="w-12 h-12 object-cover rounded"
                                                    onError={(e) => {
                                                        e.target.src = '/logo192.png';
                                                        e.target.onerror = null;
                                                    }}
                                                />
                                                <div>
                                                    <p className="font-medium text-gray-800">{item.title}</p>
                                                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <p className="font-medium text-gray-800">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="border-t border-gray-200 mt-4 pt-4">
                                <div className="flex justify-between text-gray-600 mb-2">
                                    <span>Subtotal</span>
                                    <span>${orderData.totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 mb-2">
                                    <span>Shipping</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                                <div className="border-t border-gray-200 pt-2">
                                    <div className="flex justify-between text-lg font-bold text-gray-800">
                                        <span>Total</span>
                                        <span className="text-green-600">${orderData.totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Checkout Form */}
                    <div className="lg:col-span-2">
                        <CheckoutForm
                            onSubmit={handleCheckoutSubmit}
                            loading={loading}
                            totalAmount={orderData.totalPrice}
                            orderType={orderData.orderType}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage; 