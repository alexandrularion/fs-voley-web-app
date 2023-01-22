import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import Layout from '../../components/shared/Layout';

const BlogPage = () => {
  return <Layout>asdasd</Layout>;
};
export default BlogPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);
  return {
    props: {
      session,
    },
  };
};
