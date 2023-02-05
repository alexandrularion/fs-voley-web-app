import { GetServerSidePropsContext, NextPage } from 'next';
import Layout from '../../components/shared/Layout';
import { useEffect } from 'react';
import { getSession } from 'next-auth/react';
import { getAllHistory } from '../../services/History.service';
import HistoryHeader from '../../components/history/HistoryHeader';
import { useHistories } from '../../context/ContextHistory';
import { IHistoryPage } from '../../components/history/Interfaces';
import HistoryTable from '../../components/history/HistoryTable';

const HistoryPage: NextPage<IHistoryPage> = ({ data }) => {
  const { setHistories } = useHistories();

  useEffect(() => {
    setHistories(data);
  }, [data, setHistories]);

  return (
    <Layout {...{ bgColor: 'var(--grey-alpha-100)' }}>
      <HistoryHeader />
      <HistoryTable />
    </Layout>
  );
};
export default HistoryPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = await getSession(ctx);
    const { data } = await getAllHistory();

    console.log(data);
    return {
      props: {
        session,
        data,
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
