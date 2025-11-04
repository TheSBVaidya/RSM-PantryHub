import LoginPage from './screens/LoginPage.jsx';
import Header from './screens/components/Header.jsx';
import Footer from './screens/components/Footer.jsx';
import { useEffect, useState } from 'react';
import apiClient from './api/axiosInstance.js';
import CompleteProfilePage from './screens/CompleteProfilePage.jsx';
import AddAddressPage from './screens/AddAddressPage.jsx';
import Dashboard from './screens/DashboardPage.jsx';
import AccountPage from './screens/AccountPage.jsx';
import Breadcrumb from './screens/components/Breadcrumb.jsx';

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [view, setView] = useState('LOGIN');

  // List of views that should NOT have a Header or Footer
  const viewsWithoutHeaderFooter = ['LOGIN', 'SIGNUP', 'COMPLETE_PROFILE']; // List of views that should NOT have a Header or Footer
  const viewsWithoutBreadcrumb = ['LOGIN', 'SIGNUP', 'COMPLETE_PROFILE'];

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      const parsedUser = JSON.parse(userData);

      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(parsedUser);
      // setIsAuthenticated(true);
      if (parsedUser.isProfileComplete) {
        setView('DASHBOARD');
      } else {
        setView('COMPLETE_PROFILE');
      }
    } else {
      setView('LOGIN');
    }
  }, []);

  const handleLoginSuccess = (loggedInUser, token) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('user', JSON.stringify(loggedInUser));

    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    setUser(loggedInUser);
    // setIsAuthenticated(true);
    if (loggedInUser.isProfileComplete) {
      setView('DASHBOARD');
    } else {
      setView('COMPLETE_PROFILE');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    delete apiClient.defaults.headers.common['Authorization'];
    setUser(null);
    setView('LOGIN');
  };

  const handleProfileUpdate = (updatedUser) => {
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setView('ADD_ADDRESS');
  };

  const handleAccountUpdate = (updatedUser) => {
    const newUser = { ...user, ...updatedUser };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const handleSignupNavigation = (userForNav, tokenForNav) => {
    handleLoginSuccess(userForNav, tokenForNav);
    setView('ADD_ADDRESS');
  };

  const handleNavigatesToSignup = () => {
    setView('SIGNUP');
  };

  const handleNavigatesToLogin = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setView('LOGIN');
  };

  const handleAddressAdded = () => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    setView('DASHBOARD');
  };

  const handleNavigateToDashboard = () => {
    setView('DASHBOARD');
  };

  const handleNavigateToAccount = () => {
    setView('ACCOUNT');
  };

  const renderContent = () => {
    switch (view) {
      case 'LOGIN':
        return (
          <LoginPage
            onLoginSuccess={handleLoginSuccess}
            onNavigateToSignup={handleNavigatesToSignup}
          />
        );

      case 'SIGNUP':
        return (
          <CompleteProfilePage
            onProfileComplete={handleSignupNavigation}
            onNavigationToLogin={handleNavigatesToLogin}
          />
        );

      case 'COMPLETE_PROFILE':
        return (
          <CompleteProfilePage
            user={user}
            onProfileComplete={handleProfileUpdate}
          />
        );

      case 'ADD_ADDRESS':
        return (
          <AddAddressPage
            onAddressAdded={handleAddressAdded} // <-- New handler
          />
        );

      case 'DASHBOARD':
        return <Dashboard user={user} onLogout={handleLogout} />;

      case 'ACCOUNT':
        return (
          <AccountPage
            user={user}
            onLogout={handleLogout}
            onAccountUpdate={handleAccountUpdate}
          />
        );

      default:
        return (
          <LoginPage
            onLoginSuccess={handleLoginSuccess}
            onNavigateToSignup={handleNavigatesToSignup}
          />
        );
    }
  };

  return (
    <div>
      {!viewsWithoutHeaderFooter.includes(view) && (
        <Header
          onLogout={handleLogout}
          onNavigateToAccount={handleNavigateToAccount}
          onNavigateToDashboard={handleNavigateToDashboard}
          user={user}
        />
      )}
      {!viewsWithoutBreadcrumb.includes(view) && (
        <Breadcrumb
          currentView={view}
          onNavigateToDashboard={handleNavigateToDashboard}
        />
      )}
      <main className="min-h-[calc(100vh-128px)] bg-gray-50">
        {renderContent()}
      </main>
      {!viewsWithoutHeaderFooter.includes(view) && <Footer />}
    </div>
  );
}
export default App;
