import { createSlice, PayloadAction  } from '@reduxjs/toolkit';
import { fetchSelf, fetchUsers } from './userActions';
import { User } from '../../interfaces/user/User';
import { PaginatedResponse } from '../../interfaces/PaginatedResponse';

interface UserState {
  users: User[];
  self: any | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

const initialState: UserState = {
  users: [],
  self: null,
  loading: 'idle',
  error: null,
  totalItems: 0,
  totalPages: 0,
  currentPage: 1,
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
    })
    
    .addCase(fetchUsers.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    })
    .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<PaginatedResponse<User>>) => {
      state.loading = 'succeeded';
      state.users = action.payload.data;
      state.totalItems = action.payload.totalItems;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
    })
    .addCase(fetchUsers.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });
  }
});

export default userSlice.reducer;