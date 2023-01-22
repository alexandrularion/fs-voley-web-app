import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { IMatchesCard, TSearchMatches } from '../../components/matches/Interfaces';
import MatchesHeader from '../../components/matches/MatchesHeader';
import MatchesList from '../../components/matches/MatchesList';
import Layout from '../../components/shared/Layout';

const FutureMatchesPage = () => {
  const [search, setSearch] = useState<TSearchMatches>({});
  const matches: IMatchesCard[] = [
    {
      date: new Date('1/19/2023 7:23 PM').toString(),
      championship: 'Campionatul X',
      edition: '2022-2023',
      location: 'Suceava, Romania',
      teams: [
        {
          logo: 'https://i.imgur.com/HanfA7L.png',
          name: 'C.S.M Suceava',
        },
        {
          logo: 'https://i.imgur.com/HanfA7L.png',
          name: 'C.S.M Suceava',
        },
      ],
      link: 'https://google.com',
      league: 'Liga 1',
    },
    {
      date: new Date('1/19/2023 7:23 PM').toString(),
      championship: 'Campionatul X',
      edition: '2022-2023',
      location: 'Suceava, Romania',
      teams: [
        {
          logo: 'https://i.imgur.com/HanfA7L.png',
          name: 'C.S.M Suceava',
        },
        {
          logo: 'https://i.imgur.com/HanfA7L.png',
          name: 'C.S.M Suceava',
        },
      ],
      link: 'https://google.com',
      league: 'Liga 1',
    },
  ];

  useEffect(() => {
    console.log(search);
  }, [search]);

  return (
    <Layout {...{ bgColor: 'var(--blue-500)' }}>
      <MatchesHeader {...{ setSearch }} />
      <MatchesList {...{ matches }} />
    </Layout>
  );
};
export default FutureMatchesPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);
  return {
    props: {
      session,
    },
  };
};
