import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getPosts, getPost, createPost, updatePost, deletePost } from '../../services/postService';
import { RootState } from '../store';
import { PostRequest } from '../../interfaces/post/PostRequest';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await getPosts();
  console.log('fetch posts', response.data)
  return response.data;
});

export const fetchPostById = createAsyncThunk(
  'posts/fetchOrGetPostById',
  async (postId: number, { getState }) => {
    const state = getState() as RootState;
    const existingPost = state.post.posts.find((post) => post.id === postId);

    if (existingPost) {
      return existingPost;
    } else {
      const response = await getPost(postId);
      return response.data;
    }
  }
);

export const addPost = createAsyncThunk(
  'posts/addPost',
  async (data: PostRequest, thunkAPI) => {
    try {
      const response = await createPost(data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to update post');
    }
  }
);

export const updatePostById = createAsyncThunk(
  'posts/updatePostById',
  async ({ id, data }: { id: number; data: PostRequest }, thunkAPI) => {
    try {
      const response = await updatePost(id, data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to update post');
    }
  }
);

export const deletePostById = createAsyncThunk(
  'posts/deletePostById',
  async ( postId: number , thunkAPI) => {
    try {
      await deletePost(postId);
      return postId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to update post');
    }
  }
);

export const clearSelectedPost = createAction('posts/clearSelectedPost');
