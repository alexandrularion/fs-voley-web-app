import { GetServerSidePropsContext, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Layout, { LayoutContainer } from '../components/shared/Layout';

const SettingsPage: NextPage = () => {
  return (
    <Layout>
      <LayoutContainer />
    </Layout>
  );
};

export default SettingsPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);
  return {
    props: {
      session,
    },
  };
};
