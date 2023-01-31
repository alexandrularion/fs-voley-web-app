import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { TSearchMatches } from '../../components/matches/Interfaces';
import MatchesHeader from '../../components/matches/MatchesHeader';
import Layout from '../../components/shared/Layout';
import { useTab } from '../../context/ContextTab';

const ResultsMatchesPage = () => {
  const [search, setSearch] = useState<TSearchMatches>({});
  const { setTab } = useTab();

  useEffect(() => {
    console.log(search);
  }, [search]);

  useEffect(() => {
    setTab({ tabId: 1, title: 'Rezultate', href: '/matches/results', value: 1 });
  }, [setTab]);

  return (
    <Layout>
      <MatchesHeader {...{ setSearch }} />
    </Layout>
  );
};
export default ResultsMatchesPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);
  return {
    props: {
      session,
    },
  };
};
