import { useEffect, useState } from 'react';
import { FiCamera, FiUser } from 'react-icons/fi';
import apiClient from '../../../api/axiosInstance.js';

const Profile = ({ onAccountUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    img_url: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await apiClient.get('/users/me');
      // console.log(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // setProfileImage(file);
      // setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would upload `profileImage` to a server (e.g., S3, Firebase Storage)
    // and get back a URL. For now, we just update the text fields.
    onAccountUpdate(formData);
    // You would also send the `profileImage` file to your API
    alert('Profile Updated! (Image upload simulated)');
  };

  if (loading) return <p>Loading Profile...</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/*<h2 className="text-2xl font-semibold mb-6 text-gray-800">*/}
      {/*  Profile Settings*/}
      {/*</h2>*/}

      {/* --- Profile Image Section --- */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
        <div className="relative">
          {formData.img_url ? (
            <img
              src={formData.img_url}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-200">
              <FiUser className="w-12 h-12 text-gray-500" />
            </div>
          )}
          <label
            htmlFor="profileUpload"
            className="absolute -bottom-2 -right-2 bg-green-600 text-white p-2 rounded-full cursor-pointer hover:bg-green-700 transition-colors"
          >
            <FiCamera className="w-4 h-4" />
            <input
              type="file"
              id="profileUpload"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {formData.firstName} {formData.lastName}
          </h3>
          <p className="text-gray-500">{formData.email}</p>
        </div>
      </div>

      {/* --- Profile Form Section --- */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            disabled
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>
        {/*<div>*/}
        {/*  <label*/}
        {/*    htmlFor="password"*/}
        {/*    className="block text-sm font-medium text-gray-700"*/}
        {/*  >*/}
        {/*    Password*/}
        {/*  </label>*/}
        {/*  <input*/}
        {/*    type="password"*/}
        {/*    name="password"*/}
        {/*    id="password"*/}
        {/*    value={user.password}*/}
        {/*    disabled*/}
        {/*    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed"*/}
        {/*  />*/}
        {/*</div>*/}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-red-500 text-white font-bold py-2 px-6 rounded-md hover:bg-green-700 transition-colors"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
