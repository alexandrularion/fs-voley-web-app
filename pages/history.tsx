import { GetServerSidePropsContext, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect } from 'react';
import HistoryList from '../components/history/HistoryList';
import HistoryShortHeader from '../components/history/HistoryShortHeader';
import { IHistoryPage } from '../components/history/Interfaces';
import Layout from '../components/shared/Layout';
import { useHistories } from '../context/ContextHistory';
import { getAllHistory } from '../services/History.service';

const HistoryPage: NextPage<IHistoryPage> = ({ data }) => {
  const { setHistories } = useHistories();

  useEffect(() => {
    setHistories(data);
  }, [data, setHistories]);

  return (
    <Layout>
      <HistoryShortHeader />
      <HistoryList />
    </Layout>
  );
};
export default HistoryPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = await getSession(ctx);
    const { data } = await getAllHistory();
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
