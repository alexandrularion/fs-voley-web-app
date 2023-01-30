import { TBETeamPlayer, TTeamCategory, TTeamCoach, TTeamEdition } from '../components/team/Interfaces';
import { axiosConfigJSON } from './AxiosConfig';

const getAllCategoriesSWRKey = '/category/get/all';
const getAllEditionsSWRKey = '/editiion/get/all';

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

const getAllEditions = () => {
  return axiosConfigJSON.get('/editiion/get/all');
};

const deleteEdition = (editionId: number) => {
  return axiosConfigJSON.delete(`/editiion/delete/${editionId}`);
};

const createEdition = (edition: TTeamEdition) => {
  return axiosConfigJSON.post('/editiion/create', JSON.stringify(edition));
};

const updateEdition = (editionId: number, edition: TTeamEdition) => {
  return axiosConfigJSON.post(`/editiion/update/${editionId}`, JSON.stringify(edition));
};

const getAllCoaches = () => {
  return axiosConfigJSON.get('/trainers/all');
};

const deleteCoach = (coachId: number) => {
  return axiosConfigJSON.delete(`/trainers/delete/${coachId}`);
};

const createCoach = (coach: TTeamCoach) => {
  return axiosConfigJSON.post('/trainers/create', JSON.stringify(coach));
};

const updateCoach = (coachId: number, coach: TTeamCoach) => {
  return axiosConfigJSON.post(`/trainers/update/${coachId}`, JSON.stringify(coach));
};

export {
  getAllPlayers,
  getPlayer,
  deletePlayer,
  createPlayer,
  updatePlayer,
  getAllCategories,
  updateCategory,
  createCategory,
  deleteCategory,
  getAllEditions,
  createEdition,
  deleteEdition,
  updateEdition,
  getAllCoaches,
  deleteCoach,
  createCoach,
  updateCoach,
  getAllCategoriesSWRKey,
  getAllEditionsSWRKey,
};
