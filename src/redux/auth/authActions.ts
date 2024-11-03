import { LOGIN_SUCCESS, LOGOUT, REFRESH_TOKEN } from './authTypes';
import { login as loginApi, refreshToken as refreshTokenApi } from '../../services/authService';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from '../store';

export const login = (
    email: string,
    password: string
  ): ThunkAction<Promise<void>, RootState, unknown, Action> => async (dispatch) => {
    const { accessToken, refreshToken } = await loginApi(email, password);
    dispatch({ type: LOGIN_SUCCESS, payload: { accessToken, refreshToken } });
  };
  
  export const logout = (): Action => ({ type: LOGOUT });
  
  export const refreshAccessToken = (): ThunkAction<Promise<string | undefined>, RootState, unknown, Action> => async (
    dispatch,
    getState
  ) => {
    const { refreshToken } = getState().auth;
    const { accessToken } = await refreshTokenApi(refreshToken);
    dispatch({ type: REFRESH_TOKEN, payload: accessToken });
    return accessToken;
  };
