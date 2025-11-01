import LoginPage from './screens/LoginPage.jsx';
import Header from './screens/Header.jsx';
import Footer from './screens/Footer.jsx';
import DashboardPage from './screens/DashboardPage.jsx';
import { useEffect, useState } from 'react';
import apiClient from './api/axiosInstance.js';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      const parsedUser = JSON.parse(userData);

      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = (loggedInUser, token) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('user', JSON.stringify(loggedInUser));

    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    setUser(loggedInUser);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');

    delete apiClient.defaults.headers.common['Authorization'];

    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <div>
      <Header />
      {isAuthenticated ? (
        <DashboardPage user={user} onLogout={handleLogout} />
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
      <Footer />
    </div>
  );
}
export default App;
