import { THistory } from '../components/history/Interfaces';
import { axiosConfigJSON } from './AxiosConfig';

const getAllHistory = () => {
  return axiosConfigJSON.get('/history/get/all');
};

const deleteHistory = (historyId: number) => {
  return axiosConfigJSON.delete(`/history/delete/${historyId}`);
};

const createHistory = (history: THistory) => {
  return axiosConfigJSON.post('/history/create', JSON.stringify(history));
};

const updateHistory = (historyId: number, history: THistory) => {
  return axiosConfigJSON.post(`/history/update/${historyId}`, JSON.stringify(history));
};

export { getAllHistory, deleteHistory, createHistory, updateHistory };
