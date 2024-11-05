import { LoginRequest } from '../interfaces/auth/LoginRequest';
import { LoginResponse } from '../interfaces/auth/LoginResponse';
import { login as loginApi, refreshToken as refreshTokenApi } from '../services/authService';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk<LoginResponse, LoginRequest>(
  'auth/login',
  async (payload: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await loginApi(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to log in');
    }
  }
);

export const refreshToken = createAsyncThunk('auth/refreshToken', async(token: string) => {
  return await refreshTokenApi(token);
});
  
export const logout = createAction('auth/logout');
