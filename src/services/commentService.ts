import { CommentListRequest } from "../interfaces/comment/CommentListRequest";
import { CommentRequest } from "../interfaces/comment/CommentRequest";
import api from "./api";

export const getComments = async (postId: number, param: CommentListRequest) => {
    const response = await api.get('post/' + postId + '/comment', {params: { ...param }});
    return response.data;
}

export const createComment = async (postId: number, data: CommentRequest) => {
    const response = await api.post('post/' + postId + '/comment', data);
    return response.data;
}

export const updateComment = async (postId: number, commentId: number, data: CommentRequest) => {
    const response = await api.put('post/' + postId + '/comment/' + commentId, data);
    return response.data;
}

export const deleteComment = async (postId: number, commentId: number) => {
    const response = await api.delete('post/' + postId + '/comment/' + commentId);
    return response.data;
}