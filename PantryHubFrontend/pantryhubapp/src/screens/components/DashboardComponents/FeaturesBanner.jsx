// src/components/FeaturesBanner.js
import React from 'react';
// Import your icons (as components or image paths)
// import { ReactComponent as IconPrice } from './icons/price.svg';

const features = [
  {
    icon: '/images/icon-price.png',
    title: 'Best prices & offers',
    text: 'Orders $50 or more',
  },
  {
    icon: '/images/icon-delivery.png',
    title: 'Free delivery',
    text: '24/7 amazing services',
  },
  {
    icon: '/images/icon-deal.png',
    title: 'Great daily deal',
    text: 'When you sign up',
  },
  {
    icon: '/images/icon-assortment.png',
    title: 'Wide assortment',
    text: 'Mega Discounts',
  },
  {
    icon: '/images/icon-return.png',
    title: 'Easy returns',
    text: 'Within 30 days',
  },
];

function FeaturesBanner() {
  return (
    <section className="my-8 bg-gray-50 rounded-lg p-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-6 gap-x-4">
        {features.map((feature) => (
          <div className="flex items-center gap-4" key={feature.title}>
            <img src={feature.icon} alt="" className="w-12 h-12" />
            <div>
              <h4 className="font-bold text-gray-800 text-md">
                {feature.title}
              </h4>
              <p className="text-sm text-gray-600">{feature.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturesBanner;
