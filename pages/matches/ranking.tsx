const cheerio = require('cheerio'); // 1
import { Flex, Tooltip } from '@chakra-ui/react';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';
import { CellValue } from 'react-table';
import MatchesHeader from '../../components/matches/MatchesHeader';
import EmptyState from '../../components/shared/EmptyState';
import Layout, { LayoutContainer } from '../../components/shared/Layout';
import CommonTable from '../../components/shared/Table';
import Image from 'next/image';
import styled from 'styled-components';
import { TMatchesRanking } from '../../components/matches/Interfaces';
import { useTab } from '../../context/ContextTab';

const RankingMatchesPage = () => {
  const [parsedData, setParsedData] = useState<TMatchesRanking[]>([]);
  const [hasRanking, setHasRanking] = useState<boolean>(false);
  const { setTab } = useTab();

  const getHTMLPage = async () => {
    try {
      const list: TMatchesRanking[] = [];
      const accessors = ['position', 'image', 'points', 'played', 'wins', 'losings', 'winnedSets', 'losedSets', 'winnedPoints', 'losedPoints'];
      const res = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent('https://www.sportexclusiv.ro/clasament-volei-masculin')}`);

      const htmlString = await res.text();
      const $ = cheerio.load(htmlString);
      const body = $('tr');

      [...body].forEach((td: any, index: number) => {
        let obj = {};

        (td.children as any).forEach((elem: any, key: number) => {
          if (elem?.attribs?.class?.includes('has-logo')) {
            obj = { ...obj, [accessors[key]]: elem.children[0].children[0]?.attribs?.src };
          } else {
            obj = { ...obj, [accessors[key]]: elem.children[0].data };
          }
        });
        if (index !== 0) {
          list.push(obj as TMatchesRanking);
        }
      });
      setParsedData(list);
      setHasRanking(true);
    } catch (e) {
      setHasRanking(false);
    }
  };

  useEffect(() => {
    getHTMLPage();
  }, []);

  useEffect(() => {
    setTab({ tabId: 2, title: 'Clasament', href: '/matches/ranking', value: 2 });
  }, [setTab]);

  const columns = useMemo(
    () => [
      {
        Header: 'Pozitie',
        accessor: 'position',
        Cell: ({ row: { original } }: CellValue) => original.position,
      },
      {
        Header: 'Echipă',
        accessor: 'image',
        Cell: ({ row: { original } }: CellValue) => (
          <Flex {...{ w: '80px' }}>
            <Image {...{ src: original.image, alt: '', width: 80, height: 80 }} />
          </Flex>
        ),
      },
      {
        Header: 'Puncte',
        accessor: 'points',
        Cell: ({ row: { original } }: CellValue) => original.points,
      },
      {
        Header: 'Jucate',
        accessor: 'played',
        Cell: ({ row: { original } }: CellValue) => original.played,
      },
      {
        Header: 'Victorii',
        accessor: 'wins',
        Cell: ({ row: { original } }: CellValue) => original.wins,
      },
      {
        Header: 'Pierderi',
        accessor: 'losings',
        Cell: ({ row: { original } }: CellValue) => original.losings,
      },
      {
        Header: 'SC',
        accessor: 'winnedSets',
        Cell: ({ row: { original } }: CellValue) => <Tooltip {...{ label: 'Seturi Castigate' }}>{original.winnedSets}</Tooltip>,
      },
      {
        Header: 'SP',
        accessor: 'losedSets',
        Cell: ({ row: { original } }: CellValue) => <Tooltip {...{ label: 'Seturi Pierdute' }}>{original.losedSets}</Tooltip>,
      },
      {
        Header: 'PC',
        accessor: 'winnedPoints',
        Cell: ({ row: { original } }: CellValue) => <Tooltip {...{ label: 'Puncte Castigate' }}>{original.winnedPoints}</Tooltip>,
      },
      {
        Header: 'PP',
        accessor: 'losedPoints',
        Cell: ({ row: { original } }: CellValue) => <Tooltip {...{ label: 'Puncte Pierdute' }}>{original.losedPoints}</Tooltip>,
      },
    ],
    []
  );
  return (
    <Layout {...{ bgColor: 'var(--grey-alpha-100)' }}>
      <MatchesHeader {...{ areFiltrablesVisible: false }} />
      <Container>
        <LayoutContainer {...{ className: 'r-layout-container' }}>
          {hasRanking && parsedData && parsedData.length > 0 ? <CommonTable {...{ columns, data: parsedData }} /> : <EmptyState {...{ title: 'Nu putem aduce clasamentul din pagina externa.' }} />}
        </LayoutContainer>
      </Container>
    </Layout>
  );
};
export default RankingMatchesPage;

const Container = styled.div`
  display: flex;
  justify-content: center;

  .r-layout-container {
    position: relative;
    top: -120px;
  }
`;
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);
  return {
    props: {
      session,
    },
  };
};
