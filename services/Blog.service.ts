import { TBlogArticle } from '../components/blog/Interfaces';
import { axiosConfigJSON } from './AxiosConfig';

const getAllArticles = () => {
  return axiosConfigJSON.get('/blog/get/all');
};

const getAllArticlesIds = () => {
  return axiosConfigJSON.get('/blog/get/ids');
};

const getArticle = (articleId: number) => {
  return axiosConfigJSON.get(`/blog/get/${articleId}`);
};

const deleteArticle = (articleId: number) => {
  return axiosConfigJSON.delete(`/blog/delete/${articleId}`);
};

const createArticle = (article: TBlogArticle) => {
  return axiosConfigJSON.post('/blog/create', JSON.stringify(article));
};

const updateArticle = (articleId: number, article: TBlogArticle) => {
  return axiosConfigJSON.post(`/blog/update/${articleId}`, JSON.stringify(article));
};

export { getAllArticles, getAllArticlesIds, getArticle, deleteArticle, createArticle, updateArticle };
