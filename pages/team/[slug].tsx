import { GetServerSidePropsContext, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Layout from '../../components/shared/Layout';
import { getPlayer } from '../../services/Team.service';

const PlayerProfilePage: NextPage = () => {
  return <Layout {...{ bgColor: 'var(--blue-600)' }}>asdasd</Layout>;
};

export default PlayerProfilePage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = await getSession(ctx);
    const { data } = await getPlayer(2);
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
        data: {},
      },
    };
  }
};
