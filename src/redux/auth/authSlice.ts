import { createSlice } from "@reduxjs/toolkit";
import { login, refreshToken, logout } from "./authActions";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  loading: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to login';
      })

      .addCase(refreshToken.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        console.log('refresh token', action.payload);
        state.loading = 'succeeded';
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to refresh token';
      })

      .addCase(logout, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
      });
  }
});

export default authSlice.reducer;