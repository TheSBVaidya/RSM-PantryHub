// src/components/DealsOfTheDay.jsx
import React from 'react';
import DealCard from './DealCard.jsx'; // Import the new card

function DealsOfTheDay({ products }) {
  return (
    <section className="my-8">
      {/* --- SECTION HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Deals Of The Day</h2>
        <a
          href="#all"
          className="text-green-600 font-medium hover:text-green-700 mt-4 md:mt-0"
        >
          All Deals &gt;
        </a>
      </div>

      {/* --- PRODUCT GRID ---
          This grid uses the new DealCard component
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <DealCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default DealsOfTheDay;
