import React, { useEffect, useState } from 'react';
import apiClient from '../../../api/axiosInstance.js';
import { toast } from 'sonner';

// Mock Category Data based on your JSON
const initialCategories = [
  {
    id: 1,
    name: 'Dairy & Breakfast',
    items: '24 Items',
    imageUrl:
      'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=400&q=80',
    color: 'bg-blue-50',
  },
  {
    id: 2,
    name: 'Fresh Fruits',
    items: '35 Items',
    imageUrl:
      'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=400&q=80',
    color: 'bg-green-50',
  },
  {
    id: 3,
    name: 'Vegetables',
    items: '48 Items',
    imageUrl:
      'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=400&q=80',
    color: 'bg-orange-50',
  },
  {
    id: 4,
    name: 'Snacks',
    items: '12 Items',
    imageUrl:
      'https://images.unsplash.com/photo-1621939514649-28b12e81658b?auto=format&fit=crop&w=400&q=80',
    color: 'bg-yellow-50',
  },
  {
    id: 5,
    name: 'Beverages',
    items: '15 Items',
    imageUrl:
      'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80',
    color: 'bg-red-50',
  },
  {
    id: 6,
    name: 'Atta & Rice',
    items: '08 Items',
    imageUrl:
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80',
    color: 'bg-stone-50',
  },
];

const CategoryBanners = () => {
  const [categories, setCategories] = useState(initialCategories);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get('/category');
      console.log(response.data);
      setCategories(response.data);
    } catch (err) {
      toast.error('Unable to Fetch Categories');
      console.log('Unable to Fetch Categories', err);
    }
  };

  return (
    <section className="mb-12">
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Explore Categories</h2>
        <a href="#" className="text-emerald-600 font-semibold hover:underline">
          View All
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`group ${cat.color} rounded-xl p-4 cursor-pointer hover:shadow-lg transition-all duration-300 border border-transparent hover:border-emerald-200`}
          >
            <div className="w-16 h-16 mb-3 mx-auto overflow-hidden rounded-full shadow-sm bg-white p-1">
              <img
                src={cat.imageUrl}
                alt={cat.name}
                className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="text-center font-bold text-gray-800 text-sm mb-1">
              {cat.name}
            </h3>
            <p className="text-center text-xs text-gray-500">{cat.items}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryBanners;
