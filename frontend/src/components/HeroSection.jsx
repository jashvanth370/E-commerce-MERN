import React from 'react';

const HeroSection = () => (
    <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-20 px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black opacity-10">
            <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
            <div className="mb-8">
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                    Welcome to{' '}
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                        ShopEase
                    </span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
                    Discover amazing products at unbeatable prices. Shop smart, live better with our curated collection of premium items.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                    href="#featured"
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg"
                >
                    🛍️ Shop Now
                </a>
                <a
                    href="#categories"
                    className="bg-white bg-opacity-20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-full border border-white border-opacity-30 hover:bg-opacity-30 transition-all duration-300 text-lg"
                >
                    Browse Categories
                </a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-blue-100">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">🚚</span>
                    <span className="text-sm">Free Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-2xl">🛡️</span>
                    <span className="text-sm">Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-2xl">⭐</span>
                    <span className="text-sm">Premium Quality</span>
                </div>
            </div>
        </div>
    </section>
);

export default HeroSection; 