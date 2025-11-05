import React, { useState } from 'react';
import { FiTrash2, FiArrowLeft } from 'react-icons/fi';

// Mock data for cart items
const mockCartItems = [
  {
    id: 1,
    img: 'https://placehold.co/100x100/e2e8f0/64748b?text=Product+1',
    title: 'Fresh organic villa farm lemon',
    price: 28.85,
    quantity: 2,
  },
  {
    id: 2,
    img: 'https://placehold.co/100x100/e2e8f0/64748b?text=Product+2',
    title: 'Organic fresh vanilla farm watermelon',
    price: 48.85,
    quantity: 1,
  },
  {
    id: 3,
    img: 'https://placehold.co/100x100/e2e8f0/64748b?text=Product+3',
    title: 'Blue Diamond Almonds Lightly Salted',
    price: 23.85,
    quantity: 3,
  },
];

// This is the main cart page component
const CartPage = () => {
  const [cartItems, setCartItems] = useState(mockCartItems);

  // Helper to update quantity
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return; // Don't allow less than 1
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Helper to remove item
  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 0; // Assuming free shipping for now
  const total = subtotal + shipping;

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center bg-white p-12 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <button className="bg-green-600 text-white font-bold py-3 px-6 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2 mx-auto">
            <FiArrowLeft className="w-5 h-5" />
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- Cart Items (Left Side) --- */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{item.title}</h3>
                          <p className="ml-4">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-md"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={item.quantity}
                            readOnly
                            className="w-12 text-center border-none focus:ring-0"
                          />
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-md"
                          >
                            +
                          </button>
                        </div>

                        <div className="flex">
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="font-medium text-red-600 hover:text-red-500 flex items-center gap-1"
                          >
                            <FiTrash2 className="w-4 h-4" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* --- Cart Summary (Right Side) --- */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-3">
                Cart Summary
              </h2>

              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-medium text-green-600">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="border-t pt-4 flex justify-between text-xl font-bold text-gray-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-md hover:bg-green-700 transition-colors">
                Proceed to Checkout
              </button>

              <button className="w-full bg-gray-100 text-green-700 font-bold py-3 px-6 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                <FiArrowLeft className="w-5 h-5" />
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
