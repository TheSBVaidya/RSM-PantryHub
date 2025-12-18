import React from 'react';
import { Truck, ShieldCheck, Clock, Headphones } from 'lucide-react';

const FeaturesBanner = () => {
  const features = [
    {
      icon: <Clock size={32} />,
      title: '10 Minute Delivery',
      desc: 'Guaranteed fast delivery',
    },
    {
      icon: <Truck size={32} />,
      title: 'Free Shipping',
      desc: 'On orders over ₹499',
    },
    {
      icon: <ShieldCheck size={32} />,
      title: 'Secure Payment',
      desc: '100% safe transactions',
    },
    {
      icon: <Headphones size={32} />,
      title: '24/7 Support',
      desc: 'Dedicated support team',
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 py-10 px-6 bg-emerald-600 rounded-3xl text-white shadow-xl shadow-emerald-100">
      {features.map((item, idx) => (
        <div key={idx} className="flex items-center gap-4 p-2">
          <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
            {item.icon}
          </div>
          <div>
            <h4 className="font-bold text-lg">{item.title}</h4>
            <p className="text-emerald-100 text-sm">{item.desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FeaturesBanner;
