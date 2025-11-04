// src/components/DailyBestSells.js
import React from 'react';
import { FiStar } from 'react-icons/fi';

// This card is specific to this section
function BestSellCard({ product }) {
  const progressPercent = (product.sold / product.total) * 100;

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm bg-white relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* --- TAG --- */}
      <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
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
        <span className="text-xs text-gray-500">{product.category}</span>
        <h3 className="text-md font-semibold text-gray-800 h-12 overflow-hidden mb-1">
          {product.title}
        </h3>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <FiStar className="text-yellow-400 fill-current" />
          <span className="ml-1">({product.rating})</span>
        </div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-lg font-bold text-green-600">
            ${product.price}
          </span>
          {product.oldPrice && (
            <del className="text-sm text-gray-400">${product.oldPrice}</del>
          )}
        </div>

        {/* --- PROGRESS BAR --- */}
        <div className="w-full bg-gray-200 rounded-full h-2 my-2">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-500 mb-3">
          Sold: {product.sold}/{product.total}
        </div>

        <button className="w-full bg-green-600 text-white font-bold py-3 rounded-md hover:bg-green-700 transition-colors">
          Add To Cart
        </button>
      </div>
    </div>
  );
}

function DailyBestSells({ products }) {
  return (
    <section className="my-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* --- PROMO BANNER --- */}
      <div
        className="lg:col-span-1 bg-gray-800 text-white rounded-lg p-8 flex flex-col justify-center bg-cover bg-center min-h-[300px] lg:min-h-0"
        style={{ backgroundImage: "url('/images/best-sell-banner.png')" }} // Your dark wood banner
      >
        <h2 className="text-3xl font-bold mb-4">Bring nature into your home</h2>
        <a
          href="#shop"
          className="bg-red-500 text-white font-semibold py-2 px-5 rounded-md hover:bg-red-600 w-fit"
        >
          Shop Now
        </a>
      </div>

      {/* --- PRODUCTS GRID --- */}
      <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <BestSellCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default DailyBestSells;
