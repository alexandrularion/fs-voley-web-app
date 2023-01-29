import { GetServerSidePropsContext, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Layout from '../../../components/shared/Layout';
import { ITeamPlayersPage, TBETeamPlayer, TSearchTeam, TTeamPlayer } from '../../../components/team/Interfaces';
import TeamHeader from '../../../components/team/TeamHeader';
import TeamPlayersTable from '../../../components/team/TeamPlayersTable';
import { useTeamPlayers } from '../../../context/ContextTeamPlayers';
import { getAllPlayers } from '../../../services/Team.service';

const TeamPlayersPage: NextPage<ITeamPlayersPage> = ({ data }) => {
  const [search, setSearch] = useState<TSearchTeam>({});
  const { setTeamPlayers } = useTeamPlayers();

  useEffect(() => {
    if (search) {
      // setTeamPlayers(data.filter(({ startDate }: TSponsor) => Number(startDate) === tab.value));
    } else {
      setTeamPlayers(data);
    }
  }, [search, data, setTeamPlayers]);

  return (
    <Layout {...{ bgColor: 'var(--blue-600)' }}>
      <TeamHeader {...{ setSearch }} />
      <TeamPlayersTable />
    </Layout>
  );
};

export default TeamPlayersPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = await getSession(ctx);
    const { data } = await getAllPlayers();
    return {
      props: {
        session,
        data: data?.map(
          ({ id, image, first_name, last_name, position }: TBETeamPlayer) =>
            ({
              id,
              image,
              name: first_name,
              surName: last_name,
              position,
              shirtNumber: 2,
            } as TTeamPlayer)
        ),
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
