import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { TSearchMatches } from '../../components/matches/Interfaces';
import MatchesHeader from '../../components/matches/MatchesHeader';
import Layout from '../../components/shared/Layout';

const RankingMatchesPage = () => {
  const [search, setSearch] = useState<TSearchMatches>({});

  useEffect(() => {
    console.log(search);
  }, [search]);

  return (
    <Layout>
      <MatchesHeader {...{ setSearch, areFiltrablesVisible: false }} />
    </Layout>
  );
};
export default RankingMatchesPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);
  return {
    props: {
      session,
    },
  };
};
