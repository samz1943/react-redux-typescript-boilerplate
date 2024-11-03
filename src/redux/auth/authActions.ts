import { login as loginApi, refreshToken as refreshTokenApi } from '../../services/authService';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const login = createAsyncThunk<LoginResponse, LoginPayload>(
  'auth/login',
  async ({ email, password }) => {
    return await loginApi(email, password);
  }
);

export const refreshToken = createAsyncThunk('auth/refreshToken', async(token: string) => {
  return await refreshTokenApi(token);
});
  
export const logout = createAction('auth/logout');
