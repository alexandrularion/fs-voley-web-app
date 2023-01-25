import { GetServerSidePropsContext, NextPage } from 'next';
import Layout from '../../components/shared/Layout';
import { SponsorsHeader } from '../../components/sponsors';
import { TSponsor } from '../../components/sponsors/Interfaces';
import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';
import SponsorsTable from '../../components/sponsors/SponsorsTable';
import { TTableFilter } from '../../components/shared/Interfaces';
import { useTab } from '../../context/ContextTab';
import { getAllSponsors } from '../../services/Sponsors.service';

export interface ISponsorsPage {
  data: TSponsor[];
}
const SponsorsPage: NextPage<ISponsorsPage> = ({ data }) => {
  const { tab, setTab } = useTab();
  const [filter, setFilter] = useState<TTableFilter>();

  useEffect(() => {
    if (tab) {
      setFilter({
        columnId: 'startDate',
        value: tab.value,
      });
    } else {
      setTab({
        tabId: 0,
        title: 'Din toti anii',
        value: 0,
      });
    }
  }, [tab, setTab]);

  return (
    <Layout {...{ bgColor: 'var(--grey-alpha-100)' }}>
      <SponsorsHeader {...{ isUsedInAdminPage: true }} />
      <SponsorsTable {...{ data, filter }} />
    </Layout>
  );
};
export default SponsorsPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);
  const { data } = await getAllSponsors();

  return {
    props: {
      session,
      data: data?.map(({ image_url, website, date_start, date_end, title }: any) => ({ logo: image_url, site: website, startdate: date_start, endDate: date_end, title  })),
    },
  };
};
