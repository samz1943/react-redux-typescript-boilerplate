import { FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE } from './postTypes';

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

export default function postsReducer(state = initialState, action: any) {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_POSTS_SUCCESS:
      return { ...state, loading: false, posts: action.payload };
    case FETCH_POSTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}