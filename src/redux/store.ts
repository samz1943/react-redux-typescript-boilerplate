import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './auth/authReducer';
import postsReducer from './post/postReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
