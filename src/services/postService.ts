import api from "./api";

export const getPosts = async () => {
    const response = await api.get('/post');
    return response.data;
}

export const getPost = async (id: number) => {
    const response = await api.get('/post/' + id);
    return response.data;
}