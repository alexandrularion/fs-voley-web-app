import { useContext, useState, createContext, Dispatch, SetStateAction } from 'react';
import { TBlogArticle } from '../components/blog/Interfaces';
import { ICommonCtx } from './Interfaces';

const ContextBlogArticle = createContext<{ blogArticles: TBlogArticle[]; setBlogArticles: Dispatch<SetStateAction<TBlogArticle[]>> }>({
  blogArticles: [],
  setBlogArticles: () => () => [],
});

export const BlogArticleProvider: React.FC<ICommonCtx> = ({ children }) => {
  const [blogArticles, setBlogArticles] = useState<TBlogArticle[]>([]);
  const value = { blogArticles, setBlogArticles };

  return <ContextBlogArticle.Provider {...{ value }}>{children}</ContextBlogArticle.Provider>;
};

export const useBlogArticles = () => {
  const context = useContext(ContextBlogArticle);
  if (context === undefined) {
    throw new Error('useBlogArticles must be used within a BlogArticleProvider');
  }
  return context;
};
