// src/components/CategoryBanners.js
import React from 'react';

function CategoryBanner({ title, bgClass, btnClass, image }) {
  return (
    <div
      className={`rounded-lg p-6 min-h-[200px] flex flex-col justify-between bg-no-repeat bg-right ${bgClass}`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <h3 className="text-xl md:text-2xl font-bold text-gray-800 max-w-[200px]">
        {title}
      </h3>
      <a
        href="#shop"
        className={`font-semibold py-2 px-5 rounded-md hover:opacity-90 w-fit ${btnClass}`}
      >
        Shop Now
      </a>
    </div>
  );
}

function CategoryBanners() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
      <CategoryBanner
        title="Everyday Fresh & Clean with Our Products"
        bgClass="bg-[#F0E8D5]"
        btnClass="bg-red-500 text-white"
        image="/images/banner-onions.png"
      />
      <CategoryBanner
        title="Make your Breakfast Healthy and Easy"
        bgClass="bg-[#F2E5E5]"
        btnClass="bg-red-500 text-white"
        image="/images/banner-drink.png"
      />
      <CategoryBanner
        title="The best Organic Products Online"
        bgClass="bg-[#E5ECF2]"
        btnClass="bg-red-500 text-white"
        image="/images/banner-veg.png"
      />
    </section>
  );
}

export default CategoryBanners;
