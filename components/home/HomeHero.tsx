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
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { device } from '../shared/DevicesBreakpoints';

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
      <Flex {...{ w: '100%', h: '100%', alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'column' }}>
        <Flex {...{ zIndex: 'var(--z-index-5)', position: 'relative', flexDirection: 'column', marginBottom: 'calc(100vh / 3)', gap: 'var(--gap-lg)', alignItems: 'center' }}>
          <Flex direction={'column'} alignItems={'center'} gap={'var(--gap-xs)'}>
            <Heading {...{ color: 'var(--white-color)', size: ['lg', 'xl'] }}>{'Echipa CSM Volei Suceava'}</Heading>
            <Text {...{ color: 'var(--grey-alpha-100)', textAlign: 'center', width: ['90%', '100%'], fontSize: ['md', 'xl'], fontWeight: 'bold' }}>
              {'Website-ul oficial a echipei de volei masculin Club Sportiv Municipal Suceava.'}
            </Text>
          </Flex>
          <Link {...{ href: `${navigationRoutes.matches.url}/ranking` }}>
            <Button {...{ color: 'var(--white-color)', gap: 'var(--gap-sm)', variant: 'outline', size: ['md', 'lg'], fontWeight: '400', borderRadius: '25px' }}>
              {'Vezi clasamentul complet'} <ArrowRightIcon {...{ color: 'var(--white-color)', size: '20px' }} />
            </Button>
          </Link>
        </Flex>
        <Flex
          {...{
            flexDirection: 'column',
            gap: '30px',
            zIndex: 'var(--z-index-5)',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: '30px',
          }}
        >
          <CommonTable {...{ data: ranking, columns, isFooterVisible: false, className: 'hh-table' }} />
        </Flex>
        <AliceCarousel
          {...{
            disableDotsControls: true,
            autoPlay: true,
            infinite: true,
            autoPlayInterval: 2000,
            keyboardNavigation: true,
            swipeDelta: 10,
          }}
        >
          {['/assets/home-hero-1.png', '/assets/home-hero-2.png', '/assets/home-hero-3.png']?.map((src, index: number) => (
            <Image key={`img_${index}`} {...{ src, alt: 'img', width: 1400, height: 600 }} />
          ))}
        </AliceCarousel>
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

    @media ${device.tablet} {
      width: 100%;
      max-width: 90vw;
      overflow-x: visible;
    }
  }

  .alice-carousel {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: var(--z-index-1);
    overflow: hidden;

    @media ${device.tablet} {
      .alice-carousel__wrapper {
        height: 100vh;
        width: auto;
      }
    }
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(22, 77, 229, 0.8) 20%, rgba(2, 24, 123, 1) 100%);
    z-index: var(--z-index-2);
  }

  @media ${device.mobile} {
  }
`;
