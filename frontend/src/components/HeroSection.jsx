import React from 'react';

const HeroSection = () => (
    <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Welcome to ShopEase</h1>
        <p className="text-lg md:text-2xl mb-8">Discover the best products at unbeatable prices!</p>
        <a href="#featured" className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow hover:bg-blue-100 transition">Shop Now</a>
    </section>
);

export default HeroSection; 