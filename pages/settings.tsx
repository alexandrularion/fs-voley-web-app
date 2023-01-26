import { GetServerSidePropsContext, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { SettingsContent } from '../components/settings';
import Layout from '../components/shared/Layout';

const SettingsPage: NextPage = () => {
  return (
    <Layout>
      <SettingsContent />
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
