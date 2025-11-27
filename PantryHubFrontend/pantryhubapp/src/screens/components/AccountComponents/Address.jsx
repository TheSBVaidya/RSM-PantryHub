import { useEffect, useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import apiClient from '../../../api/axiosInstance.js';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Address = () => {
  const [addressess, setAddressess] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAddress();
  }, []);

  const fetchAddress = async () => {
    try {
      const response = await apiClient.get('/address/me-address');
      const data = response.data;
      const addressArray = Array.isArray(data) ? data : [data];
      setAddressess(addressArray);
      console.log(addressArray);
    } catch (error) {
      console.log('Error fetching addresses:', error);
    }
  };

  const handleAddressDelete = (id) => {
    toast.warning('Are you sure?', {
      description: 'Do you really want to delete this address?',
      action: {
        label: 'Yes, Delete',
        onClick: async () => {
          try {
            await apiClient.delete(`/address/deleteAddress/${id}`);
            setAddressess((prev) => prev.filter((a) => a.id != id));
            // alert('Address Successfully Deleted...');
            toast.success('Address Successfully Deleted...');
          } catch (error) {
            // console.log(error);
            toast.error('Failed to delete address!', error);
          }
        },
      },
      cancel: {
        label: 'Cancel',
        onClick: () => {
          toast.info('Deletion Cancelled');
        },
      },
    });
  };

  return (
    <div className="p-4">
      {/* Address Text */}
      {addressess.length === 0 ? (
        <p className="text-gray-500 my-6">No Address Found</p>
      ) : (
        addressess.map((add) => {
          const addressString = [
            add.addressLine1,
            add.addressLine2,
            add.landmark,
            `${add.city}, ${add.state} ${add.zipCode}`,
            add.country,
          ]
            .filter(Boolean)
            .join(', ');
          return (
            <div
              key={add.id}
              className="bg-gray-50 p-4 rounded-lg border border-gray-200 m-6"
            >
              <div className="justify-between items-center mb-4">
                <span className="px-2 py-0.5 justify-start bg-green-100 text-green-800 text-xs font-medium rounded-full uppercase">
                  {add.addressType || 'ADDRESS'}
                </span>
                <address className="text-sm text-gray-700 not-italic mt-2">
                  {addressString}
                </address>
              </div>

              {/* Edit/Delete Buttons */}
              <div className="flex justify-end gap-4 flex-shrink-0">
                <button
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-yellow-600"
                  onClick={() =>
                    navigate(`/add-address/${add.id}/edit`, { state: add })
                  }
                >
                  <FiEdit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleAddressDelete(add.id)}
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600"
                >
                  <FiTrash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          );
        })
      )}
      <div className="flex justify-center">
        <button
          onClick={() => navigate('/add-address')}
          className="w-52 bg-gray-400 hover:bg-red-600 text-white font-semibold py-3 px-5 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition duration-150 ease-in-out text-sm mt-8 justify-center"
        >
          Add Address
        </button>
      </div>
    </div>
  );
};

export default Address;
