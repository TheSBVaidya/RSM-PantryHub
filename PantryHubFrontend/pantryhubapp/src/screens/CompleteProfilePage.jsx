import { useEffect, useState } from 'react';
import { SpinIcon } from './components/Icons.jsx';
import apiClient from '../api/axiosInstance.js';
import { toast } from 'sonner';

const FormField = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <div className="mt-1">
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={id}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
          disabled ? 'bg-gray-100' : ''
        }`}
      />
    </div>
  </div>
);

const CompleteProfilePage = ({ user, onProfileComplete }) => {
  const isUpdateMode = !!user; //if user data passed we are in update mode

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '.',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await apiClient.get('/user/me');

        const newUser = response.data; // actual user object

        console.log(newUser);

        if (newUser) {
          setFormData((prevData) => ({
            ...prevData,
            firstName: newUser.firstName || '',
            lastName: newUser.lastName || '',
            email: newUser.email || '',
          }));
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    loadUser();
  }, [user]);

  // const fetchUser = async () => {
  //   return await apiClient.get('/user/me');
  // };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevDate) => ({
      ...prevDate,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      toast.error('Passwords do not match.');
      return;
    }
    setIsLoading(true);

    // console.log('In Complete Profile: ' + JSON.stringify(user));

    try {
      if (isUpdateMode) {
        // means user comes from login to complete the profile

        await apiClient.patch('/user/updateProfile', {
          phone: formData.phone,
          password: formData.password,
        });

        toast.success('Successfully updated!');
        onProfileComplete(user);
      } else {
        const payload = { ...formData };
        delete payload.confirmPassword;

        console.log(payload);

        const response = await apiClient.post('/auth/register', payload);
        console.log(response.data);

        toast.success('Register Successfully!');

        const userForNav = response.data.userResDto;
        const tokenForNav = response.data.accessToken;
        onProfileComplete(userForNav, tokenForNav);
      }
    } catch (error) {
      // console.error('Profile completion error:', error);
      const message =
        error.response?.data?.message ||
        error.message ||
        'An unknown error occurred.';
      toast.error(message);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 p-6 sm:p-10 bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="text-center">
          <img
            src="src/assets/foodtrove.png"
            alt="Food Trove"
            className="w-[220px] h-auto mx-auto my-auto"
          />
          {/*<h2 className="text-2xl font-bold text-gray-900">*/}
          {/*  Complete Your Profile*/}
          {/*</h2>*/}
          {/*<p className="mt-2 text-sm text-gray-600">*/}
          {/*  Just a few more details and you're all set!*/}
          {/*</p>*/}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded-md text-sm">
            {error}
          </div>
        )}

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          {/* User Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              id="firstName"
              label="First Name"
              type="text"
              placeholder="Enter First Name"
              value={formData.firstName}
              onChange={handleFormChange}
              required
              disabled={isUpdateMode}
            />
            <FormField
              id="lastName"
              label="Last Name"
              type="text"
              placeholder="Enter Last Name"
              value={formData.lastName}
              onChange={handleFormChange}
              required
              disabled={isUpdateMode}
            />
            <FormField
              id="email"
              label="Email"
              placeholder="Enter Email Name"
              type="email"
              value={formData.email}
              onChange={handleFormChange}
              required
              disabled={isUpdateMode}
            />
            <FormField
              id="phone"
              label="Phone Number"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleFormChange}
              required
            />
            <FormField
              id="password"
              label="Set Password"
              type="password"
              placeholder="Enter a new password"
              value={formData.password}
              onChange={handleFormChange}
              required
            />
            <FormField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Confirm your new password"
              value={formData.confirmPassword}
              onChange={handleFormChange}
              required
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? <SpinIcon /> : 'Save and Continue to Address'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfilePage;
