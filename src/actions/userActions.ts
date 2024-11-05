import { PaginatedResponse } from '../interfaces/PaginatedResponse';
import { User } from '../interfaces/user/User';
import { UserListRequest } from '../interfaces/user/UserListRequest';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteUser, getUserSelf, getUsers } from '../services/userService';

export const fetchSelf = createAsyncThunk('users/fetchSelf', async () => {
  const response = await getUserSelf();
  return response.data;
});

export const fetchUsers = createAsyncThunk<PaginatedResponse<User>, UserListRequest>(
  'users/fetchUsers',
  async (userListRequest: UserListRequest, { rejectWithValue }) => {
    try {
      const response = await getUsers(userListRequest);

      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch users');
    }
  }
);

export const removeUser = createAsyncThunk(
  'users/removeUser',
  async (userId: number , { rejectWithValue }) => {
    try {
      await deleteUser(userId);
      return userId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch users');
    }
  }
);
