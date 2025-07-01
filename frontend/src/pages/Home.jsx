import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../service/productApi';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        setProducts(res.products);
      } catch (err) {
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Welcome to ShopEase</h1>
        <p className="text-lg md:text-2xl mb-8">Discover the best products at unbeatable prices!</p>
        <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow hover:bg-blue-100 transition">Shop Now</button>
      </section>

      {/* Auth Links */}
      <section className="max-w-7xl mx-auto py-6 px-4 flex justify-end gap-4">
        <a href="/login" className="px-5 py-2 bg-blue-500 text-white rounded-lg font-semibold shadow hover:bg-blue-600 transition">Login</a>
        <a href="/register" className="px-5 py-2 bg-white text-blue-600 border border-blue-500 rounded-lg font-semibold shadow hover:bg-blue-50 transition">Register</a>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Products</h2>
        {loading ? (
          <div className="text-center text-lg">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.slice(0, 8).map(product => (
              <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                <img src={`http://localhost:8089/${product.image}` || '/logo192.png'} alt={product.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                  <p className="text-gray-600 mb-2">{product.description.slice(0, 60)}...</p>
                  <div className="text-lg font-bold text-blue-600 mb-2">${product.price}</div>
                  <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">View Details</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
