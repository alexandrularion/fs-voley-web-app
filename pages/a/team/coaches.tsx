import { GetServerSidePropsContext, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Layout from '../../../components/shared/Layout';
import { ICoachesPage, TBETeamCoach, TSearchTeam, TTeamCoach } from '../../../components/team/Interfaces';
import TeamCoachesTable from '../../../components/team/TeamCoachesTable';
import TeamHeader from '../../../components/team/TeamHeader';
import { useTab } from '../../../context/ContextTab';
import { useTeamCoaches } from '../../../context/ContextTeamCoaches';
import { getAllCoaches } from '../../../services/Team.service';

const TeamPlayersPage: NextPage<ICoachesPage> = ({ data }) => {
  const [search, setSearch] = useState<TSearchTeam>({});
  const { setTeamCoaches } = useTeamCoaches();
  const { setTab } = useTab();

  useEffect(() => {
    if (search.query) {
      setTeamCoaches(data?.filter(({ name, surName }: TTeamCoach) => name.toLowerCase().includes(search.query!.toLowerCase()) || surName.toLowerCase().includes(search.query!.toLowerCase())));
    } else {
      setTeamCoaches(data);
    }
  }, [search, data, setTeamCoaches]);

  useEffect(() => {
    setTab({ tabId: 1, title: 'Antrenori', href: '/a/team/coaches', value: 1 });
  }, [setTab]);

  return (
    <Layout {...{ bgColor: 'var(--grey-alpha-100)' }}>
      <TeamHeader {...{ setSearch, isUsedInAdminPage: true, isUsedOnCoachPage: true }} />
      <TeamCoachesTable />
    </Layout>
  );
};

export default TeamPlayersPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = await getSession(ctx);
    const { data } = await getAllCoaches();
    return {
      props: {
        session,
        data: data?.map(
          ({ id, image, first_name, last_name, description }: TBETeamCoach) =>
            ({
              id,
              image,
              name: first_name,
              surName: last_name,
              description,
            } as TTeamCoach)
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
