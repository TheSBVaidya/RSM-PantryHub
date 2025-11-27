import { FiX } from 'react-icons/fi';
import { useRef, useState } from 'react';
import apiClient from '../../../api/axiosInstance.js';
import { toast } from 'sonner';

const UpdateContactModel = ({ field, currentValue, onClose, onUpdate }) => {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const [newValue, setNewValue] = useState('');
  const inputRefs = useRef([]);

  const isEmail = field === 'email';
  const label = isEmail ? 'Email Address' : 'Phone Number';

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyCurrent = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) return alert('Please enter a 6-digit OTP');

    setLoading(true);
    // API verification
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      // alert('Identity Verified! Please enter your new details.');
    }, 1000);
  };

  //update new value
  const handleUpdateValue = () => {
    if (!newValue) return toast.info(`Please enter a valid ${label}`);
    setLoading(true);
    // APi call for update profile
    const payload = { [field]: newValue };

    const updateValuePromise = apiClient
      .patch('/user/updateProfile', payload)
      .then((response) => {
        const { accessToken, userResDto } = response.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user', JSON.stringify(userResDto));
        onUpdate(field, newValue);
        onClose();
      });

    setTimeout(async () => {
      setLoading(false);

      try {
        await toast.promise(updateValuePromise, {
          loading: 'Updating...',
          success: `${field} is updated...`,
          error: (err) => {
            return err?.response?.data?.message || 'Something went wrong!';
          },
        });
      } catch (error) {
        toast.error('Something went wrong! ', error);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FiX size={24} />
        </button>

        {step === 1 ? (
          // 1. Verify Current Id
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 text-center">
              Verify It's You
            </h3>
            <p className="text-sm text-gray-600 text-center">
              We've sent a code to your current {label}:
              <br />
              <span className="font-semibold text-gray-800">
                {currentValue}
              </span>
            </p>

            <div className="flex justify-center gap-2">
              {otp.map((data, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={data}
                  className="w-10 h-10 text-center border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-lg font-semibold"
                  onChange={(e) => handleOtpChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>

            <button
              onClick={handleVerifyCurrent}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400"
            >
              {loading ? 'Verifying...' : 'Verify Identity'}
            </button>
          </div>
        ) : (
          // 2. Update new Value
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Update {label}
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter new {label}
              </label>
              <input
                type={isEmail ? 'email' : 'tel'}
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder={isEmail ? 'new@email.com' : 'new Phone Number'}
                autoFocus
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <button
              onClick={handleUpdateValue}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400"
            >
              {loading ? 'Updating' : 'Update Now'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateContactModel;
