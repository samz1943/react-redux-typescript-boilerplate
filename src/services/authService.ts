import api from './api';

export const login = async (email: string, password: string) => {
  const response = await api.post('/login', { email, password });
  localStorage.setItem('token', response.data.accessToken);
  return response.data;
};

export const refreshToken = async (token: string) => {
  const response = await api.post('/refresh-token', { token });
  return response.data;
};