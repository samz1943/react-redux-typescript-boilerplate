import { createAction  } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPosts, getPost } from '../../services/postService';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await getPosts();
    return response.data;
  });
  
export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (postId: number) => {
    const response = await getPost(postId);
    return response.data;
});

export const clearSelectedPost = createAction('posts/clearSelectedPost');
