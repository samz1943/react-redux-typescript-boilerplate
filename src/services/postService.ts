import { PaginatedResponse } from "../interfaces/PaginatedResponse";
import { Post } from "../interfaces/post/Post";
import { PostListRequest } from "../interfaces/post/PostListRequest";
import { PostRequest } from "../interfaces/post/PostRequest";
import api from "./api";

export const getPosts = async (param: PostListRequest): Promise<PaginatedResponse<Post>> => {
    const response = await api.get('/post', {params: { ...param }});
    return response.data;
}

export const getPost = async (id: number) => {
    const response = await api.get('/post/' + id);
    return response.data;
}

export const createPost = async (data: PostRequest) => {
    const response = await api.post('/post', data);
    return response.data;
}

export const updatePost = async (id: number, data: PostRequest) => {
    const response = await api.put('/post/' + id, data);
    return response.data;
}

export const deletePost = async (id: number) => {
    const response = await api.delete('/post/' + id);
    return response.data;
}