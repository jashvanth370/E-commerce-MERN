import React, { useState, useEffect, useRef } from 'react';

const SearchBar = ({ search, setSearch, products, onProductSelect }) => {
    const [showResults, setShowResults] = useState(false);
    const [filteredResults, setFilteredResults] = useState([]);
    const searchRef = useRef(null);

    const getImageUrl = (product) => {
        if (!product.image) return '/logo192.png';
        if (product.image.startsWith('http')) return product.image;
        return `http://localhost:8089${product.image}`;
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (search.trim() === '') {
            setFilteredResults([]);
            setShowResults(false);
            return;
        }

        const results = products.filter(product =>
            product.title.toLowerCase().includes(search.toLowerCase()) ||
            product.category.toLowerCase().includes(search.toLowerCase())
        ).slice(0, 5); // Show max 5 results

        setFilteredResults(results);
        setShowResults(results.length > 0);
    }, [search, products]);

    const handleProductClick = (product) => {
        onProductSelect?.(product);
        setShowResults(false);
        setSearch('');
    };

    return (
        <section className="relative" ref={searchRef}>
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search for products or categories..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onFocus={() => search.trim() !== '' && setShowResults(true)}
                    className="w-full px-5 py-4 rounded-xl border-0 shadow-lg bg-white bg-opacity-95 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg placeholder-gray-500"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🔍
                </div>
            </div>

            {showResults && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto">
                    {filteredResults.map(product => (
                        <div
                            key={product._id}
                            onClick={() => handleProductClick(product)}
                            className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        >
                            <img
                                src={getImageUrl(product)}
                                alt={product.title}
                                className="w-12 h-12 object-cover rounded mr-3"
                                onError={(e) => {
                                    e.target.src = '/logo192.png';
                                    e.target.onerror = null;
                                }}
                            />
                            <div className="flex-1">
                                <div className="font-semibold text-gray-800">{product.title}</div>
                                <div className="text-sm text-gray-500">{product.category}</div>
                            </div>
                            <div className="text-lg font-bold text-blue-600">${product.price}</div>
                        </div>
                    ))}
                    {filteredResults.length === 0 && search.trim() !== '' && (
                        <div className="p-3 text-gray-500 text-center">
                            No products found for "{search}"
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

export default SearchBar; 