import { createSlice } from '@reduxjs/toolkit';
import { fetchSelf } from './userActions';

interface UserState {
  users: any[];
  self: any | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  users: [],
  self: null,
  loading: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchSelf.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    })
    .addCase(fetchSelf.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.self = action.payload;
    })
    .addCase(fetchSelf.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message || 'Failed to fetch user';
    });
  }
});

export default userSlice.reducer;