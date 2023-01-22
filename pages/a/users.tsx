import { GetServerSidePropsContext, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Layout, { LayoutContainer } from '../../components/shared/Layout';

const UsersPage: NextPage = () => {
  return (
    <Layout>
      <LayoutContainer />
    </Layout>
  );
};

export default UsersPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);
  return {
    props: {
      session,
    },
  };
};
