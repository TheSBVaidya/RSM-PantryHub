import apiClient from '../api/axiosInstance.js';
import { useEffect, useState } from 'react';
import { SpinIcon } from './components/Icons.jsx';
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

// Re-usable state/country field
const SelectField = ({
  id,
  label,
  value,
  onChange,
  required = false,
  disabled = false,
  options,
  placeholder,
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <div className="mt-1">
      <select
        id={id}
        name={id}
        required={required}
        disabled={disabled}
        value={value}
        onChange={onChange}
        className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
          disabled ? 'bg-gray-100' : ''
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  </div>
);

// Mock data for dropdowns
const countryOptions = [
  { value: 'IN', label: 'India' },
  { value: 'US', label: 'United States' },
];
const stateOptions = [
  { value: 'MH', label: 'Maharashtra' },
  { value: 'CA', label: 'California' },
];

const intitalAddressData = {
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  country: '',
  zipCode: '',
  landmark: '',
  addressType: '',
};

const AddAddressPage = ({ onAddressAdded, addressToEdit }) => {
  const [addressData, setAddressData] = useState(intitalAddressData);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (addressToEdit) {
      setIsEditMode(true);
      setAddressData({
        addressLine1: addressToEdit.addressLine1 || '',
        addressLine2: addressToEdit.addressLine2 || '',
        city: addressToEdit.city || '',
        state: addressToEdit.state || '',
        zipCode: addressToEdit.zipCode || '',
        country: addressToEdit.country || '',
        landmark: addressToEdit.landmark || '',
        addressType: addressToEdit.addressType || 'HOME',
      });
    } else {
      setIsEditMode(false);
      setAddressData(intitalAddressData);
    }
  }, [addressToEdit]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isEditMode) {
        await apiClient.put(
          `/address/updateAddress/${addressToEdit.id}`,
          addressData
        );
        toast.success('Address is Updated...!');
        onAddressAdded();
      } else {
        await apiClient.post('/address/addAddress', addressData);
        toast.success('Address is Added...');
        onAddressAdded();
      }
    } catch (error) {
      console.error('Add address error:', error);
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
          <h1 className="text-3xl font-bold text-red-600">FoodTrove</h1>
          <p className="text-sm text-gray-500">Step 2: Add Your Address</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded-md text-sm">
            {error}
          </div>
        )}

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          {/* Address Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <FormField
                id="addressLine1"
                label="Address Line 1"
                type="text"
                placeholder="1234 Main St"
                value={addressData.addressLine1}
                onChange={handleAddressChange}
                required
              />
            </div>
            <div className="md:col-span-2">
              <FormField
                id="addressLine2"
                label="Address Line 2 (Optional)"
                type="text"
                placeholder="Apartment, studio, or floor"
                onChange={handleAddressChange}
                value={addressData.addressLine2}
              />
            </div>
            <FormField
              id="city"
              label="City"
              type="text"
              placeholder="Mumbai"
              value={addressData.city}
              onChange={handleAddressChange}
              required
            />
            <FormField
              id="zipCode"
              label="Post Code"
              type="text"
              placeholder="400001"
              value={addressData.zipCode}
              onChange={handleAddressChange} // Fixed this from handleChange
              required
            />
            <SelectField
              id="country"
              label="Country"
              value={addressData.country}
              required
              options={countryOptions}
              onChange={handleAddressChange}
              placeholder="Select Country"
            />
            <SelectField
              id="state"
              label="Region/State"
              value={addressData.state}
              required
              options={stateOptions}
              onChange={handleAddressChange}
              placeholder="Select State"
            />
            <FormField
              id="landmark"
              label="Landmark (Optional)"
              type="text"
              placeholder="Near City Park"
              onChange={handleAddressChange}
              value={addressData.landmark}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address Type<span className="text-red-500">*</span>
              </label>
              <div className="mt-2 flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="addressType"
                    value="HOME"
                    onChange={handleAddressChange}
                    checked={addressData.addressType === 'HOME'}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Home</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="addressType"
                    value="WORK"
                    onChange={handleAddressChange}
                    checked={addressData.addressType === 'WORK'}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Work</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? <SpinIcon /> : 'Save and Finish'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddressPage;
