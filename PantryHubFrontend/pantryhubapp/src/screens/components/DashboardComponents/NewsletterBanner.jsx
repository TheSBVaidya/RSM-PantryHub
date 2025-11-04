// src/components/NewsletterBanner.js
import React from 'react';
import { FiSend } from 'react-icons/fi';

function NewsletterBanner() {
  return (
    <section
      className="my-8 bg-[#E6F7F2] rounded-2xl p-8 md:p-12 relative overflow-hidden flex items-center min-h-[300px]"
      style={{ backgroundImage: "url('/images/newsletter-bg-pattern.png')" }} // Your light green pattern
    >
      <div className="relative z-10 max-w-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Stay home & get your daily needs from our shop
        </h2>
        <p className="text-gray-600 mt-3 mb-6">
          Start You'r Daily Shopping with Nest Mart
        </p>
        <form className="flex w-full max-w-md bg-white rounded-full shadow-sm overflow-hidden p-1.5">
          <span className="flex items-center pl-4 text-gray-400">
            <FiSend className="w-5 h-5" />
          </span>
          <input
            type="email"
            placeholder="Your email address"
            className="flex-grow border-none focus:ring-0 px-4 py-3 text-gray-700 placeholder-gray-400"
          />
          <button
            type="submit"
            className="bg-red-500 text-white font-bold px-6 py-3 rounded-full hover:bg-red-600 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Delivery person image */}
      <img
        src="/images/newsletter-delivery-man.png"
        alt="Delivery"
        className="hidden lg:block absolute right-0 -bottom-8 w-1/3 z-0"
      />
      {/* Add your floating vegetable images here with position: absolute */}
    </section>
  );
}

export default NewsletterBanner;
