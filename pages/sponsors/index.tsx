import { GetServerSidePropsContext, NextPage } from 'next';
import Layout from '../../components/shared/Layout';
import { SponsorsHeader, SponsorsList } from '../../components/sponsors';
import { TSponsor } from '../../components/sponsors/Interfaces';
import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';

const SponsorsPage: NextPage = () => {
  const [tab, setTab] = useState<number>(0);

  const sponsors: TSponsor[] = [
    {
      logo: 'https://assist-software.net/sites/all/themes/assist/logo-lightblue.svg',
      title: 'Assist Software',
      site: 'assist-software.net',
      startDate: new Date().toString(),
      endDate: new Date().toString(),
    },
    {
      logo: 'https://assist-software.net/sites/all/themes/assist/logo-lightblue.svg',
      title: 'Assist Software',
      site: 'assist-software.net',
      startDate: new Date().toString(),
      endDate: new Date().toString(),
    },
    {
      logo: 'https://assist-software.net/sites/all/themes/assist/logo-lightblue.svg',
      title: 'Assist Software',
      site: 'assist-software.net',
      startDate: new Date().toString(),
      endDate: new Date().toString(),
    },
    {
      logo: 'https://assist-software.net/sites/all/themes/assist/logo-lightblue.svg',
      title: 'Assist Software',
      site: 'assist-software.net',
      startDate: new Date().toString(),
      endDate: new Date().toString(),
    },
    {
      logo: 'https://assist-software.net/sites/all/themes/assist/logo-lightblue.svg',
      title: 'Assist Software',
      site: 'assist-software.net',
      startDate: new Date().toString(),
      endDate: new Date().toString(),
    },
    {
      logo: 'https://assist-software.net/sites/all/themes/assist/logo-lightblue.svg',
      title: 'Assist Software',
      site: 'assist-software.net',
      startDate: new Date().toString(),
      endDate: new Date().toString(),
    },
  ];

  useEffect(() => {
    console.log(tab);
  }, [tab]);
  return (
    <Layout>
      <SponsorsHeader {...{ setTab, tab }} />
      <SponsorsList {...{ sponsors }} />
    </Layout>
  );
};
export default SponsorsPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);
  return {
    props: {
      session,
    },
  };
};
