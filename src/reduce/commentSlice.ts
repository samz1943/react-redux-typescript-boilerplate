import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchComments, addComment, updateCommentById, deleteCommentById } from '../actions/commentActions';
import { PaginatedResponse } from '../interfaces/PaginatedResponse';

interface CommentState {
  comments: any[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

const initialState: CommentState = {
  comments: [],
  loading: 'idle',
  error: null,
  totalItems: 0,
  totalPages: 0,
  currentPage: 1,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<PaginatedResponse<Comment>>) => {
        state.loading = 'succeeded';
        state.comments = action.payload.data;
        state.totalItems = action.payload.totalItems;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to fetch comments';
      })

      .addCase(addComment.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.comments.push(action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to fetch comment';
      })

      .addCase(updateCommentById.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(updateCommentById.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.comments[state.comments.findIndex((comment) => comment.id === action.payload.id)] = action.payload;
      })
      .addCase(updateCommentById.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to update comment';
      })

      .addCase(deleteCommentById.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(deleteCommentById.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.comments.splice(state.comments.findIndex((comment) => comment.id === action.payload), 1);
      })
      .addCase(deleteCommentById.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to delete comment';
      });
  },
});

export default commentSlice.reducer;
