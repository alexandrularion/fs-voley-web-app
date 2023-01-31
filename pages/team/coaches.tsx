import { GetServerSidePropsContext, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Layout from '../../components/shared/Layout';
import { ICoachesPage, TBETeamCoach, TSearchTeam, TTeamCoach } from '../../components/team/Interfaces';
import TeamHeader from '../../components/team/TeamHeader';
import TeamList from '../../components/team/TeamList';
import { useTab } from '../../context/ContextTab';
import { useTeamCoaches } from '../../context/ContextTeamCoaches';
import { getAllCoaches } from '../../services/Team.service';

const CoachesPage: NextPage<ICoachesPage> = ({ data }) => {
  const [search, setSearch] = useState<TSearchTeam>({});
  const { setTeamCoaches } = useTeamCoaches();
  const { setTab } = useTab();

  useEffect(() => {
    if (search?.query) {
      setTeamCoaches(data?.filter(({ name, surName }: TTeamCoach) => name.toLowerCase().includes(search.query!.toLowerCase()) || surName.toLowerCase().includes(search.query!.toLowerCase())));
    } else {
      setTeamCoaches(data);
    }
  }, [data, search, setTeamCoaches]);

  useEffect(() => {
    setTab({ tabId: 1, title: 'Antrenori', href: '/team/coaches', value: 1 });
  }, [setTab]);

  return (
    <Layout {...{ bgColor: 'var(--blue-600)' }}>
      <TeamHeader {...{ setSearch, isUsedOnCoachPage: true }} />
      <TeamList {...{ isUsedInCoachPage: true }} />
    </Layout>
  );
};

export default CoachesPage;

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
