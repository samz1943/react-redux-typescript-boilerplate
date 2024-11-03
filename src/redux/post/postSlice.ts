import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts, fetchPostById, clearSelectedPost } from './postActions';

interface PostState {
  posts: any[];
  selectedPost: any | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  selectedPost: null,
  loading: 'idle',
  error: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to fetch posts';
      })
      // Handle single post fetch
      .addCase(fetchPostById.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.selectedPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to fetch post';
      })

      .addCase(clearSelectedPost, (state) => {
        state.selectedPost = null; // Clear the selected post
      });
  },
});

export default postSlice.reducer;
