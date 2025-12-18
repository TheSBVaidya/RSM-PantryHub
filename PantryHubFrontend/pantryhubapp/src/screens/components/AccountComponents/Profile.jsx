import { useEffect, useState } from 'react';
import { FiCamera, FiUser } from 'react-icons/fi';
import apiClient from '../../../api/axiosInstance.js';
import UpdateContactModel from './UpdateContactModel.jsx';
import { toast } from 'sonner';

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
  const [modelOpen, setModelOpen] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [profileChanged, setProfileChanged] = useState(false);
  const [initialNames, setInitialNames] = useState({
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await apiClient.get('users/me');
      // console.log(response.data);
      setFormData(response.data);
      setInitialNames({
        firstName: response.data.firstName || '',
        lastName: response.data.lastName || '',
      });
      setProfileChanged(false);
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    setLoading(true);

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
    };

    try {
      await apiClient.patch('/users/updateProfile', payload);
      // alert('Name is Updated');
      toast.success('Updated...!');
      setInitialNames({
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      setProfileChanged(false);
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === 'firstName' || name === 'lastName') {
        const hasChanged =
          updated.firstName !== initialNames.firstName ||
          updated.lastName !== initialNames.lastName;
        setProfileChanged(hasChanged);
      }

      return updated;
    });
  };

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      const imageChangePromise = apiClient
        .post(
          '/users/profile-image',
          { image },
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        )
        .then((res) => {
          fetchUserData();
        });

      try {
        setLoading(true);
        await toast.promise(imageChangePromise, {
          loading: 'Image is Updating',
          success: 'Profile Image Updated successfully!',
          error: (err) => {
            return err?.response?.data?.message || 'Something went wrong!';
          },
        });
      } catch (err) {
        toast.error('Something went wrong! ', err);
      } finally {
        setLoading(false);
      }

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
    toast.success('Profile Updated! (Image upload simulated)');
    // alert('Profile Updated! (Image upload simulated)');
  };

  const handleModelUpdate = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // toast.success(
    //   `${field === 'email' ? 'Email' : 'Phone'} updated successfully!`
    // );
    // alert(`${field === 'email' ? 'Email' : 'Phone'} updated successfully!`);
  };

  const openModel = (field) => {
    setEditingField(field);
    setModelOpen(true);
  };

  if (loading) return <p>Loading Profile...</p>;

  return (
    <>
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
            <div className="relative mt-1">
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                disabled
                className="block w-full px-3 py-2 pr-16 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() => openModel('email')}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-sm font-bold text-green-600 hover:text-green-800 cursor-pointer"
              >
                CHANGE
              </button>
            </div>
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <div className="relative mt-1">
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() => openModel('phone')}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-sm font-bold text-green-600 hover:text-green-800 cursor-pointer"
              >
                CHANGE
              </button>
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <button
              type="button"
              disabled={!profileChanged}
              onClick={() => handleUpdateProfile()}
              className={`${
                profileChanged
                  ? 'bg-green-600 hover:bg-green-700 cursor-pointer'
                  : 'bg-gray-400 cursor-not-allowed'
              } text-white font-bold py-2 px-6 rounded-md transition-colors`}
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
      {/*Render Model if Open*/}
      {modelOpen && (
        <UpdateContactModel
          field={editingField}
          currentValue={formData[editingField]}
          onClose={() => setModelOpen(false)}
          onUpdate={handleModelUpdate}
        />
      )}
    </>
  );
};

export default Profile;
