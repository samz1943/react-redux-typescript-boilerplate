import axios from 'axios';
import { store } from '../redux/store';
import { resetRetryCount, incrementRetryCount } from '../redux/post/postSlice';
import { logout } from '../redux/auth/authActions';

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
    const originalRequest = error.config;
    const state = store.getState();

    const { retryCount } = state.post;

    if (error.response?.status === 401 && retryCount < 1) {
      console.log('retry', retryCount)
      store.dispatch(incrementRetryCount()); // Increment retry counter
      try {
        // Attempt to refresh the access token
        // const newAccessToken = await store.dispatch(refreshAccessToken());

        // if (newAccessToken) {
        //   store.dispatch(resetRetryCount());
        //   // Set the new access token in the header and retry the request
        //   originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        //   return api(originalRequest);
        // }
      } catch (refreshError) {
        store.dispatch(resetRetryCount());
        // If refreshing fails, log out
        store.dispatch(logout());
      }
    }
    return Promise.reject(error);
  }
);

export default api;
