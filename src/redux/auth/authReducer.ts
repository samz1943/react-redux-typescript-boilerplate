import { LOGIN_SUCCESS, LOGOUT, REFRESH_TOKEN } from './authTypes';

const initialState = {
  accessToken: null,
  refreshToken: null,
};

export default function authReducer(state = initialState, action: any) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case REFRESH_TOKEN:
      return { ...state, accessToken: action.payload };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
