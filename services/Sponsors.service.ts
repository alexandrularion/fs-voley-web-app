import { TBESponsor } from '../components/sponsors/Interfaces';
import { axiosConfigJSON } from './AxiosConfig';

const getAllSponsors = () => {
  return axiosConfigJSON.get('/sponsors/all');
};

const deleteSponsor = (sponsordId: number) => {
  return axiosConfigJSON.delete(`/sponsors/delete/${sponsordId}`);
};

const createSponsor = (sponsor: TBESponsor) => {
  return axiosConfigJSON.post('/sponsors/create', JSON.stringify(sponsor));
};
export { getAllSponsors, deleteSponsor, createSponsor };
