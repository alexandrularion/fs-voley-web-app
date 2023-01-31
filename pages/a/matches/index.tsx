import { GetServerSidePropsContext, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { IMatchesPage, TBEMatch, TMatch, TSearchMatches } from '../../../components/matches/Interfaces';
import MatchesHeader from '../../../components/matches/MatchesHeader';
import MatchesTable from '../../../components/matches/MatchesTable';
import Layout from '../../../components/shared/Layout';
import { useMatches } from '../../../context/ContextMatch';
import { useTab } from '../../../context/ContextTab';
import { getAllMatches } from '../../../services/Match.service';

const MatchesPage: NextPage<IMatchesPage> = ({ data }) => {
  const [search, setSearch] = useState<TSearchMatches>({});
  const { setMatches } = useMatches();
  const { setTab } = useTab();

  useEffect(() => {
    if (search?.championship || search?.edition) {
      //todo
    } else {
      setMatches(data);
    }
  }, [search, data, setMatches]);

  useEffect(() => {
    setTab({ tabId: 0, title: 'Meciuri', href: '/a/matches', value: 0 });
  }, [setTab]);

  return (
    <Layout {...{ bgColor: 'var(--blue-500)' }}>
      <MatchesHeader {...{ setSearch, isUsedInAdminPage: true, isUsedInMatchPage: true }} />
      <MatchesTable />
    </Layout>
  );
};
export default MatchesPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = await getSession(ctx);
    const { data } = await getAllMatches();
    return {
      props: {
        session,
        data: data.map(({ club_firstId, club_secondId, ...rest }: TBEMatch) => ({ ...rest, clubOneId: club_firstId, clubTwoId: club_secondId } as TMatch)),
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
