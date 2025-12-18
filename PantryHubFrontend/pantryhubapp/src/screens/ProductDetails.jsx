import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  Eye,
  ChevronRight,
  Home,
} from 'lucide-react';

const ProductDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  // Fallback data populated with fields from your reference image
  const productData = state?.product || {
    id: id || 1,
    name: 'Seeds Of Change Organic Quinoa, Brown',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In, iure minus error doloribus saepe natus?',
    price: 120.25,
    oldPrice: 123.25,
    stockQuantity: 150,
    unitOfMeasure: '200 Grams',
    rating: 4.5,
    reviewCount: 75,
    imageUrl:
      'https://images.unsplash.com/photo-1563636294-722124590204?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1563636294-722124590204?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550583724-b9d233c468a7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589985270826-4ca1997c25c4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596151163610-0f96063b2256?auto=format&fit=crop&w=800&q=80',
    ],
    // Mocking specific specs to match your image
    brand: 'ESTA BETTERU CO',
    flavour: 'Super Saver Pack',
    dietType: 'Vegetarian',
    speciality: 'Gluten Free, Sugar Free',
    info: 'Egg Free, Allergen-Free',
  };

  const [activeImage, setActiveImage] = useState(productData.imageUrl);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Description');
  const [selectedSize, setSelectedSize] = useState('50kg');

  useEffect(() => {
    setActiveImage(productData.imageUrl);
  }, [productData]);

  if (!state?.product && !id) {
    return (
      <div className="p-10 text-center">
        Product data missing. Please go back.
      </div>
    );
  }

  // Size mock options
  const sizes = ['50kg', '80kg', '120kg', '200kg'];

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => navigate('/')}
            className="hover:text-red-500 flex items-center gap-1"
          >
            <Home size={14} /> Home
          </button>
          <ChevronRight size={14} />
          <span className="hover:text-red-500 cursor-pointer">
            {productData.categoryName || 'Groceries'}
          </span>
          <ChevronRight size={14} />
          <span className="font-medium text-gray-900 truncate">
            {productData.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT: Image Gallery */}
          <div className="space-y-4">
            {/* Main Image - Clean light gray background */}
            <div className="relative aspect-[4/5] w-full bg-gray-50 rounded-xl border border-gray-100 overflow-hidden flex items-center justify-center p-8">
              <img
                src={activeImage}
                alt="Product Active"
                className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide justify-center sm:justify-start">
              {(productData.galleryImages || [productData.imageUrl]).map(
                (img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative flex-shrink-0 w-20 h-20 bg-gray-50 rounded-lg overflow-hidden border transition-all ${
                      activeImage === img
                        ? 'border-red-500 ring-1 ring-red-500'
                        : 'border-gray-200 hover:border-red-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`thumb-${idx}`}
                      className="w-full h-full object-contain p-1 mix-blend-multiply"
                    />
                  </button>
                )
              )}
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {productData.name}
            </h1>
            <p className="text-gray-600 mb-6 leading-relaxed text-sm">
              {productData.description}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-red-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={
                      i < Math.floor(productData.rating)
                        ? 'currentColor'
                        : 'none'
                    }
                    className={
                      i < Math.floor(productData.rating) ? '' : 'text-gray-300'
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                ({productData.reviewCount} Review)
              </span>
            </div>

            {/* Detailed Specifications List */}
            <div className="space-y-3 mb-8 text-sm">
              <div className="grid grid-cols-[120px_1fr] gap-2">
                <span className="font-semibold text-gray-800">Brand :</span>
                <span className="text-gray-600">{productData.brand}</span>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-2">
                <span className="font-semibold text-gray-800">Flavour :</span>
                <span className="text-gray-600">{productData.flavour}</span>
              </div>
              {/*<div className="grid grid-cols-[120px_1fr] gap-2">*/}
              {/*  <span className="font-semibold text-gray-800">Diet Type :</span>*/}
              {/*  <span className="text-gray-600">{productData.dietType}</span>*/}
              {/*</div>*/}
              <div className="grid grid-cols-[120px_1fr] gap-2">
                <span className="font-semibold text-gray-800">Weight :</span>
                <span className="text-gray-600">
                  {productData.unitOfMeasure}
                </span>
              </div>
              {/*<div className="grid grid-cols-[120px_1fr] gap-2">*/}
              {/*  <span className="font-semibold text-gray-800">*/}
              {/*    Speciality :*/}
              {/*  </span>*/}
              {/*  <span className="text-gray-600">{productData.speciality}</span>*/}
              {/*</div>*/}
              {/*<div className="grid grid-cols-[120px_1fr] gap-2">*/}
              {/*  <span className="font-semibold text-gray-800">Info :</span>*/}
              {/*  <span className="text-gray-600">{productData.info}</span>*/}
              {/*</div>*/}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-red-500">
                ${productData.price}
              </span>
              {productData.oldPrice && (
                <span className="text-lg text-gray-400 line-through">
                  ${productData.oldPrice}
                </span>
              )}
            </div>

            {/* Size/Weight Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-semibold text-gray-800">Size/Weight :</span>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 text-xs font-medium border rounded-sm transition-all ${
                      selectedSize === size
                        ? 'bg-red-500 text-white border-red-500'
                        : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions Row */}
            <div className="flex items-center gap-4 mb-8">
              {/* Quantity */}
              <div className="flex items-center border border-gray-300 rounded-sm">
                <span className="px-4 py-2.5 text-gray-700 font-medium border-r border-gray-300 w-12 text-center">
                  {quantity}
                </span>
                <div className="flex flex-col">
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-2 py-0.5 text-gray-600 hover:bg-gray-100 border-b border-gray-300 flex items-center justify-center"
                  >
                    <Plus size={12} />
                  </button>
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-2 py-0.5 text-gray-600 hover:bg-gray-100 flex items-center justify-center"
                  >
                    <Minus size={12} />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button className="px-8 py-3 bg-red-500 text-white font-bold rounded-sm shadow-sm hover:bg-red-600 transition-all uppercase text-sm tracking-wide">
                Add To Cart
              </button>

              {/* Icons */}
              <button className="p-3 border border-gray-300 rounded-sm text-gray-500 hover:text-red-500 hover:border-red-500 transition-all">
                <Heart size={20} />
              </button>
              <button className="p-3 border border-gray-300 rounded-sm text-gray-500 hover:text-red-500 hover:border-red-500 transition-all">
                <Eye size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Tabbed Section */}
        <div className="mt-16 border border-gray-100 rounded-lg p-6 sm:p-8">
          <div className="flex items-center gap-8 border-b border-gray-200 mb-8">
            {['Description', 'Information', 'Review'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-lg font-bold tracking-wide transition-all relative top-[1px] ${
                  activeTab === tab
                    ? 'text-red-500 border-b-2 border-red-500'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="text-gray-600 leading-relaxed space-y-6 text-sm">
            {activeTab === 'Description' && (
              <div className="animate-fade-in">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                  in vero sapiente odio, error dolore vero temporibus
                  consequatur, nobis veniam odit dignissimos consectetur quae in
                  perferendis doloribusdebitis corporis, eaque dicta, repellat
                  amet, illum adipisci vel perferendis dolor! Quis vel
                  consequuntur repellat distinctio rem.
                </p>
                <h3 className="text-base font-bold text-gray-900 mt-6 mb-3">
                  Packaging & Delivery
                </h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                  in vero perferendis dolor! Quis vel consequuntur repellat
                  distinctio rem. Corrupti ratione alias odio, error dolore
                  temporibus consequatur, nobis veniam odit laborum dignissimos
                  consectetur quae vero in perferendis provident quis.
                </p>
              </div>
            )}
            {activeTab === 'Information' && (
              <div className="animate-fade-in">
                <h3 className="text-base font-bold text-gray-900 mb-4">
                  Additional Information
                </h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-[150px_1fr] gap-2 pb-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-700">
                      Ingredients
                    </span>
                    <span>Organic Quinoa (White, Red, Black)</span>
                  </div>
                  <div className="grid grid-cols-[150px_1fr] gap-2 pb-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-700">
                      Manufacturer
                    </span>
                    <span>Seeds of Change, Inc.</span>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'Review' && (
              <div className="animate-fade-in">
                <h3 className="text-base font-bold text-gray-900 mb-4">
                  Customer Reviews
                </h3>
                <div className="space-y-6">
                  <div className="pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex text-red-500">
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                      </div>
                      <span className="font-semibold text-gray-900">
                        John Doe
                      </span>
                      <span className="text-gray-400 text-xs">
                        - Oct 12, 2023
                      </span>
                    </div>
                    <p>Excellent product! Tastes great and very healthy.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
