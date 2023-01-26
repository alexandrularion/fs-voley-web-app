import { GetServerSidePropsContext, NextPage } from 'next';
import Layout from '../../components/shared/Layout';
import { SponsorsHeader, SponsorsList } from '../../components/sponsors';
import { useEffect } from 'react';
import { getSession } from 'next-auth/react';
import { useTab } from '../../context/ContextTab';
import { getAllSponsors } from '../../services/Sponsors.service';
import { ISponsorsPage } from '../a/sponsors';
import { TSponsor } from '../../components/sponsors/Interfaces';
import { useSponsors } from '../../context/ContextSponsors';

const SponsorsPage: NextPage<ISponsorsPage> = ({ data }) => {
  const { tab, setTab } = useTab();
  const { setSponsors } = useSponsors();

  useEffect(() => {
    if (tab && tab.value !== 0) {
      setSponsors(data.filter(({ startDate }: TSponsor) => Number(startDate) === tab.value));
    } else {
      setSponsors(data);
    }
  }, [tab, data, setSponsors]);

  useEffect(() => {
    setTab({ tabId: 0, title: 'Din toti anii', value: 0 });
  }, [setTab]);

  return (
    <Layout>
      <SponsorsHeader />
      <SponsorsList />
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
