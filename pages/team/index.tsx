import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Layout from '../../components/shared/Layout';
import { TSearchTeam, TTeamPlayer } from '../../components/team/Interfaces';
import TeamHeader from '../../components/team/TeamHeader';
import TeamList from '../../components/team/TeamList';

export default function Home() {
  const [search, setSearch] = useState<TSearchTeam>({});
  const players: TTeamPlayer[] = [
    {
      name: 'Pop',
      surName: 'Darius',
      shirtNumber: 2,
      position: 'Centru',
      image: 'https://i.imgur.com/4wP4XIX.png',
    },
    {
      name: 'Pop',
      surName: 'Darius',
      shirtNumber: 2,
      position: 'Centru',
      image: 'https://i.imgur.com/4wP4XIX.png',
    },
    {
      name: 'Pop',
      surName: 'Darius',
      shirtNumber: 2,
      position: 'Centru',
      image: 'https://i.imgur.com/4wP4XIX.png',
    },
    {
      name: 'Pop',
      surName: 'Darius',
      shirtNumber: 2,
      position: 'Centru',
      image: 'https://i.imgur.com/4wP4XIX.png',
    },
    {
      name: 'Pop',
      surName: 'Darius',
      shirtNumber: 2,
      position: 'Centru',
      image: 'https://i.imgur.com/4wP4XIX.png',
    },
    {
      name: 'Pop',
      surName: 'Darius',
      shirtNumber: 2,
      position: 'Centru',
      image: 'https://i.imgur.com/4wP4XIX.png',
    },
  ];

  useEffect(() => {
    console.log(search);
  }, [search]);

  return (
    <Layout {...{ bgColor: 'var(--blue-600)' }}>
      <TeamHeader {...{ setSearch }} />
      <TeamList {...{ players }} />
    </Layout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);
  return {
    props: {
      session,
    },
  };
};
