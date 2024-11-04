import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserSelf } from '../../services/userService';

export const fetchSelf = createAsyncThunk('users/fetchSelf', async () => {
  const response = await getUserSelf();
  return response.data;
});