import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import Layout, { LayoutContainer } from '../components/shared/Layout';

const HistoryPage = () => {
  return (
    <Layout>
      <LayoutContainer></LayoutContainer>
    </Layout>
  );
};
export default HistoryPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);
  return {
    props: {
      session,
    },
  };
};
