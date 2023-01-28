import { GetServerSidePropsContext, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { TTableFilter } from '../../components/shared/Interfaces';
import Layout from '../../components/shared/Layout';
import { TBEUser, TUser } from '../../components/users/Interfaces';
import UsersHeader from '../../components/users/UsersHeader';
import UsersTable from '../../components/users/UsersTable';
import { useTab } from '../../context/ContextTab';
import { useUsers } from '../../context/ContextUsers';
import { getAllUsers } from '../../services/User.service';

export interface IUsersPage {
  data: TUser[];
}

const UsersPage: NextPage<IUsersPage> = ({ data }) => {
  const { tab, setTab } = useTab();
  const { setUsers } = useUsers();
  const [filter, setFilter] = useState<TTableFilter>();

  useEffect(() => {
    if (tab) {
      setFilter({ columnId: 'role', value: tab.value });
    }
  }, [tab]);

  useEffect(() => {
    setTab({ tabId: 0, title: 'Toti utilizatorii', value: 0 });
  }, [setTab]);

  useEffect(() => {
    setUsers(data);
  }, [data, setUsers]);

  return (
    <Layout {...{ bgColor: 'var(--grey-alpha-100)' }}>
      <UsersHeader />
      <UsersTable {...{ filter }} />
    </Layout>
  );
};

export default UsersPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = await getSession(ctx);
    const { data } = await getAllUsers();

    return {
      props: {
        session,
        data: data?.map(({ id, first_name, last_name, email, role }: TBEUser) => ({ id, firstName: first_name, lastName: last_name, role, email } as TUser)),
      },
    };
  } catch (err) {
    return {
      props: {
        session: {},
        data: [],
      },
    };
  }
};
