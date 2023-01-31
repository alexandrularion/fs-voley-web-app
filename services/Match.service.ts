import { TBEMatch, TMatchChampionship, TMatchClub } from '../components/matches/Interfaces';
import { axiosConfigJSON } from './AxiosConfig';

const getAllChampionshipsSWRKey = '/championship/get/all';

const getAllMatches = () => {
  return axiosConfigJSON.get('/match/get/all');
};

const deleteMatch = (matchId: number) => {
  return axiosConfigJSON.delete(`/match/delete/${matchId}`);
};

const createMatch = (match: TBEMatch) => {
  return axiosConfigJSON.post('/match/create', JSON.stringify(match));
};

const updateMatch = (matchId: number, match: TBEMatch) => {
  return axiosConfigJSON.post(`/match/update/${matchId}`, JSON.stringify(match));
};

const getAllChampionships = () => {
  return axiosConfigJSON.get('/championship/get/all');
};

const deleteChampionship = (championshipId: number) => {
  return axiosConfigJSON.delete(`/championship/delete/${championshipId}`);
};

const createChampionship = (championship: TMatchChampionship) => {
  return axiosConfigJSON.post('/championship/create', JSON.stringify(championship));
};

const updateChampionship = (championshipId: number, championship: TMatchChampionship) => {
  return axiosConfigJSON.post(`/championship/update/${championshipId}`, JSON.stringify(championship));
};

const getAllClubs = () => {
  return axiosConfigJSON.get('/club/get/all');
};

const deleteClub = (clubId: number) => {
  return axiosConfigJSON.delete(`/club/delete/${clubId}`);
};

const createClub = (club: TMatchClub) => {
  return axiosConfigJSON.post('/club/create', JSON.stringify(club));
};

const updateClub = (clubId: number, club: TMatchClub) => {
  return axiosConfigJSON.post(`/club/update/${clubId}`, JSON.stringify(club));
};

export {
  getAllChampionshipsSWRKey,
  getAllClubs,
  deleteClub,
  createClub,
  updateClub,
  getAllMatches,
  deleteMatch,
  createMatch,
  updateMatch,
  getAllChampionships,
  deleteChampionship,
  createChampionship,
  updateChampionship,
};
