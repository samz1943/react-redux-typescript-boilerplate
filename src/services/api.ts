import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add request interceptors to add authorization headers or handle other config
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Example token handling
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add response interceptors to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors (e.g., refresh token or redirect on 401)
    if (error.response?.status === 401) {
      // Example action: redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
