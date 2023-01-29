import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Layout from '../../components/shared/Layout';
import { TSearchTeam, TTeamPlayer } from '../../components/team/Interfaces';
import TeamHeader from '../../components/team/TeamHeader';
import TeamList from '../../components/team/TeamList';

const CoachesPage = () => {
  const [search, setSearch] = useState<TSearchTeam>({});
  const players: TTeamPlayer[] = [];

  useEffect(() => {
    console.log(search);
  }, [search]);

  return (
    <Layout {...{ bgColor: 'var(--blue-600)' }}>
      <TeamHeader {...{ setSearch, isUsedOnCoachPage: true }} />
      <TeamList {...{ players }} />
    </Layout>
  );
};

export default CoachesPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);
  return {
    props: {
      session,
    },
  };
};
