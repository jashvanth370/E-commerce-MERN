import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getProfile } from '../service/userApi';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Replace with your actual API endpoint and auth method
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await getProfile();
                setUser(res.data.user);
            } catch (err) {
                setError('Failed to fetch user info');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!user) return <div>No user data found.</div>;

    return (
        <div className="max-w-lg mx-auto mt-12 p-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl shadow-lg flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-blue-300 flex items-center justify-center text-4xl font-bold text-white mb-4 shadow-md">
                {user.name ? user.name.charAt(0).toUpperCase() : '?'}
            </div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-2">{user.name}</h2>
            <div className="text-gray-600 mb-6">{user.email}</div>
            <div className="w-full border-t border-gray-200 my-4"></div>
            {/* Add more user fields as needed */}
            <button className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition">
                Edit Profile
            </button>
        </div>
    );
};

export default ProfilePage;
