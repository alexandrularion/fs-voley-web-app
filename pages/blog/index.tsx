import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect } from 'react';
import BlogHeader from '../../components/blog/BlogHeader';
import BlogList from '../../components/blog/BlogList';
import Layout from '../../components/shared/Layout';
import { useTab } from '../../context/ContextTab';
import { getAllArticle } from '../../services/Blog.service';

const BlogPage = () => {
  const { setTab } = useTab();

  useEffect(() => {
    setTab({ tabId: 0, value: 0, title: '' });
  }, [setTab]);

  return (
    <Layout {...{ bgColor: 'var(--grey-alpha-100)' }}>
      <BlogHeader />
      <BlogList />
    </Layout>
  );
};

export default BlogPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);
  const data = await getAllArticle();

  console.log(data);
  return {
    props: {
      session,
    },
  };
};
