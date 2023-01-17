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
