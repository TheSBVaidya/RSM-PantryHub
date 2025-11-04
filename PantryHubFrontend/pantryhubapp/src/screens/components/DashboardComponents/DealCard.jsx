// src/components/DealCard.jsx
import React from 'react';
import { FiStar, FiShoppingCart } from 'react-icons/fi';

function DealCard({ product }) {
  return (
    // Main container with shadow, rounded corners, and white background
    <div className="rounded-lg shadow-md bg-white overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* --- IMAGE CONTAINER ---
          This container has the light pink background from your example.
          I used 'bg-red-50' from Tailwind, but you can change it to '#FFF2F2'
          in your tailwind.config.js if you want that exact color.
      */}
      <div className="w-full h-48 bg-red-50 flex items-center justify-center p-4 overflow-hidden">
        <img
          src={product.img}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* --- CARD BODY --- */}
      <div className="p-4 flex flex-col flex-grow">
        {/* --- TITLE --- */}
        <h3 className="text-md font-semibold text-gray-800 h-12 mb-2 overflow-hidden">
          {product.title}
        </h3>

        {/* --- RATING --- */}
        <div className="flex items-center text-sm text-gray-500 mb-1">
          <FiStar className="text-yellow-400 fill-current" />
          <span className="ml-1">({product.rating})</span>
        </div>

        {/* --- AUTHOR --- */}
        <div className="text-sm text-gray-600 mb-4">
          By{' '}
          <span className="text-green-600 font-medium">{product.author}</span>
        </div>

        {/* --- FOOTER: PRICE & ADD BUTTON ---
            Using 'mt-auto' to push this to the bottom of the card
        */}
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-green-600">
              ${product.price}
            </span>
            {product.oldPrice && (
              <del className="text-sm text-gray-400">${product.oldPrice}</del>
            )}
          </div>
          <button className="bg-red-500 text-white font-bold py-2 px-5 rounded-md hover:bg-red-600 flex items-center gap-1.5 transition-colors">
            <FiShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default DealCard;
