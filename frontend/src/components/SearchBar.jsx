import React from 'react';

const SearchBar = ({ search, setSearch }) => (
    <section className="max-w-2xl mx-auto py-6 px-4">
        <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full px-5 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg shadow"
        />
    </section>
);

export default SearchBar; 