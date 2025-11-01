import { LogoutIcon, UserIcon } from './Icons.jsx';

const DashboardPage = ({ user, onLogout }) => {
  return (
    <div>
      {/* Header Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="font-bold text-2xl text-gray-800">
                PantryHub
              </span>
            </div>
            <div className="flex items-center">
              <button
                onClick={onLogout}
                className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                <LogoutIcon />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Card */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.firstName || user?.name || 'User'}!
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              You are logged in to your dashboard.
            </p>
          </div>

          {/* User Profile Card */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Your Profile
            </h2>
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                {user?.img_url ? (
                  <img
                    className="h-20 w-20 rounded-full object-cover"
                    src={user.img_url}
                    alt="Profile"
                  />
                ) : (
                  <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center">
                    <UserIcon />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Full Name
                    </dt>
                    <dd className="mt-1 text-md text-gray-900">
                      {user?.firstName} {user?.lastName}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Email Address
                    </dt>
                    <dd className="mt-1 text-md text-gray-900">
                      {user?.email}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Role</dt>
                    <dd className="mt-1 text-md text-gray-900 capitalize">
                      {user?.role?.replace('ROLE_', '').toLowerCase() || 'User'}
                    </dd>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
