import { useState } from 'react';
import { SpinIcon } from './Icons.jsx';
import apiClient from '../api/axiosInstance.js';

const LoginPage = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('rahul.sharma@example.com');
  const [password, setPassword] = useState('your_secure_password456');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await apiClient.post('/auth/login', { email, password });
      console.log('Login successful:', response.data);
      console.log('accessToken: ', response.data.accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto my-12 p-6 sm:p-8 bg-white rounded-lg shadow-lg border border-gray-100">
      <div className="text-center mb-2">
        <img
          src="src/assets/foodtrove.png"
          alt="Food Trove"
          className="w-[220px] h-[90px] mx-auto"
        />
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded text-xs">
          {error}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          {/*Email*/}
          <label
            className="block text-gray-600 text-xs font-medium mb-1"
            htmlFor="email"
          >
            Email Address*
          </label>
          <input
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 placeholder-gray-400"
            id="email"
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        {/*Password*/}
        <div>
          <label
            className="block text-gray-600 text-xs font-medium mb-1"
            htmlFor="password"
          >
            Password*
          </label>
          <input
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 placeholder-gray-400"
            id="password"
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center text-gray-500 cursor-pointer hover:text-gray-700">
            <input
              className="mr-1.5 h-3.5 w-3.5 text-green-600 focus:ring-green-500 border-gray-300 rounded cursor-pointer"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isLoading}
            />
            Remember Me
          </label>
          <a
            href="#"
            className="font-medium text-gray-500 hover:text-green-700 hover:underline"
          >
            Forgot Password?
          </a>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition duration-150 ease-in-out text-sm ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isLoading ? <SpinIcon /> : 'Login'}
        </button>

        <p className="text-center text-xs text-gray-500 pt-4">
          Don't have an account?
          <a
            href="#"
            className="font-medium text-blue-600 hover:text-green-700 hover:underline ml-1"
          >
            Signup
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
