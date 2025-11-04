// src/pages/Dashboard.js
import React from 'react';
import HeroSection from './components/DashboardComponents/HeroSection.jsx';
import CategoryBanners from './components/DashboardComponents/CategoryBanners.jsx';
import ProductSection from './components/DashboardComponents/ProductSection.jsx';
import DailyBestSells from './components/DashboardComponents/DailyBestSells.jsx';
import TabbedProducts from './components/DashboardComponents/TabbedProducts.jsx';
import NewsletterBanner from './components/DashboardComponents/NewsletterBanner.jsx';
import FeaturesBanner from './components/DashboardComponents/FeaturesBanner.jsx';

// Import mock data
import {
  popularProducts,
  dealsOfTheDay,
  dailyBestSells,
  topSelling,
} from '../mockData.js';
import DealsOfTheDay from './components/DashboardComponents/DealsOfTheDay.jsx';

function Dashboard() {
  return (
    // Main container with max-width, centered, and padding
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <HeroSection />
      <CategoryBanners />
      <ProductSection
        title="Popular Products"
        categories={[
          'All',
          'Milks & Dairies',
          'Coffees & Teas',
          'Pet Foods',
          'Meats',
          'Vegetables',
          'Fruits',
        ]}
        products={popularProducts}
      />
      <DailyBestSells products={dailyBestSells} />
      <DealsOfTheDay products={dealsOfTheDay} />
      <TabbedProducts />
      <NewsletterBanner />
      <FeaturesBanner />
    </main>
  );
}

export default Dashboard;
