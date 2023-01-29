import { TBETeamPlayer } from '../components/team/Interfaces';
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

export { getAllPlayers, getPlayer, deletePlayer, createPlayer, updatePlayer };
