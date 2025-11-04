// src/components/ProductCard.js
import React from 'react';
import { FiStar, FiShoppingCart } from 'react-icons/fi'; // Using react-icons

// Function to dynamically set tag color
const getTagClasses = (tag) => {
  if (!tag) return 'hidden';
  if (tag.toLowerCase() === 'sale') return 'bg-blue-500 text-white';
  if (tag.toLowerCase() === 'new') return 'bg-green-500 text-white';
  if (tag.includes('%')) return 'bg-red-500 text-white';
  return 'bg-red-600 text-white'; // Default for 'Hot'
};

function ProductCard({ product }) {
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm bg-white relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* --- TAG --- */}
      <div
        className={`absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded ${getTagClasses(product.tag)}`}
      >
        {product.tag}
      </div>

      {/* --- IMAGE --- */}
      <div className="w-full h-48 flex items-center justify-center p-4">
        <img
          src={product.img}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="p-4">
        {/* --- CATEGORY & TITLE --- */}
        <span className="text-xs text-gray-500">{product.category}</span>
        <h3 className="text-md font-semibold text-gray-800 h-12 overflow-hidden mb-1">
          {product.title}
        </h3>

        {/* --- RATING --- */}
        <div className="flex items-center text-sm text-gray-500 mb-1">
          <FiStar className="text-yellow-400 fill-current" />
          <span className="ml-1">({product.rating})</span>
        </div>

        {/* --- AUTHOR --- */}
        <div className="text-sm text-gray-600 mb-2">
          By{' '}
          <span className="text-green-600 font-medium">{product.author}</span>
        </div>

        {/* --- FOOTER: PRICE & ADD BUTTON --- */}
        <div className="flex justify-between items-center">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-green-600">
              ${product.price}
            </span>
            {product.oldPrice && (
              <del className="text-sm text-gray-400">${product.oldPrice}</del>
            )}
          </div>
          <button className="bg-green-100 text-green-700 font-bold py-2 px-4 rounded-md hover:bg-green-200 flex items-center gap-1 transition-colors">
            <FiShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
