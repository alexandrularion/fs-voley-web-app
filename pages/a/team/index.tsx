import { GetServerSidePropsContext, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Layout from '../../../components/shared/Layout';
import { ITeamPlayersPage, TBETeamPlayer, TSearchTeam, TTeamPlayer } from '../../../components/team/Interfaces';
import TeamHeader from '../../../components/team/TeamHeader';
import TeamPlayersTable from '../../../components/team/TeamPlayersTable';
import { useTab } from '../../../context/ContextTab';
import { useTeamPlayers } from '../../../context/ContextTeamPlayers';
import { getAllPlayers } from '../../../services/Team.service';

const TeamPlayersPage: NextPage<ITeamPlayersPage> = ({ data }) => {
  const [search, setSearch] = useState<TSearchTeam>({});
  const { setTab } = useTab();
  const { setTeamPlayers } = useTeamPlayers();

  useEffect(() => {
    if (search.query || search.categoryId || search.editionId) {
      // setTeamPlayers(data.filter(({ startDate }: TSponsor) => Number(startDate) === tab.value));
    } else {
      setTeamPlayers(data);
    }
  }, [search, data, setTeamPlayers]);

  useEffect(() => {
    setTab({ tabId: 0, title: 'Jucatori', href: '/a/team', value: 0 });
  }, [setTab]);

  return (
    <Layout {...{ bgColor: 'var(--grey-alpha-100)' }}>
      <TeamHeader {...{ setSearch, isUsedInAdminPage: true }} />
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
          ({ id, image, first_name, last_name, position, height, birthday, nationality, description, shirtNumber }: TBETeamPlayer) =>
            ({
              id,
              image,
              name: first_name,
              surName: last_name,
              position,
              shirtNumber,
              height,
              birthday,
              nationality,
              description,
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