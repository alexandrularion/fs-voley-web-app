import { GetServerSidePropsContext, NextPage } from 'next';
import Layout from '../../components/shared/Layout';
import { SponsorsHeader, SponsorsList } from '../../components/sponsors';
import { useEffect } from 'react';
import { getSession } from 'next-auth/react';
import { useTab } from '../../context/ContextTab';
import { getAllSponsors } from '../../services/Sponsors.service';
import { ISponsorsPage } from '../a/sponsors';

const SponsorsPage: NextPage<ISponsorsPage> = ({ data }) => {
  const { tab, setTab } = useTab();

  useEffect(() => {
    if (tab) {
      console.log(tab);
    } else {
      setTab({ tabId: 0, title: 'Din toti anii', value: 0 });
    }
  }, [tab, setTab]);
  return (
    <Layout>
      <SponsorsHeader />
      <SponsorsList {...{ data }} />
    </Layout>
  );
};
export default SponsorsPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);
  const { data } = await getAllSponsors();

  console.log(data);

  return {
    props: {
      session,
      data: data?.map(({ image_url, website, date_start, date_end, title }: any) => ({ logo: image_url, site: website, startdate: date_start, endDate: date_end, title  })),
    },
  };
};
