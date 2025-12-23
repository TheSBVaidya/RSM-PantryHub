// src/components/DashboardComponents/ProductCard.jsx
import React from 'react';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  // Calculate discount percentage if oldPrice exists
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <div
      onClick={handleCardClick}
      className="group relative w-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all duration-300 overflow-hidden"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.dealTag && (
          <span className="px-3 py-1 text-xs font-bold text-white bg-emerald-500 rounded-full shadow-sm">
            {product.dealTag}
          </span>
        )}
        {discount && (
          <span className="px-3 py-1 text-xs font-bold text-white bg-rose-500 rounded-full shadow-sm">
            {discount}%
          </span>
        )}
      </div>

      {/* Action Buttons (appear on hover) */}
      {/*<div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">*/}
      {/*  <button className="p-2 bg-white text-gray-600 rounded-full shadow-md hover:bg-emerald-50 hover:text-emerald-600 transition-colors">*/}
      {/*    <Heart size={18} />*/}
      {/*  </button>*/}
      {/*  <button className="p-2 bg-white text-gray-600 rounded-full shadow-md hover:bg-emerald-50 hover:text-emerald-600 transition-colors">*/}
      {/*    <Eye size={18} />*/}
      {/*  </button>*/}
      {/*</div>*/}

      {/* Product Image */}
      <div className="relative h-48 w-full bg-gray-50 overflow-hidden p-4">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1">{product.categoryName}</div>
        <h3 className="font-bold text-gray-800 text-base mb-1 truncate hover:text-emerald-600 cursor-pointer transition-colors">
          {product.name}
        </h3>

        {/* Rating & Stock */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < (product.avgRating || 4) ? 'currentColor' : 'none'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">
            ({product.reviewCount || 4} reviews)
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-medium">
            {product.unitOfMeasure}
          </span>
          <span
            className={`text-xs ${product.stockQuantity > 0 ? 'text-emerald-600' : 'text-red-500'}`}
          >
            {product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Footer: Price & Add Button */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-lg font-extrabold text-emerald-600">
              ₹{product.price}
            </span>
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                ₹{product.oldPrice}
              </span>
            )}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg font-semibold hover:bg-emerald-500 hover:text-white transition-all duration-300 active:scale-95">
            <ShoppingCart size={18} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
