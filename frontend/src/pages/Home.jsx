import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../service/productApi';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import SearchBar from '../components/SearchBar';
import CategoriesSection from '../components/CategoriesSection';
import PromoBanner from '../components/PromoBanner';
import FeaturedProducts from '../components/FeaturedProducts';
import TestimonialsSection from '../components/TestimonialsSection';
import NewsletterSignup from '../components/NewsletterSignup';
import Footer from '../components/Footer';

const categories = [
  { name: 'Electronics', icon: '💻' },
  { name: 'Fashion', icon: '👗' },
  { name: 'Home', icon: '🏠' },
  { name: 'Beauty', icon: '💄' },
  { name: 'Sports', icon: '🏀' },
  { name: 'Toys', icon: '🧸' },
];

const testimonials = [
  { name: 'Alice', text: 'Great products and fast delivery!' },
  { name: 'Bob', text: 'Amazing customer service and quality.' },
  { name: 'Carol', text: 'My favorite place to shop online.' },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

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

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      // If clicking the same category, clear the filter
      setSelectedCategory('');
    } else {
      setSelectedCategory(category);
    }
  };

  const handleProductSelect = (product) => {
    // You can add navigation to product detail page here
    console.log('Selected product:', product);
    // For now, just clear the search
    setSearch('');
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section with Search Bar Overlay */}
      <section className="relative">
        <HeroSection />

        {/* Search Bar positioned at top left of hero */}
        <div className="absolute top-8 left-8 z-20 w-80">
          <SearchBar
            search={search}
            setSearch={setSearch}
            products={products}
            onProductSelect={handleProductSelect}
          />
        </div>
      </section>

      <CategoriesSection
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
      />
      {selectedCategory && (
        <div className="max-w-7xl mx-auto px-4 py-2">
          <button
            onClick={() => setSelectedCategory('')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Show All Products
          </button>
        </div>
      )}
      <PromoBanner />
      <FeaturedProducts
        products={filteredProducts}
        loading={loading}
        error={error}
        selectedCategory={selectedCategory}
      />
      <TestimonialsSection />
      <NewsletterSignup />
      <Footer />
    </div>
  );
};

export default Home;
