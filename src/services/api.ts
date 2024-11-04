import axios from 'axios';
import { store } from '../redux/store';
import { logout, refreshToken } from '../redux/auth/authActions';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('api error')
    const originalRequest = error.config;
    const state = store.getState();

    if (!originalRequest._retryCount) originalRequest._retryCount = 0;

    if (error.response?.status === 401 && originalRequest._retryCount < 1) {
      originalRequest._retryCount += 1;
      try {
        const stateRefreshToken = state.auth.refreshToken;

        if (stateRefreshToken) {
          const newAccessToken = await store.dispatch(refreshToken(stateRefreshToken));

          console.log('newAccessToken', newAccessToken)

          if (newAccessToken) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
          }
        }
      } catch (refreshError) {
        store.dispatch(logout());
      }
    }
    return Promise.reject(error);
  }
);

export default api;
