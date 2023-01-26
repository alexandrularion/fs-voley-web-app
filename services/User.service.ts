import { TBEUser } from '../components/users/Interfaces';
import { axiosConfigJSON } from './AxiosConfig';

const getAllUsers = () => {
  return axiosConfigJSON.get('/user/get/all');
};

const getUser = (userId: number) => {
  return axiosConfigJSON.get(`/user/get/${userId}`);
};

const deleteUser = (userId: number) => {
  return axiosConfigJSON.delete(`/user/delete/${userId}`);
};

const createUser = (user: TBEUser) => {
  return axiosConfigJSON.post('/user/create', JSON.stringify(user));
};

const updateUser = (userId: number, user: TBEUser) => {
  return axiosConfigJSON.post(`/user/update/${userId}`, JSON.stringify(user));
};

export { getAllUsers, getUser, deleteUser, createUser, updateUser };
