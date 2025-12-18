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
import CartPage from './screens/CartPage.jsx';
import WishlistPage from './screens/WishlistPage.jsx';
import { Toaster } from 'sonner';
import { replace, Route, Routes, useNavigate } from 'react-router-dom';
import ProductDetails from './screens/ProductDetails.jsx';

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  // const [view, setView] = useState('LOGIN');
  // const [addressEdit, setAddressEdit] = useState(null);
  const navigate = useNavigate();

  // List of views that should NOT have a Header or Footer
  const viewsWithoutHeaderFooter = ['/login', '/signup', '/complete-profile']; // List of views that should NOT have a Header or Footer
  const viewsWithoutBreadcrumb = ['/login', '/signup', '/complete-profile'];

  const currentPath = window.location.pathname;

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      const parsedUser = JSON.parse(userData);

      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(parsedUser);
      // setIsAuthenticated(true);
      if (parsedUser.isProfileComplete) {
        navigate('/dashboard', { replace: true });
      } else {
        navigate('/complete-profile', { replace: true });
      }
    } else {
      navigate('/login', { replace: true });
    }
  }, []);

  const handleLoginSuccess = (loggedInUser, token) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('user', JSON.stringify(loggedInUser));

    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    setUser(loggedInUser);
    // setIsAuthenticated(true);

    console.log('In App: ', loggedInUser);

    if (loggedInUser.isProfileComplete) {
      navigate('/dashboard');
    } else {
      navigate('/complete-profile');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    delete apiClient.defaults.headers.common['Authorization'];
    setUser(null);
    navigate('/login');
  };

  const handleProfileUpdate = (updatedUser) => {
    const newUser = { ...user, ...updatedUser };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(updatedUser);
    navigate('/add-address');
  };

  const handleAccountUpdate = (updatedUser) => {
    const newUser = { ...user, ...updatedUser };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    // setView('ADD_ADDRESS');
  };

  const handleSignupNavigation = (userForNav, tokenForNav) => {
    handleLoginSuccess(userForNav, tokenForNav);
    console.log('In App: ', userForNav);
    navigate('/add-address');
  };

  const handleAddressAdded = () => {
    console.log('handleAddressAdded: ', user.isProfileComplete);
    if (user.isProfileComplete) {
      navigate('/dashboard');
    } else {
      navigate('/account');
    }
  };

  // const handleNavigateToEditAddress = (address) => {
  //   setAddressEdit(address);
  //   navigate('/add-address');
  // };

  // const handleNavigatesToSignup = () => {
  //   setView('SIGNUP');
  // };
  //
  // const handleNavigatesToLogin = () => {
  //   localStorage.removeItem('accessToken');
  //   localStorage.removeItem('user');
  //   setView('LOGIN');
  // };
  //
  // const handleNavigateToDashboard = () => {
  //   setView('DASHBOARD');
  // };
  //
  // const handleNavigateToAccount = () => {
  //   setView('ACCOUNT');
  // };
  //
  // const handleNavigateToCart = () => {
  //   setView('CART');
  // };
  //
  // const handleNavigateToWishlist = () => {
  //   setView('WISHLIST');
  // };
  //
  // const handleNavigateToAddAddress = () => {
  //   // setAddressEdit(null);
  //   setView('ADD_ADDRESS');
  // };

  const hideHeaderFooter = viewsWithoutHeaderFooter.includes(currentPath);
  const hideBreadcrumb = viewsWithoutBreadcrumb.includes(currentPath);

  const renderContent = () => {
    return (
      <Routes>
        <Route
          path="/login"
          element={
            <LoginPage
              onLoginSuccess={handleLoginSuccess}
              onNavigateToSignup={() => navigate('/signup')}
            />
          }
        />

        <Route
          path="/signup"
          element={
            <CompleteProfilePage
              onProfileComplete={handleSignupNavigation}
              onNavigationToLogin={() => navigate('/login')}
            />
          }
        />

        <Route
          path="/complete-profile"
          element={
            <CompleteProfilePage
              user={user}
              onProfileComplete={handleProfileUpdate}
            />
          }
        />

        <Route
          path="/add-address"
          element={
            <AddAddressPage user={user} onAddressAdded={handleAddressAdded} />
          }
        />

        <Route path="/add-address/:id/edit" element={<AddAddressPage />} />

        <Route
          path="/account"
          element={
            <AccountPage
              user={user}
              onLogout={handleLogout}
              onAccountUpdate={handleAccountUpdate}
              // onNavigateToAddAddress={() => navigate('/add-address')}
              // onNavigateToEditAddress={() => navigate('/add-address/:id/edit')}
            />
          }
        />

        <Route path="/cart" element={<CartPage />} />

        <Route path="/wishlist" element={<WishlistPage user={user} />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Default/fallback route */}
        <Route
          path="*"
          element={
            <LoginPage
              onLoginSuccess={handleLoginSuccess}
              onNavigateToSignup={() => navigate('/signup')}
            />
          }
        />
      </Routes>
    );
  };

  return (
    <div>
      <Toaster richColors closeButton position="top-right" />

      {!hideHeaderFooter && (
        <Header
          onLogout={handleLogout}
          onNavigateToAccount={() => navigate('/account')}
          onNavigateToDashboard={() => navigate('/dashboard')}
          onNavigateToCart={() => navigate('/cart')}
          onNavigateToWishlistpage={() => navigate('/wishlist')}
          user={user}
        />
      )}
      {!hideBreadcrumb && (
        <Breadcrumb
          currentView={currentPath}
          onNavigateToDashboard={() => navigate('/dashboard')}
        />
      )}
      <main className="min-h-[calc(100vh-128px)] bg-gray-50">
        {renderContent()}
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}
export default App;
