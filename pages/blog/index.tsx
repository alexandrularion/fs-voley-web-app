import { GetServerSidePropsContext, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect } from 'react';
import BlogHeader from '../../components/blog/BlogHeader';
import BlogList from '../../components/blog/BlogList';
import { IBlogPage } from '../../components/blog/Interfaces';
import Layout from '../../components/shared/Layout';
import { useBlogArticles } from '../../context/ContextBlogArticle';
import { useTab } from '../../context/ContextTab';
import { getAllArticles } from '../../services/Blog.service';
import { getDaysAgoData } from '../../utils';

const BlogPage: NextPage<IBlogPage> = ({ data }) => {
  const { setTab, tab} = useTab();
  const { setBlogArticles } = useBlogArticles();

  useEffect(() => {
    setTab({ tabId: 0, value: 0, title: '' });
  }, [setTab]);

  useEffect(() => {
    if(tab){
      setBlogArticles( tab?.value ? getDaysAgoData(data,tab.value as number) : data);
    }
  },[tab]);

  useEffect(() => {
    setBlogArticles(data);
  }, [data, setBlogArticles]);

  return (
    <Layout>
      <BlogHeader />
      <BlogList />
    </Layout>
  );
};

export default BlogPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = await getSession(ctx);
    const { data } = await getAllArticles();
    
    return {
      props: {
        session,
        data,
      },
    };
  } catch (e) {
    return {
      props: {
        session: {},
        data: [],
      },
    };
  }
};
