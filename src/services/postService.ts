import api from "./api";

interface PostData {
    title: string;
    content: string;
}

export const getPosts = async () => {
    const response = await api.get('/post');
    return response.data;
}

export const getPost = async (id: number) => {
    const response = await api.get('/post/' + id);
    return response.data;
}

export const createPost = async ( data: PostData) => {
    const response = await api.post('/post', data);
    return response.data;
}

export const updatePost = async (id: number, data: PostData) => {
    const response = await api.put('/post/' + id, data);
    return response.data;
}

export const deletePost = async (id: number) => {
    const response = await api.delete('/post/' + id);
    return response.data;
}