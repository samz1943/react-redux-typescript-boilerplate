import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import authSlice from '../reduce/authSlice';
import userSlice from '../reduce/userSlice'
import postSlice from '../reduce/postSlice';
import commentSlice from '../reduce/commentSlice';

const rootPersistConfig: PersistConfig<any> = {
  key: 'root',
  storage,
  blacklist: ['user'],
};

const authPersistConfig: PersistConfig<any> = {
  key: 'auth',
  storage,
  whitelist: ['accessToken', 'refreshToken'],
};

const userPersistConfig: PersistConfig<any> = {
  key: 'user',
  storage,
};

const postPersistConfig: PersistConfig<any> = {
  key: 'post',
  storage,
};

const commentPersistConfig: PersistConfig<any> = {
  key: 'comment',
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);
const persistedUserReducer = persistReducer(userPersistConfig, userSlice);
const persistedPostReducer = persistReducer(postPersistConfig, postSlice);
const persistedCommentReducer = persistReducer(commentPersistConfig, commentSlice);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    user: persistedUserReducer,
    post: persistedPostReducer,
    comment: persistedCommentReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
