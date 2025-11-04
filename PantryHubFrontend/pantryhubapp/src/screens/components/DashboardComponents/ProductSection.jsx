// src/components/ProductSection.js
import React from 'react';
import ProductCard from './ProductCard.jsx';

function ProductSection({ title, categories, showAllLink, products }) {
  return (
    <section className="my-8">
      {/* --- SECTION HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">{title}</h2>

        {/* --- TABS --- */}
        {categories && (
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 md:mt-0">
            {categories.map((cat) => (
              <a
                href={`#${cat}`}
                key={cat}
                className="text-gray-600 hover:text-green-600 font-medium"
              >
                {cat}
              </a>
            ))}
          </div>
        )}

        {/* --- ALL DEALS LINK --- */}
        {showAllLink && (
          <a
            href="#all"
            className="text-green-600 font-medium hover:text-green-700 mt-4 md:mt-0"
          >
            All Deals &gt;
          </a>
        )}
      </div>

      {/* --- PRODUCT GRID --- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductSection;
