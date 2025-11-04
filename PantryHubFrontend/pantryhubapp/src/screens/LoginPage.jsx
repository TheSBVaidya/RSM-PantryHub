import { useState } from 'react';
import {
  FacebookIcon,
  GithubIcon,
  GoogleIcon,
  SpinIcon,
} from './components/Icons.jsx';
import { useGoogleLogin } from '@react-oauth/google';
import apiClient from '../api/axiosInstance.js';

const LoginPage = ({ onLoginSuccess, onNavigateToSignup }) => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('sanjaybabanvaidya@gmail.com');
  const [password, setPassword] = useState('Sanjay@180');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const { accessToken, userResDto } = response.data;
      onLoginSuccess(userResDto, accessToken);
    } catch (error) {
      console.log(error);
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    flow: 'code',
    onSuccess: async (codeResponse) => {
      setIsGoogleLoading(true);
      setError(null);

      try {
        const response = await apiClient.post('/auth/google', {
          code: codeResponse.code,
        });

        // console.log('USER: ' + response.data.userResDto);

        const { accessToken, userResDto } = response.data;
        onLoginSuccess(userResDto, accessToken);
      } catch (err) {
        console.error('Failed to login with Google:', err);
        setError('Google login failed. Please try again.');
      } finally {
        setIsGoogleLoading(false);
      }
    },
    onError: (errorResponse) => {
      console.error('Google login error', errorResponse);
      setError('Google login failed. Please try again.');
    },
  });

  const socialButtonClass =
    'w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 disabled:opacity-70';

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

        {/* --- START: Added Social Login UI --- */}
        <div className="pt-2">
          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="space-y-3">
            <button
              type="button"
              className={socialButtonClass}
              disabled={isLoading}
              onClick={() => handleGoogleLogin()}
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <button
              type="button"
              className={socialButtonClass}
              disabled={isLoading}
              // onClick={() => handleSocialLogin('facebook')}
            >
              <FacebookIcon />
              Continue with Facebook
            </button>

            <button
              type="button"
              className={socialButtonClass}
              disabled={isLoading}
              // onClick={() => handleSocialLogin('github')}
            >
              <GithubIcon />
              Continue with GitHub
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 pt-4">
          Don't have an account?
          <a
            onClick={onNavigateToSignup}
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
