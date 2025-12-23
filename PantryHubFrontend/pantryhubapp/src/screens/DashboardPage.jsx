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
  const [selectedCategory, setSelectedCategory] = useState({
    id: null,
    name: 'All',
  });

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory.id]);

  const fetchProducts = async () => {
    try {
      const endpoint = selectedCategory.id
        ? `/product/getByCategory/${selectedCategory.id}`
        : '/product';
      const response = await apiClient.get(endpoint);
      setProducts(response.data);
    } catch (err) {
      toast.error('Unable to fetch Products');
      console.log('Unable to fetch Products: ', err);
    }
  };

  const handleCategorySelect = (id, name) => {
    console.log('Category Selected:', name, id);
    setSelectedCategory({ id, name });
  };

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-800">
      {/* Main Content Container */}
      <main className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Hero Section */}
        <HeroSection />

        {/* Categories */}
        <CategoryBanners onSelectedCategory={handleCategorySelect} />

        {/* Popular Products */}
        <ProductSection
          title={
            selectedCategory.id
              ? `Products in ${selectedCategory.name}`
              : 'Popular Products'
          }
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
