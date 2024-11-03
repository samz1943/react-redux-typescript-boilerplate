import { Dispatch } from 'redux';
import { FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE } from './postTypes';
import { getPosts } from '../../services/postService';

export const fetchPosts = () => async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_POSTS_REQUEST });
    try {
        const posts = await getPosts();
        dispatch({ type: FETCH_POSTS_SUCCESS, payload: posts });
    } catch (error: unknown) {
        const { message } = error as Error;
        dispatch({ type: FETCH_POSTS_FAILURE, payload: message });
    }
};