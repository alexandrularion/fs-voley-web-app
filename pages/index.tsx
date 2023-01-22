import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import Layout, { LayoutContainer } from '../components/shared/Layout';

const HomePage = () => {
  return (
    <Layout>
      <LayoutContainer></LayoutContainer>
    </Layout>
  );
};
export default HomePage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);
  return {
    props: {
      session,
    },
  };
};
