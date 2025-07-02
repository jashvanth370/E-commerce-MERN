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

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <SearchBar search={search} setSearch={setSearch} />
      <CategoriesSection />
      <PromoBanner />
      <FeaturedProducts products={filteredProducts} loading={loading} error={error} />
      <TestimonialsSection />
      <NewsletterSignup />
      <Footer />
    </div>
  );
};

export default Home;
