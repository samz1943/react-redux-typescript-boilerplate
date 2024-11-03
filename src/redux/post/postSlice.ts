import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts, fetchPostById, clearSelectedPost } from './postActions';

interface PostState {
  posts: any[];
  selectedPost: any | null;  // For the single post data
  loading: boolean;
  error: string | null;
  retryCount: 0,
}

const initialState: PostState = {
  posts: [],
  selectedPost: null,
  loading: false,
  error: null,
  retryCount: 0,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    resetRetryCount: (state) => {
        state.retryCount = 0;
    },
    incrementRetryCount: (state) => {
        state.retryCount++;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      })
      // Handle single post fetch
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch post';
      })

      .addCase(clearSelectedPost, (state) => {
        state.selectedPost = null; // Clear the selected post
      });
  },
});

export const { resetRetryCount, incrementRetryCount } = postSlice.actions;
export default postSlice.reducer;
