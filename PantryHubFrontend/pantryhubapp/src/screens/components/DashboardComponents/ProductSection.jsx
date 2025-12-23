import React, { useState } from 'react';
import ProductCard from './ProductCard'; // Importing the component we made earlier

const ProductSection = ({ title, products }) => {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <section className="mb-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">{title}</h2>

        {/* Modern Tabs */}
        {/*<div className="flex flex-wrap gap-2">*/}
        {/*  {categories.map((cat) => (*/}
        {/*    <button*/}
        {/*      key={cat}*/}
        {/*      onClick={() => setActiveTab(cat)}*/}
        {/*      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${*/}
        {/*        activeTab === cat*/}
        {/*          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'*/}
        {/*          : 'bg-white text-gray-600 hover:bg-gray-100'*/}
        {/*      }`}*/}
        {/*    >*/}
        {/*      {cat}*/}
        {/*    </button>*/}
        {/*  ))}*/}
        {/*</div>*/}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
