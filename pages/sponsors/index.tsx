import { GetServerSidePropsContext, NextPage } from 'next';
import Layout from '../../components/shared/Layout';
import { SponsorsHeader, SponsorsList } from '../../components/sponsors';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { useTab } from '../../context/ContextTab';
import { getAllSponsors, sponsorsKeys } from '../../services/Sponsors.service';
import { ISponsorsPage } from '../a/sponsors';
import { TSponsor } from '../../components/sponsors/Interfaces';
import useSWR from 'swr';
import { fetcher } from '../../utils';

const SponsorsPage: NextPage<ISponsorsPage> = ({ data }) => {
  const { getAllSponsorsKey } = sponsorsKeys;
  const { tab, setTab } = useTab();
  const [currentData, setCurrentData] = useState<TSponsor[]>(data);
  const { data: sponsors } = useSWR(getAllSponsorsKey, fetcher, { fallbackData: data });

  useEffect(() => {
    if (tab && tab.value !== 0) {
      setCurrentData(sponsors.filter(({ startDate }: TSponsor) => new Date(startDate).getFullYear() === tab.value));
    } else {
      setCurrentData(sponsors);
    }
    /* eslint-disable-next-line */
  }, [tab]);

  useEffect(() => {
    setTab({ tabId: 0, title: 'Din toti anii', value: 0 });
  }, [setTab]);

  return (
    <Layout>
      <SponsorsHeader />
      <SponsorsList {...{ data: currentData }} />
    </Layout>
  );
};
export default SponsorsPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = await getSession(ctx);
    const { data } = await getAllSponsors();
    return {
      props: {
        session,
        data: data?.map(({ image_url, website, date_start, date_end, title, id }: any) => ({ id, logo: image_url, site: website, startDate: date_start, endDate: date_end, title })),
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
