import { GetServerSidePropsContext, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Layout from '../../../components/shared/Layout';
import { ITeamCategoriesPage, TSearchTeam, TTeamEdition } from '../../../components/team/Interfaces';
import TeamEditionsTable from '../../../components/team/TeamEditionsTable';
import TeamHeader from '../../../components/team/TeamHeader';
import { useTab } from '../../../context/ContextTab';
import { useTeamEditions } from '../../../context/ContextTeamEdition';
import { getAllEditions } from '../../../services/Team.service';

const TeamEditionsPage: NextPage<ITeamCategoriesPage> = ({ data }) => {
  const [search, setSearch] = useState<TSearchTeam>({});
  const { setTeamEditions } = useTeamEditions();
  const { setTab } = useTab();

  useEffect(() => {
    if (search.query) {
      setTeamEditions(data.filter(({ title }: TTeamEdition) => title.toLowerCase().includes(search.query!.toLowerCase())));
    } else {
      setTeamEditions(data);
    }
  }, [search, data, setTeamEditions]);

  useEffect(() => {
    setTab({ tabId: 3, title: 'Editii', href: '/a/team/editions', value: 3 });
  }, [setTab]);

  return (
    <Layout {...{ bgColor: 'var(--grey-alpha-100)' }}>
      <TeamHeader {...{ setSearch, isUsedInAdminPage: true, isUsedInEditionPage: true }} />
      <TeamEditionsTable />
    </Layout>
  );
};

export default TeamEditionsPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = await getSession(ctx);
    const { data } = await getAllEditions();
    return {
      props: {
        session,
        data,
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
