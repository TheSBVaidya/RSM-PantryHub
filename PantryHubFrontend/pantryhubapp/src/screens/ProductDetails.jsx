import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  ChevronRight,
  Home,
  CheckCircle,
  Truck,
  RotateCcw,
  ShieldCheck,
  Calendar,
  User,
} from 'lucide-react';
import apiClient from '../api/axiosInstance.js';
import { SpinIcon } from './components/Icons.jsx';
import { toast } from 'sonner';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productFullData, setProductFullData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Description');
  const [isWishlisted, setIsWishlisted] = useState(false);

  // --- Fetch Product Data ---
  useEffect(() => {
    const fetchProductDetails = async () => {
      const userId = JSON.parse(localStorage.getItem('user')).id;

      try {
        setLoading(true);
        // Assuming your backend endpoint is /products/{id}/details
        // which returns the structure { product: {...}, additionalInfo: {...}, reviews: [...] }
        const response = await apiClient.get(`/product/${id}/${userId}`);
        setProductFullData(response.data);
        setIsWishlisted(response.data.isWishlisted || false);
        setActiveImage(response.data.product.imageUrl);
      } catch (error) {
        console.error('Failed to fetch product details', error);
        // Fallback for demo if API fails/not ready
        // setProductFullData(mockData);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SpinIcon />
      </div>
    );
  }

  if (!productFullData) {
    return <div className="text-center p-10">Product not found.</div>;
  }

  const { product, avgRating, reviewCount, additionalInfo, reviews } =
    productFullData;

  const handleToggleWishlist = async () => {
    // Optimistic UI update
    // const prevState = isWishlisted;
    setIsWishlisted(!isWishlisted);
    const userId = JSON.parse(localStorage.getItem('user')).id;

    try {
      if (isWishlisted) {
        //Remove
        const response = await apiClient.delete(
          `/wishlist/remove/${userId}/${product.id}`
        );
        toast.success(response.data);
      } else {
        //add
        const response = await apiClient.post(
          `/wishlist/add-to-wishlist/${userId}/${product.id}`
        );
        toast.success(response.data);
      }
    } catch (err) {
      setIsWishlisted(!isWishlisted); // Revert
      toast.error('Wishlist update failed');
      console.error('Wishlist toggle failed', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/30 py-8 px-4 sm:px-6 lg:px-8 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* --- Breadcrumbs --- */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => navigate('/dashboard')}
            className="hover:text-green-600 flex items-center gap-1 transition-colors"
          >
            <Home size={14} /> Home
          </button>
          <ChevronRight size={14} />
          <span className="hover:text-green-600 cursor-pointer transition-colors">
            {product.categoryName}
          </span>
          <ChevronRight size={14} />
          <span className="font-medium text-gray-900 truncate">
            {product.name}
          </span>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-10 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
            {/* --- LEFT: Image Gallery --- */}
            <div className="space-y-6">
              {/* Main Image */}
              <div className="relative aspect-square w-full bg-white rounded-xl border border-gray-100 overflow-hidden flex items-center justify-center p-8 group">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-contain hover:scale-110 transition-transform duration-500"
                />
                {product.dealTag && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    {product.dealTag}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {[product.imageUrl, ...(product.galleryImages || [])].map(
                  (img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative flex-shrink-0 w-20 h-20 bg-white rounded-lg overflow-hidden border-2 transition-all ${
                        activeImage === img
                          ? 'border-green-500 ring-2 ring-green-100'
                          : 'border-gray-100 hover:border-green-300'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`thumb-${idx}`}
                        className="w-full h-full object-contain p-2"
                      />
                    </button>
                  )
                )}
              </div>
            </div>

            {/* --- RIGHT: Product Info --- */}
            <div className="flex flex-col">
              {/* Brand & Stock Status */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase tracking-wider">
                  {additionalInfo?.brand || 'Generic'}
                </span>
                <span
                  className={`flex items-center gap-1.5 text-sm font-medium ${product.status === 'ACTIVE' ? 'text-green-600' : 'text-red-500'}`}
                >
                  {product.status === 'ACTIVE' ? (
                    <>
                      <CheckCircle size={16} /> In Stock
                    </>
                  ) : (
                    <>
                      <RotateCcw size={16} /> Out of Stock
                    </>
                  )}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight mt-2">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < Math.floor(avgRating) ? 'currentColor' : 'none'}
                      className={
                        i < Math.floor(avgRating) ? '' : 'text-gray-200'
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 font-medium border-l border-gray-200 pl-3">
                  {reviewCount} Reviews
                </span>
              </div>

              {/* Price Block */}
              <div className="flex items-end gap-3 mb-8 bg-gray-50 p-4 rounded-xl w-fit">
                <span className="text-4xl font-bold text-green-600">
                  ${product.price.toFixed(2)}
                </span>
                {product.oldPrice && (
                  <>
                    <span className="text-lg text-gray-400 line-through mb-1">
                      ${product.oldPrice.toFixed(2)}
                    </span>
                    <span className="text-sm font-bold text-red-500 bg-red-50 px-2 py-1 rounded mb-1">
                      {Math.round(
                        ((product.oldPrice - product.price) /
                          product.oldPrice) *
                          100
                      )}
                      % OFF
                    </span>
                  </>
                )}
              </div>

              {/* Short Description */}
              <p className="text-gray-600 mb-8 leading-relaxed">
                {additionalInfo?.description || product.description}
              </p>

              {/* Unit Selector (Visual Only for now) */}
              <div className="mb-8">
                <span className="block text-sm font-semibold text-gray-900 mb-3">
                  Pack Size:
                </span>
                <div className="flex flex-wrap gap-3">
                  <button className="px-4 py-2 border-2 border-green-500 bg-green-50 text-green-700 font-bold rounded-lg text-sm">
                    {product.unitOfMeasure}
                  </button>
                  {/* Add logic here if you have multiple variants */}
                </div>
              </div>

              {/* Actions Row */}
              <div className="flex flex-wrap items-center gap-4 mt-auto">
                {/* Quantity */}
                <div className="flex items-center border-2 border-gray-200 rounded-lg h-12">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-green-600 hover:bg-gray-50 rounded-l-md transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-bold text-gray-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-green-600 hover:bg-gray-50 rounded-r-md transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Add to Cart */}
                <button className="flex-1 h-12 bg-green-600 text-white font-bold rounded-lg shadow-lg shadow-green-200 hover:bg-green-700 hover:shadow-green-300 transition-all flex items-center justify-center gap-2 uppercase tracking-wide text-sm">
                  <ShoppingCart size={20} />
                  Add To Cart
                </button>

                {/* Wishlist Toggle */}
                <button
                  onClick={handleToggleWishlist}
                  className={`h-12 w-12 border-2 rounded-lg flex items-center justify-center transition-all ${
                    isWishlisted
                      ? 'border-red-200 bg-red-50 text-red-500'
                      : 'border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-500'
                  }`}
                >
                  <Heart
                    size={22}
                    fill={isWishlisted ? 'currentColor' : 'none'}
                  />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-gray-100">
                <div className="flex flex-col items-center text-center gap-2">
                  <Truck className="text-green-500" size={24} />
                  <span className="text-xs font-medium text-gray-600">
                    Free Delivery
                  </span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <ShieldCheck className="text-green-500" size={24} />
                  <span className="text-xs font-medium text-gray-600">
                    Secure Payment
                  </span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <RotateCcw className="text-green-500" size={24} />
                  <span className="text-xs font-medium text-gray-600">
                    {additionalInfo?.isReturnable
                      ? 'Returnable'
                      : 'Non-Returnable'}
                  </span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <Calendar className="text-green-500" size={24} />
                  <span className="text-xs font-medium text-gray-600">
                    Shelf Life: {additionalInfo?.shelfLife} Days
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Bottom Tabs Section (Additional Info & Reviews) --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-10">
          <div className="flex items-center gap-8 border-b border-gray-200 mb-8 overflow-x-auto">
            {[
              'Description',
              'Additional Info',
              `Reviews (${reviews.length})`,
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-bold tracking-wide transition-all whitespace-nowrap relative top-[1px] ${
                  activeTab === tab
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="text-gray-600 leading-relaxed text-sm animate-fade-in">
            {activeTab === 'Description' && (
              <div className="max-w-4xl">
                <p className="mb-4">
                  {additionalInfo?.description || product.description}
                </p>
                <p>
                  Store in cool, dry place. Best consumed within{' '}
                  {additionalInfo?.shelfLife} days of purchase.
                </p>
              </div>
            )}

            {activeTab === 'Additional Info' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 max-w-3xl">
                <InfoRow label="Brand" value={additionalInfo?.brand} />
                <InfoRow
                  label="Manufacturer"
                  value={additionalInfo?.manufacturer}
                />
                <InfoRow
                  label="Country of Origin"
                  value={additionalInfo?.countryOfOrigin}
                />
                <InfoRow label="Food Type" value={additionalInfo?.foodType} />
                <InfoRow
                  label="Organic"
                  value={additionalInfo?.organic ? 'Yes' : 'No'}
                />
                <InfoRow
                  label="Expiry Date"
                  value={new Date(
                    additionalInfo?.expiryDate
                  ).toLocaleDateString()}
                />
                <InfoRow
                  label="Storage"
                  value={additionalInfo?.storageInstructions}
                />
              </div>
            )}

            {activeTab.startsWith('Reviews') && (
              <div className="space-y-8 max-w-4xl">
                {reviews.length === 0 ? (
                  <p className="text-gray-500 italic">
                    No reviews yet. Be the first to review!
                  </p>
                ) : (
                  reviews.map((review) => (
                    <div
                      key={review.id}
                      className="flex gap-4 p-4 bg-gray-50 rounded-xl"
                    >
                      <img
                        src={review.userAvatar}
                        alt={review.userName}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-gray-900">
                            {review.userName}
                          </h4>
                          <span className="text-xs text-gray-400">
                            •{' '}
                            {new Date(review.createdDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex text-yellow-400 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              fill={i < review.rating ? 'currentColor' : 'none'}
                              className={
                                i < review.rating ? '' : 'text-gray-300'
                              }
                            />
                          ))}
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper for Additional Info Rows
const InfoRow = ({ label, value }) => (
  <div className="flex justify-between py-2 border-b border-gray-100 last:border-0">
    <span className="font-medium text-gray-700">{label}</span>
    <span className="text-gray-600">{value || 'N/A'}</span>
  </div>
);

export default ProductDetails;
