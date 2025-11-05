import React, { useState } from 'react';
import { FiShoppingCart, FiTrash2 } from 'react-icons/fi';

const initialWishlistData = [
  {
    id: 1,
    title: 'Fresh organic villa farm lemon',
    price: 28.85,
    img: '/images/product-1.png',
    inStock: true,
  },
  {
    id: 2,
    title: 'Best snakes with hazel nut pack',
    price: 52.85,
    img: '/images/product-2.png',
    inStock: true,
  },
  {
    id: 3,
    title: 'Organic fresh vanilla farm watermelon',
    price: 48.85,
    img: '/images/product-3.png',
    inStock: false,
  },
];

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistData);

  const handleRemoveItem = (id) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // In a real app, this would trigger a cart context/API call
  const handleAddToCart = (item) => {
    alert(`${item.title} added to cart!`);
    // Optionally remove from wishlist after adding to cart
    handleRemoveItem(item.id);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-8">
      {/* Title is handled by Breadcrumb, but a local title is also good */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        // --- EMPTY WISHLIST ---
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Your Wishlist is Empty
          </h2>
          <p className="text-gray-600 mt-4 mb-6">
            Looks like you haven't added anything to your wishlist yet.
          </p>
          <a
            href="#" // You can later make this navigate to Dashboard
            className="bg-green-600 text-white font-bold py-3 px-6 rounded-md hover:bg-green-700 transition-colors"
          >
            Continue Shopping
          </a>
        </div>
      ) : (
        // --- WISHLIST TABLE ---
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full table-auto">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th
                  className="text-left font-semibold text-gray-600 p-4"
                  colSpan="2"
                >
                  Product
                </th>
                <th className="text-left font-semibold text-gray-600 p-4 hidden md:table-cell">
                  Price
                </th>
                <th className="text-left font-semibold text-gray-600 p-4 hidden md:table-cell">
                  Stock Status
                </th>
                <th className="text-left font-semibold text-gray-600 p-4">
                  Action
                </th>
                <th className="text-left font-semibold text-gray-600 p-4">
                  Remove
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {wishlistItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-20 h-20 object-contain rounded-md border border-gray-200"
                    />
                  </td>
                  <td className="p-4">
                    <p className="font-semibold text-gray-800">{item.title}</p>
                    {/* Price for mobile view */}
                    <p className="md:hidden text-gray-600 font-bold mt-1">
                      ${item.price}
                    </p>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <p className="font-bold text-gray-800">${item.price}</p>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.inStock
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {item.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.inStock}
                      className={`bg-green-600 text-white font-bold py-2 px-4 rounded-md text-sm transition-colors ${
                        !item.inStock
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:bg-green-700'
                      }`}
                    >
                      Add to Cart
                    </button>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-gray-500 hover:text-red-600 transition-colors"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
