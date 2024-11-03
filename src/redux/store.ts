import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './auth/authReducer';
import postSlice from './post/postSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postSlice,
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
