import React from 'react';

const PromoBanner = () => (
    <section className="max-w-7xl mx-auto py-6 px-4">
        <div className="bg-yellow-100 border-l-4 border-yellow-400 p-6 rounded-xl flex items-center justify-between">
            <div className="text-lg font-semibold text-yellow-800">🔥 Summer Sale! Up to 50% off selected items. Limited time only!</div>
            <a href="#featured" className="ml-6 px-5 py-2 bg-yellow-400 text-white rounded-lg font-bold shadow hover:bg-yellow-500 transition">Shop Deals</a>
        </div>
    </section>
);

export default PromoBanner; 