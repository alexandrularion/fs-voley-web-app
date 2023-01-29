import { GetServerSidePropsContext, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Layout from '../../../components/shared/Layout';
import { ITeamCategoriesPage, TSearchTeam, TTeamCategory } from '../../../components/team/Interfaces';
import TeamCategoriesTable from '../../../components/team/TeamCategoriesTable';
import TeamHeader from '../../../components/team/TeamHeader';
import { useTab } from '../../../context/ContextTab';
import { useTeamCategories } from '../../../context/ContextTeamCategory';
import { getAllCategories } from '../../../services/Team.service';

const TeamCategoriesPage: NextPage<ITeamCategoriesPage> = ({ data }) => {
  const [search, setSearch] = useState<TSearchTeam>({});
  const { setTeamCategories } = useTeamCategories();
  const { setTab } = useTab();

  useEffect(() => {
    if (search.query) {
      setTeamCategories(data.filter(({ title }: TTeamCategory) => title.toLowerCase().includes(search.query!.toLowerCase())));
    } else {
      setTeamCategories(data);
    }
  }, [search, data, setTeamCategories]);

  useEffect(() => {
    setTab({ tabId: 2, title: 'Categorii', href: '/a/team/categories', value: 2 });
  }, [setTab]);

  return (
    <Layout {...{ bgColor: 'var(--grey-alpha-100)' }}>
      <TeamHeader {...{ setSearch, isUsedInAdminPage: true, isUsedInCategoryPage: true }} />
      <TeamCategoriesTable />
    </Layout>
  );
};

export default TeamCategoriesPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = await getSession(ctx);
    const { data } = await getAllCategories();
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
