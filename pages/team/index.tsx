import { GetServerSidePropsContext, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Layout from '../../components/shared/Layout';
import { ITeamPlayersPage, TBETeamPlayer, TSearchTeam, TTeamPlayer } from '../../components/team/Interfaces';
import TeamHeader from '../../components/team/TeamHeader';
import TeamList from '../../components/team/TeamList';
import { useTeamPlayers } from '../../context/ContextTeamPlayers';
import { getAllPlayers } from '../../services/Team.service';

const TeamPlayersPage: NextPage<ITeamPlayersPage> = ({ data }) => {
  const [search, setSearch] = useState<TSearchTeam>({});
  const { setTeamPlayers, teamPlayers } = useTeamPlayers();

  useEffect(() => {
    if (search?.query || search?.categoryId || search?.editionId) {
      setTeamPlayers(
        teamPlayers.filter(({ name, surName, categoryId, editionId, ...rest }) => {
          if (
            (search?.query && (name.includes(search?.query) || surName.includes(search?.query))) ||
            (search?.categoryId && categoryId === Number(search?.categoryId)) ||
            (search?.editionId && editionId === Number(search?.editionId))
          ) {
            return { ...rest, name, surName, categoryId, editionId };
          }
        })
      );
    } else {
      setTeamPlayers(data);
    }
    /* eslint-disable-next-line */
  }, [search, data, setTeamPlayers]);

  return (
    <Layout {...{ bgColor: 'var(--blue-600)' }}>
      <TeamHeader {...{ setSearch }} />
      <TeamList />
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
          ({ id, image, first_name, last_name, position, shirtNumber }: TBETeamPlayer) =>
            ({
              id,
              image,
              name: first_name,
              surName: last_name,
              position,
              shirtNumber,
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
