import api from "./api";

export const getPosts = async () => {
    const response = await api.get('/post');
    return response.data.data;
}