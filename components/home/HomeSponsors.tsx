import { Flex, Heading } from '@chakra-ui/react';
import styled from 'styled-components';
import { navigationRoutes } from '../../constants/Navigation';
import { ArrowRightIcon } from '../../styles/Icons';
import { LayoutContainer } from '../shared/Layout';
import { IHomeSponsors } from './Interfaces';
import Link from 'next/link';
import Image from 'next/image';
import { useMemo } from 'react';
import { nanoid } from 'nanoid';
import EmptyState from '../shared/EmptyState';
import { device } from '../shared/DevicesBreakpoints';

const HomeSponsors: React.FC<IHomeSponsors> = ({ sponsors }) => {
  const data = useMemo(() => sponsors?.map((obj) => ({ ...obj, key: nanoid() })), [sponsors]);
  return (
    <Container>
      <LayoutContainer {...{ className: 'ht-layout-container' }}>
        <Flex {...{ justifyContent: 'space-between', w: '100%', alignItems: 'center' }}>
          <Heading {...{ fontSize: 'var(--heading-xs)', color: 'var(--blue-600)' }}>{'Sponsorii noștrii'}</Heading>
          <Link {...{ href: navigationRoutes.sponsors.url }}>
            <Flex {...{ color: 'var(--blue-400)', gap: 'var(--gap-sm)', as: 'button', alignItems: 'center' }}>
              {'Vezi mai mult'} <ArrowRightIcon {...{ color: 'var(--blue-400)', size: '22px' }} />
            </Flex>
          </Link>
        </Flex>
        <Flex {...{ gap: 'var(--gap-xl)', alignItems: 'center', justifyContent: ['center', 'unset'], wrap: 'wrap', width: '100%' }}>
          {data && data.length ? (
            data.map(({ logo, title, key, site }) => (
              <Link key={key} {...{ href: site, target: '_blank' }}>
                <Image {...{ src: logo, width: 200, height: 200, alt: title, className: 'img__sponsor' }} />
              </Link>
            ))
          ) : (
            <EmptyState />
          )}
        </Flex>
      </LayoutContainer>
    </Container>
  );
};
export default HomeSponsors;

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: var(--grey-alpha-50);
  padding: 75px 0;

  .ht-layout-container {
    flex-direction: column;
    gap: var(--gap-xl);
    align-items: flex-start;

    .img__sponsor {
      height: 100px;
      width: auto;
    }
  }
  @media ${device.tablet} {
    padding: 50px 0;

    .ht-layout-container {
      gap: var(--gap-lg);

      .img__sponsor {
        height: 80px;
      }
    }
  }
`;
