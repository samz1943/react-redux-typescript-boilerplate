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
    const response = await loginApi(email, password);
    return response;
  }
);
  
export const logout = createAction('auth/logout');

// export const refreshAccessToken = (): ThunkAction<Promise<string | undefined>, RootState, unknown, Action> => async (
//   dispatch,
//   getState
// ) => {
//   const { refreshToken } = getState().auth;
//   const { accessToken } = await refreshTokenApi(refreshToken);
//   dispatch({ type: REFRESH_TOKEN, payload: accessToken });
//   return accessToken;
// };
