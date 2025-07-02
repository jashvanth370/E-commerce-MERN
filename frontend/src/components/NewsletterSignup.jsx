import React from 'react';

const NewsletterSignup = () => (
    <section className="bg-gradient-to-r from-blue-100 to-purple-100 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Subscribe to our Newsletter</h2>
            <p className="text-gray-600 mb-6">Get the latest updates, offers, and new arrivals straight to your inbox.</p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center">
                <input type="email" placeholder="Enter your email" className="px-5 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg shadow w-full sm:w-auto" />
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow transition">Subscribe</button>
            </form>
        </div>
    </section>
);

export default NewsletterSignup; 