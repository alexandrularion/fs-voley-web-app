import { Flex, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import styled from 'styled-components';
import { navigationRoutes } from '../../constants/Navigation';
import { ArrowRightIcon } from '../../styles/Icons';
import MatchesCard from '../matches/MatchesCard';
import { LayoutContainer } from '../shared/Layout';
import { IHomeMatches } from './Interfaces';

const HomeMatches: React.FC<IHomeMatches> = ({ futureMatch, latestMatch }) => {
  return (
    <Container>
      <LayoutContainer {...{ className: 'hm-layout-container' }}>
        <Flex {...{ flexDirection: 'column', gap: 'var(--gap-md)' }}>
          <Flex {...{ justifyContent: 'space-between', w: '100%', alignItems: 'center' }}>
            <Heading {...{ fontSize: 'var(--heading-xs)', color: 'var(--blue-600)' }}>{'Ultimul meci'}</Heading>
            <Link {...{ href: `${navigationRoutes.matches.url}/results` }}>
              <Flex {...{ color: 'var(--blue-400)', gap: 'var(--gap-sm)', as: 'button', alignItems: 'center', marginRight: '25px' }}>
                {'Vezi rezultate'} <ArrowRightIcon {...{ color: 'var(--blue-400)', size: '22px' }} />
              </Flex>
            </Link>
          </Flex>
          <MatchesCard {...{ match: latestMatch, isUsedOnHomePage: true }} />
        </Flex>
        <Flex {...{ flexDirection: 'column', gap: 'var(--gap-md)' }}>
          <Flex {...{ justifyContent: 'space-between', w: '100%', alignItems: 'center' }}>
            <Heading {...{ fontSize: 'var(--heading-xs)', color: 'var(--blue-600)' }}>{'Următorul meci'}</Heading>
            <Link {...{ href: navigationRoutes.matches.url }}>
              <Flex {...{ color: 'var(--blue-400)', gap: 'var(--gap-sm)', as: 'button', alignItems: 'center', marginRight: '25px' }}>
                {'Vezi meciurile viitoare'} <ArrowRightIcon {...{ color: 'var(--blue-400)', size: '22px' }} />
              </Flex>
            </Link>
          </Flex>
          <MatchesCard {...{ match: futureMatch, isUsedOnHomePage: true }} />
        </Flex>
      </LayoutContainer>
    </Container>
  );
};
export default HomeMatches;

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 75px 0;

  .hm-layout-container {
    display: grid;
    grid-template-columns: 50% 50%;
    gap: var(--gap-md);
    position: relative;
  }
`;
