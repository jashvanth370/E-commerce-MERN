import React, { useState } from 'react';

const CheckoutForm = ({ onSubmit, loading, totalAmount, orderType = 'cart' }) => {
    const [formData, setFormData] = useState({
        shippingAddress: {
            fullName: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
            phone: ''
        },
        paymentMethod: 'credit_card',
        cardNumber: '',
        cardExpiry: '',
        cardCVC: ''
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (field, value) => {
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [field]: value
            }));
        }

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Validate shipping address
        if (!formData.shippingAddress.fullName.trim()) {
            newErrors['shippingAddress.fullName'] = 'Full name is required';
        }
        if (!formData.shippingAddress.address.trim()) {
            newErrors['shippingAddress.address'] = 'Address is required';
        }
        if (!formData.shippingAddress.city.trim()) {
            newErrors['shippingAddress.city'] = 'City is required';
        }
        if (!formData.shippingAddress.state.trim()) {
            newErrors['shippingAddress.state'] = 'State is required';
        }
        if (!formData.shippingAddress.zipCode.trim()) {
            newErrors['shippingAddress.zipCode'] = 'ZIP code is required';
        }
        if (!formData.shippingAddress.country.trim()) {
            newErrors['shippingAddress.country'] = 'Country is required';
        }
        if (!formData.shippingAddress.phone.trim()) {
            newErrors['shippingAddress.phone'] = 'Phone number is required';
        }

        // Validate payment method
        if (formData.paymentMethod === 'credit_card') {
            if (!formData.cardNumber.trim()) {
                newErrors.cardNumber = 'Card number is required';
            } else if (formData.cardNumber.replace(/\s/g, '').length < 13) {
                newErrors.cardNumber = 'Invalid card number';
            }
            if (!formData.cardExpiry.trim()) {
                newErrors.cardExpiry = 'Expiry date is required';
            }
            if (!formData.cardCVC.trim()) {
                newErrors.cardCVC = 'CVC is required';
            } else if (formData.cardCVC.length < 3) {
                newErrors.cardCVC = 'Invalid CVC';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Format shipping address as a string
        const shippingAddress = `${formData.shippingAddress.fullName}, ${formData.shippingAddress.address}, ${formData.shippingAddress.city}, ${formData.shippingAddress.state} ${formData.shippingAddress.zipCode}, ${formData.shippingAddress.country}. Phone: ${formData.shippingAddress.phone}`;

        // Format payment method
        let paymentMethod = formData.paymentMethod;
        if (formData.paymentMethod === 'credit_card') {
            paymentMethod = `Credit Card ending in ${formData.cardNumber.slice(-4)}`;
        }

        onSubmit({
            shippingAddress,
            paymentMethod
        });
    };

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(' ');
        } else {
            return v;
        }
    };

    const formatExpiry = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return v.substring(0, 2) + '/' + v.substring(2, 4);
        }
        return v;
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Checkout Information</h2>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Shipping Address Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Shipping Address</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.shippingAddress.fullName}
                                    onChange={(e) => handleInputChange('shippingAddress.fullName', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors['shippingAddress.fullName'] ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="John Doe"
                                />
                                {errors['shippingAddress.fullName'] && (
                                    <p className="text-red-500 text-sm mt-1">{errors['shippingAddress.fullName']}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    value={formData.shippingAddress.phone}
                                    onChange={(e) => handleInputChange('shippingAddress.phone', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors['shippingAddress.phone'] ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="+1 (555) 123-4567"
                                />
                                {errors['shippingAddress.phone'] && (
                                    <p className="text-red-500 text-sm mt-1">{errors['shippingAddress.phone']}</p>
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Street Address *
                                </label>
                                <input
                                    type="text"
                                    value={formData.shippingAddress.address}
                                    onChange={(e) => handleInputChange('shippingAddress.address', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors['shippingAddress.address'] ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="123 Main St, Apt 4B"
                                />
                                {errors['shippingAddress.address'] && (
                                    <p className="text-red-500 text-sm mt-1">{errors['shippingAddress.address']}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    City *
                                </label>
                                <input
                                    type="text"
                                    value={formData.shippingAddress.city}
                                    onChange={(e) => handleInputChange('shippingAddress.city', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors['shippingAddress.city'] ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="New York"
                                />
                                {errors['shippingAddress.city'] && (
                                    <p className="text-red-500 text-sm mt-1">{errors['shippingAddress.city']}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    State/Province *
                                </label>
                                <input
                                    type="text"
                                    value={formData.shippingAddress.state}
                                    onChange={(e) => handleInputChange('shippingAddress.state', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors['shippingAddress.state'] ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="NY"
                                />
                                {errors['shippingAddress.state'] && (
                                    <p className="text-red-500 text-sm mt-1">{errors['shippingAddress.state']}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    ZIP/Postal Code *
                                </label>
                                <input
                                    type="text"
                                    value={formData.shippingAddress.zipCode}
                                    onChange={(e) => handleInputChange('shippingAddress.zipCode', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors['shippingAddress.zipCode'] ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="10001"
                                />
                                {errors['shippingAddress.zipCode'] && (
                                    <p className="text-red-500 text-sm mt-1">{errors['shippingAddress.zipCode']}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Country *
                                </label>
                                <input
                                    type="text"
                                    value={formData.shippingAddress.country}
                                    onChange={(e) => handleInputChange('shippingAddress.country', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors['shippingAddress.country'] ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="United States"
                                />
                                {errors['shippingAddress.country'] && (
                                    <p className="text-red-500 text-sm mt-1">{errors['shippingAddress.country']}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Payment Method Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="credit_card"
                                        checked={formData.paymentMethod === 'credit_card'}
                                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                                        className="mr-2"
                                    />
                                    <span className="text-sm font-medium text-gray-700">Credit Card</span>
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="paypal"
                                        checked={formData.paymentMethod === 'paypal'}
                                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                                        className="mr-2"
                                    />
                                    <span className="text-sm font-medium text-gray-700">PayPal</span>
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cash_on_delivery"
                                        checked={formData.paymentMethod === 'cash_on_delivery'}
                                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                                        className="mr-2"
                                    />
                                    <span className="text-sm font-medium text-gray-700">Cash on Delivery</span>
                                </label>
                            </div>

                            {formData.paymentMethod === 'credit_card' && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Card Number *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.cardNumber}
                                            onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="1234 5678 9012 3456"
                                            maxLength="19"
                                        />
                                        {errors.cardNumber && (
                                            <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Expiry Date *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.cardExpiry}
                                            onChange={(e) => handleInputChange('cardExpiry', formatExpiry(e.target.value))}
                                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cardExpiry ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="MM/YY"
                                            maxLength="5"
                                        />
                                        {errors.cardExpiry && (
                                            <p className="text-red-500 text-sm mt-1">{errors.cardExpiry}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            CVC *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.cardCVC}
                                            onChange={(e) => handleInputChange('cardCVC', e.target.value.replace(/\D/g, ''))}
                                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cardCVC ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="123"
                                            maxLength="4"
                                        />
                                        {errors.cardCVC && (
                                            <p className="text-red-500 text-sm mt-1">{errors.cardCVC}</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Order Summary</h3>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">
                                {orderType === 'single' ? 'Single Product Purchase' : 'Cart Items'}
                            </span>
                            <span className="text-xl font-bold text-green-600">${totalAmount.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Processing Order...' : `Place Order - $${totalAmount.toFixed(2)}`}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CheckoutForm; 