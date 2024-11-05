import { PaginatedResponse } from '../interfaces/PaginatedResponse';
import { User } from '../interfaces/user/User';
import { UserListRequest } from '../interfaces/user/UserListRequest';
import api from './api';

export const getUserSelf = async () => {
  const response = await api.get('/user/self');
  return response.data;
};

export const getUsers = async (param: UserListRequest): Promise<PaginatedResponse<User>> => {
  const response = await api.get('/user', {params: { ...param }});
  return response.data;
}

export const getUser = async (userId: number) => {
  const response = await api.get(`/user/${userId}`);
  return response.data;
};

export const updateUser = async (userId: number, userData: any) => {
  const response = await api.put(`/user/${userId}`, userData);
  return response.data;
};

export const deleteUser = async (userId: number) => {
  const response = await api.delete(`/user/${userId}`);
  return response.data;
};
