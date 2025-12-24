import React, { use, useEffect, useState } from 'react';
import { FiTrash2, FiShoppingCart, FiAlertCircle } from 'react-icons/fi';
// import apiClient from '../api/axiosInstance.js'; // Commented out API client
import { SpinIcon } from './components/Icons.jsx';
import apiClient from '../api/axiosInstance.js';
import { toast } from 'sonner';

// --- Reusable Wishlist Card Component ---
const WishlistCard = ({ item, onRemove, onAddToCart }) => {
  const {
    id,
    name,
    price,
    oldPrice,
    imageUrl,
    stockQuantity,
    dealTag,
    rating,
    reviewCount,
  } = item;

  // Determine availability based on stockQuantity
  const isAvailable = stockQuantity > 0;

  // Calculate discount percentage if oldPrice exists
  const discount = oldPrice
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 relative group overflow-hidden flex flex-col">
      {/* --- Image & Badges --- */}
      <div className="relative h-48 w-full bg-gray-50 flex items-center justify-center p-4">
        {/* Deal Tag Badge */}
        {dealTag && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10 shadow-sm">
            {dealTag}
          </span>
        )}

        {/* Discount Badge */}
        {discount > 0 && !dealTag && (
          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded z-10 shadow-sm">
            -{discount}%
          </span>
        )}

        {/* Remove Button (Visible on Hover) */}
        <button
          onClick={() => onRemove(id)}
          className="absolute top-3 right-3 p-2 bg-white text-gray-400 hover:text-red-500 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
          title="Remove from Wishlist"
        >
          <FiTrash2 className="w-4 h-4" />
        </button>

        <img
          src={imageUrl}
          alt={name}
          className={`max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105 ${!isAvailable ? 'opacity-50 grayscale' : ''}`}
        />

        {/* Out of Stock Overlay */}
        {!isAvailable && (
          <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center">
            <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* --- Content --- */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Category (Optional) */}
        {item.categoryName && (
          <span className="text-xs text-gray-500 mb-1">
            {item.categoryName}
          </span>
        )}

        <h3
          className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[2.5rem]"
          title={name}
        >
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400 text-xs">
            {'★'.repeat(Math.round(rating || 0))}
            <span className="text-gray-300">
              {'★'.repeat(5 - Math.round(rating || 0))}
            </span>
          </div>
          <span className="text-xs text-gray-400 ml-1">({reviewCount})</span>
        </div>

        {/* Price & Stock Status */}
        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-green-600">
              ${price.toFixed(2)}
            </span>
            {oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-medium flex items-center gap-1 ${isAvailable ? 'text-green-600' : 'text-red-500'}`}
            >
              {isAvailable ? (
                'In Stock'
              ) : (
                <>
                  <FiAlertCircle className="w-3 h-3" /> Out of Stock
                </>
              )}
            </span>

            <button
              onClick={() => onAddToCart(item)}
              disabled={!isAvailable}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                isAvailable
                  ? 'bg-green-600 text-white hover:bg-green-700 shadow-sm hover:shadow'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <FiShoppingCart className="w-4 h-4" />
              {isAvailable ? 'Add' : 'Sold Out'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
const WishlistPage = ({ user }) => {
  // Initialize with sample data
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false); // No loading initially as data is hardcoded

  useEffect(() => {
    if (user?.id) fetchWishlist();
  }, [user]); // Re-run if user changes (e.g. login completes)

  const fetchWishlist = async () => {
    setLoading(true);
    const userId = user.id;
    // console.log(userId);
    try {
      const response = await apiClient.get(`wishlist/get-wishlist/${userId}`);
      setWishlistItems(response.data);
    } catch (err) {
      console.log('Wishlist is not responding: ', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      const response = await apiClient.delete(
        `wishlist/remove/${user.id}/${id}`
      );
      toast.success(response.data);
    } catch (err) {
      toast.error('Failed to remove item', err);
    }
    // Just update local state for UI demo
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddToCart = (item) => {
    alert(`${item.name} added to cart! (Demo Only)`);
    // Optional: Remove from wishlist after adding
    // handleRemoveItem(item.id);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <SpinIcon />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-500 mt-1">
              {wishlistItems.length}{' '}
              {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
            </p>
          </div>
        </div>

        {wishlistItems.length === 0 ? (
          // --- Empty State ---
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-dashed border-gray-200">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
              <FiShoppingCart className="w-10 h-10 text-green-500 opacity-50" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 mb-8 max-w-md text-center">
              Explore our fresh products and save your favorites here for easier
              access later!
            </p>
            <a
              href="/dashboard" // Or navigate to dashboard
              className="bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 transition-transform transform hover:scale-105 shadow-lg shadow-green-200"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          // --- Wishlist Grid ---
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <WishlistCard
                key={item.id}
                item={item}
                onRemove={handleRemoveItem}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
