import { LoginRequest } from '../interfaces/auth/LoginRequest';
import { LoginResponse } from '../interfaces/auth/LoginResponse';
import api from './api';

export const login = async (payload: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post('/login', payload);
  return response.data;
};

export const refreshToken = async (token: string): Promise<LoginResponse> => {
  const response = await api.post('/refresh-token', { refreshToken: token });
  return response.data;
};