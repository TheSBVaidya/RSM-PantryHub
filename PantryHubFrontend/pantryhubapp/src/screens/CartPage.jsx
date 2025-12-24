import React, { useEffect, useState } from 'react';
import {
  FiTrash2,
  FiMinus,
  FiPlus,
  FiArrowRight,
  FiShoppingBag,
} from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import apiClient from '../api/axiosInstance.js';

// --- Mock Data (Based on your JSON structure) ---
const initialCartData = {
  id: 4,
  cartItems: [
    {
      id: 8,
      productId: 1,
      productName: 'Toned Fresh Milk',
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/pantryhub-storage.firebasestorage.app/o/profile-image%2F9de484ee-a8a7-42cc-bb65-cb0f6158d952.jpg?alt=media',
      quantity: 3,
      price: 28.0,
    },
    {
      id: 9,
      productId: 2,
      productName: 'Farm Fresh Eggs (6pcs)',
      imageUrl:
        'https://images.unsplash.com/photo-1582722878654-02fd2358ea2c?auto=format&fit=crop&w=200&q=80',
      quantity: 1,
      price: 85.0,
    },
    {
      id: 10,
      productId: 3,
      productName: 'Organic Red Apples',
      imageUrl:
        'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=200&q=80',
      quantity: 2,
      price: 180.0,
    },
  ],
  totalAmount: 529.0, // 84 + 85 + 360
};

const CartPage = () => {
  const [cart, setCart] = useState(initialCartData);
  const navigate = useNavigate();

  // --- Handlers (Local State Logic for Now) ---

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await apiClient.get('/cart');
      setCart(response.data);
    } catch (err) {
      console.log('Wishlist is not responding: ', err);
      toast.error(err);
    }
  };

  const handleQuantityChange = async (itemId, change) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.cartItems.map((item) => {
        if (item.id === itemId) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      // Recalculate total
      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        ...prevCart,
        cartItems: updatedItems,
        totalAmount: newTotal,
      };
    });

    try {
      await apiClient.patch(`/cart/update/${itemId}`, null, {
        params: { quantity: change },
      });

      // console.log(change);
      // console.log(response.data);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleRemoveItem = (itemId) => {
    toast.warning('Are you sure?', {
      description: 'Remove this item from cart?',
      action: {
        label: 'Yes',
        onClick: async () => {
          try {
            await apiClient.delete(`/cart/remove/${itemId}`);
            fetchCart();
            toast.success('Product is removed');
          } catch (error) {
            toast.error('Not Deleted: ', error);
          }
        },
      },
      cancel: {
        label: 'Cancel',
        onClick: () => {
          toast.info('Product not Removed');
        },
      },
    });
  };

  const handleEmptyCart = () => {
    toast.warning('Are you sure?', {
      description: 'Do you want to remove all products',
      action: {
        label: 'Yes',
        onClick: async () => {
          try {
            await apiClient.delete(`/cart/emptyCart`);
            fetchCart();
            toast.success('Cart is Empty');
          } catch (error) {
            toast.error('Not Deleted: ', error);
          }
        },
      },
      cancel: {
        label: 'Cancel',
        // onClick: () => {
        //   toast.info('Product not Removed');
        // },
      },
    });
  };

  const handleCheckout = () => {
    alert('Proceeding to Checkout...');
    // navigate('/checkout');
  };

  // --- Render ---

  if (cart.cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce-slow">
          <FiShoppingBag className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Your Cart is Empty
        </h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          Looks like you haven't added anything to your cart yet. Go ahead and
          explore our fresh products!
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 transition-transform transform hover:scale-105 shadow-lg shadow-green-200"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          Shopping Cart{' '}
          <span className="text-lg font-normal text-gray-500">
            ({cart.cartItems.length} items)
          </span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* --- LEFT: Cart Items List --- */}
          <div className="flex-grow">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Header Row (Hidden on mobile) */}
              <div className="hidden sm:grid grid-cols-12 gap-4 p-4 bg-gray-50/50 border-b border-gray-100 text-sm font-semibold text-gray-600">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              {/* Items */}
              <div className="divide-y divide-gray-100">
                {cart.cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 sm:p-6 hover:bg-gray-50/30 transition-colors"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                      {/* Product Info */}
                      <div className="col-span-1 sm:col-span-6 flex items-center gap-4">
                        <div className="h-20 w-20 flex-shrink-0 bg-white border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                          <img
                            src={item.imageUrl}
                            alt={item.productName}
                            className="h-full w-full object-contain p-1"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-base">
                            {item.productName}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1 sm:hidden">
                            ${item.price.toFixed(2)} x {item.quantity}
                          </p>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 text-sm font-medium hover:text-red-700 flex items-center gap-1 mt-2 transition-colors"
                          >
                            <FiTrash2 size={14} /> Remove
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="hidden sm:block col-span-2 text-center font-medium text-gray-600">
                        ${item.price.toFixed(2)}
                      </div>

                      {/* Quantity Control */}
                      <div className="col-span-1 sm:col-span-2 flex justify-center">
                        <div className="flex items-center border border-gray-200 rounded-lg h-9 bg-white">
                          <button
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-l-lg transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <FiMinus size={14} />
                          </button>
                          <span className="w-10 text-center font-semibold text-gray-800 text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-r-lg transition-colors"
                          >
                            <FiPlus size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="col-span-1 sm:col-span-2 text-right font-bold text-gray-900 text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Actions */}
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 font-medium hover:text-green-600 flex items-center gap-2 transition-colors"
              >
                <FiArrowRight className="rotate-180" /> Continue Shopping
              </button>

              <button
                onClick={handleEmptyCart}
                className="px-6 py-2.5 border border-red-200 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
              >
                <FiTrash2 /> Empty Cart
              </button>
            </div>
          </div>

          {/* --- RIGHT: Order Summary --- */}
          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                Order Summary
              </h2>

              <div className="space-y-4 text-gray-600 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">
                    ${cart.totalAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (Estimate)</span>
                  <span>$0.00</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200 mb-8">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-green-600">
                  ${cart.totalAmount.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 hover:bg-green-700 hover:shadow-green-300 transition-all flex items-center justify-center gap-2 text-lg"
              >
                Proceed to Checkout <FiArrowRight />
              </button>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-400">
                  Secure Checkout - 100% Satisfaction Guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
