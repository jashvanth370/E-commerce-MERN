import React from 'react';
import AddToCart from './AddToCart';
import BuyNow from './BuyNow';

const FeaturedProducts = ({ products, loading, error, selectedCategory }) => {
    // Filter products by selected category
    const filteredProducts = selectedCategory
        ? products.filter(product => product.category === selectedCategory)
        : products;

    const getImageUrl = (product) => {
        if (!product.image) return `${product.title}`;
        if (product.image.startsWith('http')) return product.image;
        return `http://localhost:8089${product.image}`;
    };

    return (
        <section id="featured" className="max-w-7xl mx-auto py-12 px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                {selectedCategory ? `${selectedCategory} Products` : 'Featured Products'}
            </h2>
            {loading ? (
                <div className="text-center text-lg">Loading...</div>
            ) : error ? (
                <div className="text-center text-red-500">{error}</div>
            ) : filteredProducts.length === 0 ? (
                <div className="text-center text-gray-500">
                    {selectedCategory ? `No products found in ${selectedCategory} category.` : 'No products available.'}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredProducts.slice(0, 8).map(product => (
                        <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                            <img
                                src={getImageUrl(product)}
                                alt={product.title}
                                className="w-full h-48 object-cover"
                                onError={(e) => {
                                    e.target.src = '/logo192.png';
                                    e.target.onerror = null;
                                }}
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                                <div className="h-12 mb-2 overflow-hidden">
                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                                        {product.description}
                                    </p>
                                </div>
                                <div className="text-lg font-bold text-blue-600 mb-2">${product.price}</div>
                                <BuyNow product={product} />
                                <AddToCart product={product} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default FeaturedProducts; 