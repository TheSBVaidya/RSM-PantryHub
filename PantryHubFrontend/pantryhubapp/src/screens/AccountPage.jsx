import React, { useState } from 'react';
import { FiUser, FiMapPin, FiShoppingBag, FiLogOut } from 'react-icons/fi';
import Profile from './components/AccountComponents/Profile.jsx';
import Address from './components/AccountComponents/Address.jsx';

// This component renders the correct content based on the active tab
const AccountPage = ({
  user,
  onAccountUpdate,
  onNavigateToAddAddress,
  onLogout,
  onNavigateToEditAddress,
}) => {
  const [activeTab, setActiveTab] = useState('profile');

  const getTabClassName = (tabName) =>
    `flex items-center gap-3 w-full px-4 py-3 rounded-md cursor-pointer transition-colors ${
      activeTab === tabName
        ? 'bg-green-100 text-green-700 font-semibold'
        : 'text-gray-600 hover:bg-gray-100'
    }`;

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <Profile onAccountUpdate={onAccountUpdate} />;
      case 'orders':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">My Orders</h2>
            <p className="text-gray-600 mt-4">You have no orders.</p>
          </div>
        );
      case 'address':
        return (
          <Address
            onNavigateToAddAddress={onNavigateToAddAddress}
            onNavigateToEditAddress={onNavigateToEditAddress}
          />
        );
      default:
        return <Profile onAccountUpdate={onAccountUpdate} />;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Account</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* --- Sidebar --- */}
        <div className="md:col-span-1">
          <div className="bg-white p-4 rounded-lg shadow-md space-y-2">
            <div
              className={getTabClassName('profile')}
              onClick={() => setActiveTab('profile')}
            >
              <FiUser className="w-5 h-5" />
              <span>Profile</span>
            </div>
            <div
              className={getTabClassName('orders')}
              onClick={() => setActiveTab('orders')}
            >
              <FiShoppingBag className="w-5 h-5" />
              <span>My Orders</span>
            </div>
            <div
              className={getTabClassName('address')}
              onClick={() => setActiveTab('address')}
            >
              <FiMapPin className="w-5 h-5" />
              <span>My Addresses</span>
            </div>
            <div
              className="flex items-center gap-3 w-full px-4 py-3 rounded-md cursor-pointer text-gray-600 hover:bg-gray-100"
              onClick={onLogout}
            >
              <FiLogOut className="w-5 h-5" />
              <span>Logout</span>
            </div>
          </div>
        </div>

        {/* --- Content Area --- */}
        <div className="md:col-span-3">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AccountPage;
