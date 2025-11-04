// src/components/HeroSection.js
import React from 'react';

function HeroSection() {
  return (
    // You should add your background image URL here
    <section
      className="bg-gray-100 rounded-2xl p-8 md:p-16 relative overflow-hidden my-8 bg-no-repeat bg-right-bottom"
      style={{ backgroundImage: "url('/images/hero-bg-pattern.png')" }} // Example
    >
      <div className="max-w-md relative z-10">
        <div className="flex gap-2 mb-4">
          <span className="bg-white text-gray-700 text-sm px-4 py-1 rounded-full shadow-sm">
            Healthy
          </span>
          <span className="bg-white text-gray-700 text-sm px-4 py-1 rounded-full shadow-sm">
            Easy
          </span>
          <span className="bg-white text-gray-700 text-sm px-4 py-1 rounded-full shadow-sm">
            New
          </span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
          The best way to stuff your wallet.
        </h1>
        <a
          href="#shop"
          className="bg-green-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-green-700 transition-colors"
        >
          Shop Now
        </a>
      </div>
      {/* Add your floating lettuce/eggs images with position: absolute */}
      <img
        src="/images/hero-lettuce.png"
        alt="Lettuce"
        className="hidden md:block absolute right-0 top-0 w-1/3 z-0"
      />
    </section>
  );
}

export default HeroSection;
