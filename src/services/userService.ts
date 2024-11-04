import api from './api';

export const getUserSelf = async () => {
  const response = await api.get('/user/self');
  return response.data;
};

export const getUser = async (userId: string) => {
  const response = await api.get(`/user/${userId}`);
  return response.data;
};

export const updateUser = async (userId: string, userData: any) => {
  const response = await api.put(`/user/${userId}`, userData);
  return response.data;
};
