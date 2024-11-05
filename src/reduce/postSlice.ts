import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts, fetchPostById, addPost, updatePostById, deletePostById, clearSelectedPost } from '../actions/postActions';

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

      .addCase(addPost.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.posts.push(action.payload);
      })
      .addCase(addPost.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to fetch post';
      })

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
        state.error = action.error.message || 'Failed to update post';
      })

      .addCase(updatePostById.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(updatePostById.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.selectedPost = action.payload;
      })
      .addCase(updatePostById.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to update post';
      })

      .addCase(deletePostById.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(deletePostById.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.posts.splice(state.posts.findIndex((post) => post.id === action.payload), 1);
      })
      .addCase(deletePostById.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to delete post';
      })

      .addCase(clearSelectedPost, (state) => {
        state.selectedPost = null;
      });
  },
});

export default postSlice.reducer;
