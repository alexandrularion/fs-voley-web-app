import { GetServerSidePropsContext, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect } from 'react';
import { IChampionshipsPage } from '../../../components/matches/Interfaces';
import MatchesChampionshipsTable from '../../../components/matches/MatchesChampionshipsTable';
import MatchesHeader from '../../../components/matches/MatchesHeader';
import Layout from '../../../components/shared/Layout';
import { useChampionships } from '../../../context/ContextChampionship';
import { useTab } from '../../../context/ContextTab';
import { getAllChampionships } from '../../../services/Match.service';

const ChampionshipsPage: NextPage<IChampionshipsPage> = ({ data }) => {
  const { setChampionships } = useChampionships();
  const { setTab } = useTab();

  useEffect(() => {
    setChampionships(data);
  }, [data, setChampionships]);

  useEffect(() => {
    setTab({ tabId: 2, title: 'Campionate', href: '/a/matches/championships', value: 2 });
  }, [setTab]);

  return (
    <Layout {...{ bgColor: 'var(--blue-500)' }}>
      <MatchesHeader {...{ isUsedInAdminPage: true, isUsedInChampionshipPage: true }} />
      <MatchesChampionshipsTable />
    </Layout>
  );
};
export default ChampionshipsPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = await getSession(ctx);
    const { data } = await getAllChampionships();
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
