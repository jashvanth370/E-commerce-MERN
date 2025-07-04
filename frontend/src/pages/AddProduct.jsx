import React, { useState, useEffect } from 'react';
import { addProduct } from '../service/productApi';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const categories = [
        'Electronics',
        'Clothing',
        'Books',
        'Home & Garden',
        'Sports & Outdoors',
        'Beauty & Health',
        'Toys & Games',
        'Automotive',
        'Food & Beverages',
        'Other'
    ];

    // Check if user is admin
    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        if (!isAdmin) {
            alert('Access denied. Admin privileges required.');
            navigate('/');
        }
    }, [navigate]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('category', category);
            formData.append('countInStock', countInStock);
            if (image) formData.append('image', image);
            await addProduct(formData);
            setSuccess('Product added successfully!');
            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            setError('Failed to add product');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setPrice('');
        setCategory('');
        setCountInStock('');
        setImage(null);
        setImagePreview(null);
        setError(null);
        setSuccess(null);
    };

    // Don't render the form if user is not admin
    if (localStorage.getItem('isAdmin') !== 'true') {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Add New Product</h1>
                    <p className="text-gray-600">Create a new product listing for your store</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Product Image Section */}
                        <div className="space-y-4">
                            <label className="block text-lg font-semibold text-gray-800">
                                📸 Product Image
                            </label>
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                            id="image-upload"
                                            required
                                        />
                                        <label htmlFor="image-upload" className="cursor-pointer">
                                            <div className="text-4xl mb-2">📁</div>
                                            <p className="text-gray-600">Click to upload product image</p>
                                            <p className="text-sm text-gray-500 mt-1">PNG, JPG, JPEG up to 10MB</p>
                                        </label>
                                    </div>
                                </div>
                                {imagePreview && (
                                    <div className="flex-1">
                                        <div className="bg-gray-100 rounded-lg p-4">
                                            <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-48 object-cover rounded-lg"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        🏷️ Product Title
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter product title"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        📝 Description
                                    </label>
                                    <textarea
                                        placeholder="Enter product description"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                        rows="4"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        💰 Price ($)
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        value={price}
                                        onChange={e => setPrice(e.target.value)}
                                        step="0.01"
                                        min="0"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        📂 Category
                                    </label>
                                    <select
                                        value={category}
                                        onChange={e => setCategory(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        required
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        📦 Stock Quantity
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        value={countInStock}
                                        onChange={e => setCountInStock(e.target.value)}
                                        min="0"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Status Messages */}
                        {error && (
                            <div className="p-4 bg-red-100 border border-red-400 rounded-lg text-red-700">
                                ❌ {error}
                            </div>
                        )}
                        {success && (
                            <div className="p-4 bg-green-100 border border-green-400 rounded-lg text-green-700">
                                ✅ {success}
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Adding Product...
                                    </span>
                                ) : (
                                    '🚀 Add Product'
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={resetForm}
                                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold shadow-lg transition"
                            >
                                🔄 Reset Form
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct; 