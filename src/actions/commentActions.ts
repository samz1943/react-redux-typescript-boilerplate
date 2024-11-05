import { createAsyncThunk } from '@reduxjs/toolkit';
import { getComments, createComment, updateComment, deleteComment } from '../services/commentService';
import { CommentRequest } from '../interfaces/comment/CommentRequest';
import { PaginatedResponse } from '../interfaces/PaginatedResponse';
import { CommentListRequest } from '../interfaces/comment/CommentListRequest';

export const fetchComments = createAsyncThunk<PaginatedResponse<Comment>,{ postId: number; commentListRequest: CommentListRequest }>(
  'comments/fetchComments',
  async ({ postId, commentListRequest }) => {
      const response = await getComments(postId, commentListRequest);
      console.log('fetch comments', response);
      return response;
  }
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ postId, data }: { postId: number; data: CommentRequest }, thunkAPI) => {
    try {
      const response = await createComment(postId, data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to update comment');
    }
  }
);

export const updateCommentById = createAsyncThunk(
  'comments/updateCommentById',
  async ({ postId, commentId, data }: { postId: number; commentId: number; data: CommentRequest }, thunkAPI) => {
    try {
      const response = await updateComment(postId, commentId, data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to update comment');
    }
  }
);

export const deleteCommentById = createAsyncThunk(
  'comments/deleteCommentById',
  async ({ postId, commentId }: { postId: number; commentId: number }, thunkAPI) => {
    try {
      await deleteComment(postId, commentId);
      return commentId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to delete comment');
    }
  }
);
