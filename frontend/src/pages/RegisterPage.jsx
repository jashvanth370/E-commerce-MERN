import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { register } from '../service/authApi';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setProfilePic(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            if (profilePic) formData.append('profilePic', profilePic);
            await register(formData);
            setSuccess(true);
            setTimeout(() => navigate('/login'), 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl border border-blue-100">
                <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700 tracking-tight">Create Account</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <input
                        type="text"
                        className="border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        placeholder="Full Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        className="border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        placeholder="Email Address"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    />
                    {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                    {success && <div className="text-green-600 text-sm text-center">Registration successful! Redirecting...</div>}
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold shadow transition">Register</button>
                </form>
                <div className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-600 hover:underline font-medium">Login</a>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
