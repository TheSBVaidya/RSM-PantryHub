import React from 'react';
import { ArrowRight, Search, Star, Clock, ShieldCheck } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative w-full rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50 mb-16 shadow-lg shadow-emerald-100/50 border border-emerald-100/50">
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-12 py-16 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content Column */}
          <div className="space-y-8 max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-full shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-sm font-bold text-emerald-800 tracking-wide uppercase">
                Now Delivering in Your Area
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
              Groceries <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                Made Simple.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-lg">
              Experience the freshest farm-to-table produce delivered to your
              doorstep in minutes. Quality you can taste, service you can trust.
            </p>

            {/* Search Bar & Action */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
              <div className="relative flex-grow group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm hover:shadow-md"
                  placeholder="Search for 'Milk', 'Fruits'..."
                />
              </div>
              <button className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 whitespace-nowrap">
                Shop Now <ArrowRight size={20} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 pt-4 text-sm font-medium text-gray-500">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-100 rounded-full text-emerald-600">
                  <Clock size={16} />
                </div>
                <span>10 Min Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-100 rounded-full text-emerald-600">
                  <ShieldCheck size={16} />
                </div>
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>

          {/* Right Image Column (Floating Composition) */}
          <div className="relative hidden lg:block">
            {/* Main Image Container */}
            <div className="relative z-10 w-full h-[500px] rounded-[3rem] overflow-hidden shadow-2xl shadow-emerald-900/10 border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500 ease-out">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
                alt="Fresh Grocery Bag"
                className="w-full h-full object-cover scale-110"
              />
              {/* Overlay Gradient for Text readability if needed */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating Info Card 1 */}
            <div className="absolute -left-12 bottom-20 z-20 bg-white p-4 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center gap-3 animate-bounce-slow">
              <div className="bg-orange-100 p-2 rounded-xl text-orange-500">
                <Star size={24} fill="currentColor" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                  Top Rated
                </p>
                <p className="text-gray-800 font-bold">4.9/5 Stars</p>
              </div>
            </div>

            {/* Floating Info Card 2 */}
            <div className="absolute -right-8 top-12 z-20 bg-white p-4 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center gap-3">
              <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600">
                <span className="font-bold text-lg">30%</span>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                  Special Offer
                </p>
                <p className="text-gray-800 font-bold">On First Order</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
