import { axiosConfigJSON } from './AxiosConfig';

const getAllSponsors = () => {
  return axiosConfigJSON.get('/sponsors/all');
};

export { getAllSponsors };
