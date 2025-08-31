import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getProfile, updateUser } from '../service/userApi';
import { getUserOrders } from '../service/orderApi';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [updating, setUpdating] = useState(false);
    const [success, setSuccess] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getProfile();
                setUser(res.user);
            } catch (err) {
                setError('Failed to fetch user info');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleFileChange = (e) => {
        setProfilePic(e.target.files[0]);
    };

    const handleUpdateProfile = async () => {
        if (!profilePic) return;
        setUpdating(true);
        setSuccess(null);
        setError(null);
        try {
            const formData = new FormData();
            formData.append('profilePic', profilePic);
            const res = await updateUser(formData);
            setUser(res.user);
            setSuccess('Profile updated successfully!');
            setEditMode(false);
        } catch (err) {
            setError('Failed to update profile');
        } finally {
            setUpdating(false);
        }
    };

    const fetchOrders = async () => {
        setOrdersLoading(true);
        try {
            const response = await getUserOrders();
            if (response.success) {
                setOrders(response.orderDetails);
            }
        } catch (err) {
            console.error('Failed to fetch orders:', err);
        } finally {
            setOrdersLoading(false);
        }
    };

    // Fetch orders when orders tab is selected
    useEffect(() => {
        if (activeTab === 'orders') {
            fetchOrders();
        }
    }, [activeTab]);

    if (loading) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-xl">Loading profile...</div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-red-500 text-xl">{error}</div>
        </div>
    );

    if (!user) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-xl">No user data found.</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Profile Picture */}
                        <div className="relative">
                            {user.profilePic ? (
                                <img
                                    src={`http://localhost:8089${user.profilePic}`}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full object-cover shadow-lg"
                                />
                            ) : (
                                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                                    {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                                </div>
                            )}
                            {editMode && (
                                <div className="absolute -bottom-2 -right-2">
                                    <label className="bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition">
                                        📷
                                        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                                    </label>
                                </div>
                            )}
                        </div>

                        {/* User Info */}
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">{user.name}</h1>
                            <p className="text-gray-600 text-lg mb-4">{user.email}</p>
                            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                                    Member since {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                                </div>
                                {user.isAdmin && (
                                    <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                                        👑 Admin
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            {!editMode ? (
                                <button
                                    onClick={() => setEditMode(true)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow transition"
                                >
                                    ✏️ Edit Profile
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleUpdateProfile}
                                        disabled={updating || !profilePic}
                                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow transition disabled:opacity-50"
                                    >
                                        {updating ? 'Saving...' : '💾 Save Changes'}
                                    </button>
                                    <button
                                        onClick={() => setEditMode(false)}
                                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold shadow transition"
                                    >
                                        ❌ Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {success && (
                        <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded-lg text-green-700">
                            ✅ {success}
                        </div>
                    )}
                    {error && (
                        <div className="mt-4 p-4 bg-red-100 border border-red-400 rounded-lg text-red-700">
                            ❌ {error}
                        </div>
                    )}
                </div>

                {/* Tab Navigation */}
                <div className="bg-white rounded-2xl shadow-lg mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-8">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'profile'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                👤 Profile
                            </button>
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'orders'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                📦 Orders
                            </button>
                            <button
                                onClick={() => setActiveTab('settings')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'settings'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                ⚙️ Settings
                            </button>
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="p-8">
                        {activeTab === 'profile' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-gray-50 p-6 rounded-lg">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">Full Name</label>
                                                <p className="text-gray-800">{user.name}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">Email Address</label>
                                                <p className="text-gray-800">{user.email}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">Account Type</label>
                                                <p className="text-gray-800">{user.isAdmin ? 'Administrator' : 'Customer'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-6 rounded-lg">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Statistics</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Member Since</span>
                                                <span className="font-medium">{new Date(user.createdAt || Date.now()).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Last Updated</span>
                                                <span className="font-medium">{new Date(user.updatedAt || Date.now()).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Account Status</span>
                                                <span className="text-green-600 font-medium">Active</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'orders' && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-semibold text-gray-800">Order History</h3>
                                    <button
                                        onClick={fetchOrders}
                                        disabled={ordersLoading}
                                        className="text-blue-500 hover:text-blue-700 text-sm font-medium disabled:opacity-50"
                                    >
                                        {ordersLoading ? 'Loading...' : 'Refresh'}
                                    </button>
                                </div>

                                {ordersLoading ? (
                                    <div className="text-center py-12">
                                        <div className="text-xl">Loading orders...</div>
                                    </div>
                                ) : orders.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="text-6xl mb-4">📦</div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Orders Yet</h3>
                                        <p className="text-gray-600">Your order history will appear here once you make purchases.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {orders.map((order) => (
                                            <div key={order._id} className="bg-gray-50 rounded-lg p-6">
                                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                                    <div>
                                                        <h4 className="font-semibold text-gray-800">Order #{order._id.slice(-8)}</h4>
                                                        <p className="text-sm text-gray-600">
                                                            {new Date(order.createdAt).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-4 mt-2 md:mt-0">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' :
                                                                order.orderStatus === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                                                    order.orderStatus === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                                                                        'bg-gray-100 text-gray-800'
                                                            }`}>
                                                            {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                                                        </span>
                                                        <span className="font-semibold text-green-600">
                                                            ${order.totalPrice}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    {order.orderItems.map((item, index) => (
                                                        <div key={index} className="flex items-center gap-3 bg-white p-3 rounded">
                                                            {item.product && item.product.image && (
                                                                <img
                                                                    src={`http://localhost:8089${item.product.image}`}
                                                                    alt={item.product.title}
                                                                    className="w-12 h-12 object-cover rounded"
                                                                    onError={(e) => {
                                                                        e.target.src = '/logo192.png';
                                                                        e.target.onerror = null;
                                                                    }}
                                                                />
                                                            )}
                                                            <div className="flex-1">
                                                                <p className="font-medium text-gray-800">
                                                                    {item.product ? item.product.title : 'Product not found'}
                                                                </p>
                                                                <p className="text-sm text-gray-600">
                                                                    Quantity: {item.qty}
                                                                </p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="font-medium text-gray-800">
                                                                    ${item.product ? (item.product.price * item.qty).toFixed(2) : '0.00'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="mt-4 pt-4 border-t border-gray-200">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                        <div>
                                                            <p className="text-gray-600">Shipping Address:</p>
                                                            <p className="text-gray-800">{order.shippingAddress}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-600">Payment Method:</p>
                                                            <p className="text-gray-800">{order.paymentMethod}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="space-y-6">
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Settings</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-medium text-gray-800">Email Notifications</h4>
                                                <p className="text-sm text-gray-600">Receive updates about orders and promotions</p>
                                            </div>
                                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">
                                                Enable
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-medium text-gray-800">Two-Factor Authentication</h4>
                                                <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                                            </div>
                                            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm">
                                                Setup
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
