import React from 'react';

const categories = [
    { name: 'Electronics', icon: '💻' },
    { name: 'Fashion', icon: '👗' },
    { name: 'Home', icon: '🏠' },
    { name: 'Beauty', icon: '💄' },
    { name: 'Sports', icon: '🏀' },
    { name: 'Toys', icon: '🧸' },
];

const CategoriesSection = () => (
    <section id="categories" className="max-w-7xl mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
            {categories.map(cat => (
                <div key={cat.name} className="flex flex-col items-center bg-white rounded-xl shadow p-4 hover:shadow-lg transition cursor-pointer">
                    <span className="text-4xl mb-2">{cat.icon}</span>
                    <span className="font-semibold text-gray-700">{cat.name}</span>
                </div>
            ))}
        </div>
    </section>
);

export default CategoriesSection; 