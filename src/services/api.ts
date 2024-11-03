import axios from 'axios';
import { store } from '../redux/store';
import { logout, refreshAccessToken } from '../redux/auth/authActions';

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
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await store.dispatch(refreshAccessToken());
        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch {
        store.dispatch(logout());
      }
    }
    return Promise.reject(error);
  }
);

export default api;
