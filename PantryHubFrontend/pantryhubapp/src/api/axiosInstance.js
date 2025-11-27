import axios from 'axios';

// Step 1 : Create Instance
const apiClient = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
  },
});

//Step 2 :Add an Interceptor (GateKeeper for outgoing request)
// ye har token jane se pahile token check kargega aur request ke sath add karega
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Step 3:Add Response Interceptor(GateKeeper for incoming response)
// ye har response aane ke baad check karga token expiry handle karne ke liye
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized! Token might be expired.');

      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    }

    return Promise.reject(error);
  }
);

export default apiClient;
