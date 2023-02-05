import { Box, Button, Flex, Heading, Text, Tooltip } from '@chakra-ui/react';
import { useMemo } from 'react';
import { CellValue } from 'react-table';
import styled from 'styled-components';
import CommonTable from '../shared/Table';
import Image from 'next/image';
import { IHomeHero } from './Interfaces';
import { ArrowRightIcon } from '../../styles/Icons';
import { navigationRoutes } from '../../constants/Navigation';
import Link from 'next/link';

const HomeHero: React.FC<IHomeHero> = ({ ranking }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Loc',
        accessor: 'position',
        Cell: ({ row: { original } }: CellValue) => <Text {...{ pl: '10px' }}>{original.position}</Text>,
      },
      {
        Header: 'Echipă',
        accessor: 'image',
        Cell: ({ row: { original } }: CellValue) => (
          <Box {...{ alignItems: 'center', placeItems: 'center', gap: 'var(--gap-md)', display: 'grid', gridTemplateColumns: '50px max-content' }}>
            <Image {...{ src: original.image, alt: original.club, width: 40, height: 40, style: { width: 'max-content', height: '50px' } }} />
            <Text {...{ color: 'var(--grey-alpha-100)', placeSelf: 'center start' }}>{original.club}</Text>
          </Box>
        ),
      },
      {
        Header: 'P',
        accessor: 'points',
        Cell: ({ row: { original } }: CellValue) => <Tooltip {...{ label: 'Puncte' }}>{original.points}</Tooltip>,
      },
      {
        Header: 'J',
        accessor: 'played',
        Cell: ({ row: { original } }: CellValue) => <Tooltip {...{ label: 'Jucate' }}>{original.played}</Tooltip>,
      },
      {
        Header: 'V',
        accessor: 'wins',
        Cell: ({ row: { original } }: CellValue) => <Tooltip {...{ label: 'Victorii' }}>{original.wins}</Tooltip>,
      },
      {
        Header: 'P',
        accessor: 'losings',
        Cell: ({ row: { original } }: CellValue) => <Tooltip {...{ label: 'Pierderi' }}>{original.losings}</Tooltip>,
      },
    ],
    []
  );

  return (
    <Container>
      <Flex {...{ w: '100%', h: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <Flex {...{ zIndex: 'var(--z-index-5)', position: 'relative', flexDirection: 'column', height: '45vh', gap: 'var(--gap-md)', alignItems: 'center' }}>
          <Heading {...{ color: 'var(--white-color)' }}>{'Echipa CSM Volei Suceava'}</Heading>
          <Text {...{ color: 'var(--grey-alpha-100)' }}> {'Website-ul oficial a echipei de volei masculin Club Sportiv Municipal Suceava.'}</Text>
          <Link {...{ href: `${navigationRoutes.matches.url}/ranking` }}>
            <Button {...{ color: 'var(--white-color)', gap: 'var(--gap-sm)', variant: 'outline', fontWeight: '400' }}>
              {'Vezi clasamentul complet'} <ArrowRightIcon {...{ color: 'var(--white-color)', size: '20px' }} />
            </Button>
          </Link>
        </Flex>
        <Flex
          {...{
            flexDirection: 'column',
            gap: '30px',
            zIndex: 'var(--z-index-5)',
            position: 'absolute',
            bottom: '30px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CommonTable {...{ data: ranking, columns, isFooterVisible: false, className: 'hh-table' }} />
        </Flex>
        <video {...{ controls: false, autoPlay: true, loop: true, preload: 'auto', muted: true }}>
          <source {...{ src: '/assets/hero-video.mp4', type: 'video/mp4' }} />
          {'Your browser does not support the video tag.'}
        </video>
      </Flex>
    </Container>
  );
};
export default HomeHero;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100vh;

  .hh-table {
    background: none;
    overflow: hidden;
    border-top: 1px solid var(--grey-alpha-300);
    border-bottom: 1px solid var(--grey-alpha-300);
    /* position: absolute; */
    /* bottom: 0; */
    width: 700px;
    z-index: var(--z-index-5);

    tr,
    th,
    td {
      color: var(--white-color);
      text-align: left;
    }
    tr,
    td {
      padding: 10px;
    }
  }

  video {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: var(--z-index-1);
    object-fit: cover;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(22, 77, 229, 0.7) 0%, rgba(2, 24, 123, 0.7) 100%);
    z-index: var(--z-index-2);
  }
`;
