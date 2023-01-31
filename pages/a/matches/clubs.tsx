import { GetServerSidePropsContext, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect } from 'react';
import { IClubsPage } from '../../../components/matches/Interfaces';
import MatchesHeader from '../../../components/matches/MatchesHeader';
import MatchesTable from '../../../components/matches/MatchesTable';
import Layout from '../../../components/shared/Layout';
import { useClubs } from '../../../context/ContextClub';
import { useTab } from '../../../context/ContextTab';
import { getAllClubs } from '../../../services/Match.service';

const ClubsPage: NextPage<IClubsPage> = ({ data }) => {
  const { setClubs } = useClubs();
  const { setTab } = useTab();

  useEffect(() => {
    setClubs(data);
  }, [data, setClubs]);

  useEffect(() => {
    setTab({ tabId: 1, title: 'Cluburi', href: '/a/matches/clubs', value: 1 });
  }, [setTab]);

  return (
    <Layout {...{ bgColor: 'var(--blue-500)' }}>
      <MatchesHeader {...{ isUsedInAdminPage: true, isUsedInClubsPage: true }} />
      <MatchesTable />
    </Layout>
  );
};
export default ClubsPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = await getSession(ctx);
    const { data } = await getAllClubs();
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
