import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const res = await axios.post('http://localhost:8089/api/auth/login', { email, password });
            localStorage.setItem('token', res.token);
            navigate('/profile');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="email"
                    className="border rounded px-3 py-2"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="border rounded px-3 py-2"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition">Login</button>
            </form>
            <div className="mt-4 text-center text-sm">
                Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
            </div>
        </div>
    );
};

export default LoginPage;
