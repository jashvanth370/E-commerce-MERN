import React from 'react';

const categories = [
    { name: 'Electronics', icon: '💻' },
    { name: 'Fashion', icon: '👗' },
    { name: 'Home', icon: '🏠' },
    { name: 'Beauty', icon: '💄' },
    { name: 'Sports', icon: '🏀' },
    { name: 'Toys & Games', icon: '🧸' },
];

const CategoriesSection = ({ selectedCategory, onCategoryClick }) => (
    <section id="categories" className="max-w-7xl mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
            {categories.map(cat => (
                <div
                    key={cat.name}
                    className={`flex flex-col items-center rounded-xl shadow p-4 transition cursor-pointer ${selectedCategory === cat.name
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-white hover:shadow-lg hover:bg-blue-50'
                        }`}
                    onClick={() => onCategoryClick(cat.name)}
                >
                    <span className="text-4xl mb-2">{cat.icon}</span>
                    <span className="font-semibold">{cat.name}</span>
                </div>
            ))}
        </div>
    </section>
);

export default CategoriesSection; 