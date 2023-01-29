import { TBETeamPlayer, TTeamCategory } from '../components/team/Interfaces';
import { axiosConfigJSON } from './AxiosConfig';

const getAllPlayers = () => {
  return axiosConfigJSON.get('/player/get/all');
};

const getPlayer = (playerId: number) => {
  return axiosConfigJSON.get(`/player/get/${playerId}`);
};

const deletePlayer = (playeId: number) => {
  return axiosConfigJSON.delete(`/player/delete/${playeId}`);
};

const createPlayer = (player: TBETeamPlayer) => {
  return axiosConfigJSON.post('/player/create', JSON.stringify(player));
};

const updatePlayer = (playerId: number, player: TBETeamPlayer) => {
  return axiosConfigJSON.post(`/player/update/${playerId}`, JSON.stringify(player));
};

const getAllCategories = () => {
  return axiosConfigJSON.get('/category/get/all');
};

const deleteCategory = (categoryId: number) => {
  return axiosConfigJSON.delete(`/category/delete/${categoryId}`);
};

const createCategory = (category: TTeamCategory) => {
  return axiosConfigJSON.post('/category/create', JSON.stringify(category));
};

const updateCategory = (cateogryId: number, category: TTeamCategory) => {
  return axiosConfigJSON.post(`/category/update/${cateogryId}`, JSON.stringify(category));
};

export { getAllPlayers, getPlayer, deletePlayer, createPlayer, updatePlayer, getAllCategories, updateCategory, createCategory, deleteCategory };
