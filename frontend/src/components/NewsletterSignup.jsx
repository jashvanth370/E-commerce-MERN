import React, { useState } from 'react';

const NewsletterSignup = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://localhost:8089/api/subscribers/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                setEmail('');
                setTimeout(() => setSuccess(false), 3000);
            } else {
                setError(data.message || 'Subscription failed');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative py-16 px-4 overflow-hidden">
            {/* Background with gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
            </div>

            {/* Floating elements */}
            <div className="absolute top-10 left-10 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="relative z-10 max-w-2xl mx-auto text-center">
                <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Stay Updated with{' '}
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                            ShopEase
                        </span>
                    </h2>
                    <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                        Get exclusive offers, new product alerts, and insider deals delivered straight to your inbox.
                        Join thousands of satisfied customers who never miss a great deal!
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 px-5 py-3 rounded-lg border-0 shadow-lg bg-white bg-opacity-95 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 text-lg placeholder-gray-500"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Subscribing...' : 'Subscribe'}
                    </button>
                </form>

                {success && (
                    <div className="mt-4 p-3 bg-green-500 bg-opacity-20 border border-green-400 rounded-lg text-green-100">
                         Successfully subscribed! Welcome to the ShopEase family.
                    </div>
                )}

                {error && (
                    <div className="mt-4 p-3 bg-red-500 bg-opacity-20 border border-red-400 rounded-lg text-red-100">
                        Error {error}
                    </div>
                )}

                <div className="mt-6 text-blue-100 text-sm">
                    <p>🔒 We respect your privacy. Unsubscribe at any time.</p>
                    <p>📧 Get updates 2-3 times per month</p>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSignup; 