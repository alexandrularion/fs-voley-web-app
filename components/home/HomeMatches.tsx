import { Flex, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';
import styled from 'styled-components';
import { navigationRoutes } from '../../constants/Navigation';
import { ArrowRightIcon } from '../../styles/Icons';
import MatchesCard from '../matches/MatchesCard';
import { LayoutContainer } from '../shared/Layout';
import { IHomeMatches } from './Interfaces';
import { device } from '../shared/DevicesBreakpoints';

const HomeMatches: React.FC<IHomeMatches> = ({ futureMatch, latestMatch }) => {
  return (
    <Container>
      <LayoutContainer {...{ className: 'hm-layout-container' }}>
        <Flex {...{ flexDirection: 'column', gap: 'var(--gap-md)' }}>
          <Flex {...{ justifyContent: 'space-between', w: '100%', alignItems: 'center' }}>
            <Heading {...{ fontSize: 'var(--heading-xs)', color: 'var(--blue-600)' }}>{'Ultimul meci'}</Heading>
            <Link {...{ href: `${navigationRoutes.matches.url}/results` }}>
              <Flex {...{ color: 'var(--blue-400)', gap: 'var(--gap-sm)', as: 'button', alignItems: 'center', marginRight: [0, '25px'] }}>
                {'Vezi rezultate'} <ArrowRightIcon {...{ color: 'var(--blue-400)', size: '22px' }} />
              </Flex>
            </Link>
          </Flex>
          {Object.values(latestMatch).length ? <MatchesCard {...{ match: latestMatch, isUsedOnHomePage: true }} /> : <Text>{'Nu există momentan nici o înregistrare.'}</Text>}
        </Flex>
        <Flex {...{ flexDirection: 'column', gap: 'var(--gap-md)' }}>
          <Flex {...{ justifyContent: 'space-between', w: '100%', alignItems: 'center' }}>
            <Heading {...{ fontSize: 'var(--heading-xs)', color: 'var(--blue-600)' }}>{'Următorul meci'}</Heading>
            <Link {...{ href: navigationRoutes.matches.url }}>
              <Flex {...{ color: 'var(--blue-400)', gap: 'var(--gap-sm)', as: 'button', alignItems: 'center', marginRight: [0, '25px'] }}>
                {'Vezi meciurile viitoare'} <ArrowRightIcon {...{ color: 'var(--blue-400)', size: '22px' }} />
              </Flex>
            </Link>
          </Flex>
          {Object.values(futureMatch).length ? <MatchesCard {...{ match: futureMatch, isUsedOnHomePage: true }} /> : <Text>{'Nu există momentan nici o înregistrare.'}</Text>}
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

  @media ${device.tablet} {
    padding: 50px 0;
    .hm-layout-container {
      gap: var(--gap-lg);
      grid-template-columns: 100%;
    }
  }
`;
