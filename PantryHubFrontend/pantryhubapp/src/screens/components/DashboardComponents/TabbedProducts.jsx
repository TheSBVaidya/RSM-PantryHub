// src/components/TabbedProducts.js
import React from 'react';
import { FiStar } from 'react-icons/fi';
import { topSelling } from '../../../mockData.js';
// Import other data arrays (trendingProducts, recentlyAdded, topRated)

// This card is specific to this section
function ProductListCard({ product }) {
  return (
    <div className="flex items-center gap-4">
      <img
        src={product.img}
        alt={product.title}
        className="w-20 h-20 object-contain border border-gray-200 rounded-lg p-1"
      />
      <div>
        <h4 className="text-md font-semibold text-gray-800 hover:text-green-600 cursor-pointer">
          {product.title}
        </h4>
        <div className="flex items-center text-sm text-gray-500">
          <FiStar className="text-yellow-400 fill-current" />
          <span className="ml-1">({product.rating})</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-md font-bold text-green-600">
            ${product.price}
          </span>
          {product.oldPrice && (
            <del className="text-xs text-gray-400">${product.oldPrice}</del>
          )}
        </div>
      </div>
    </div>
  );
}

// This component renders one column
function ProductListColumn({ title, products }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">
        {title}
      </h3>
      <div className="flex flex-col gap-5">
        {products.map((product) => (
          <ProductListCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

function TabbedProducts() {
  return (
    <section className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
      <ProductListColumn title="Top Selling" products={topSelling} />
      <ProductListColumn title="Trending Products" products={topSelling} />{' '}
      {/* Replace with trendingProducts */}
      <ProductListColumn title="Recently added" products={topSelling} />{' '}
      {/* Replace with recentlyAdded */}
      <ProductListColumn title="Top Rated" products={topSelling} />{' '}
      {/* Replace with topRated */}
    </section>
  );
}

export default TabbedProducts;
