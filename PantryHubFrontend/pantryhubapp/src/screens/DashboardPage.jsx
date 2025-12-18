// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';

// Components
import HeroSection from './components/DashboardComponents/HeroSection.jsx';
import CategoryBanners from './components/DashboardComponents/CategoryBanners.jsx';
import ProductSection from './components/DashboardComponents/ProductSection.jsx';
import FeaturesBanner from './components/DashboardComponents/FeaturesBanner.jsx';
import NewsletterBanner from './components/DashboardComponents/NewsletterBanner.jsx';
import { popularProducts, dailyBestSells } from '../mockData.js';
import { toast } from 'sonner';
import apiClient from '../api/axiosInstance.js'; // (Assume standard UI)

// Mock Data Import

function Dashboard() {
  const [products, setProducts] = useState(popularProducts);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await apiClient.get('/product');
      setProducts(response.data);
    } catch (err) {
      toast.error('Unable to fetch Products');
      console.log('Unable to fetch Products: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-800">
      {/* Main Content Container */}
      <main className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Hero Section */}
        <HeroSection />

        {/* Categories */}
        <CategoryBanners />

        {/* Popular Products */}
        <ProductSection
          title="Popular Products"
          categories={[
            'All',
            'Milks & Dairies',
            'Coffees & Teas',
            'Vegetables',
            'Fruits',
          ]}
          products={products}
        />

        {/* Daily Best Sells (Featured Area) */}
        <div className="py-8">
          <ProductSection
            title="Daily Best Sells"
            categories={['Top Rated', 'Trending', 'New Added']}
            products={dailyBestSells}
          />
        </div>

        {/* Deals of the Day (Optional - could use ProductCard grid) */}

        {/* Features / Trust Signals */}
        <FeaturesBanner />

        {/* Newsletter */}
        <div className="mt-8">
          <NewsletterBanner />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
