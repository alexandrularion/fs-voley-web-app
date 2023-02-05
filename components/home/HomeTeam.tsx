import { Box, Flex, Heading } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import { useMemo } from 'react';
import styled from 'styled-components';
import EmptyState from '../shared/EmptyState';
import { LayoutContainer } from '../shared/Layout';
import TeamCard from '../team/TeamCard';
import { IHomeTeam } from './Interfaces';
import Link from 'next/link';
import { ArrowRightIcon } from '../../styles/Icons';
import { navigationRoutes } from '../../constants/Navigation';

const HomeTeam: React.FC<IHomeTeam> = ({ team }) => {
  const data = useMemo(() => team?.slice(0, 5).map((obj) => ({ ...obj, key: nanoid() })), [team]);

  return (
    <Container>
      <LayoutContainer {...{ className: 'ht-layout-container' }}>
        <Flex {...{ justifyContent: 'space-between', w: '100%', alignItems: 'center' }}>
          <Heading {...{ fontSize: 'var(--heading-xs)', color: 'var(--white-color)' }}>{'Întâlnește Echipa'}</Heading>
          <Link {...{ href: navigationRoutes.team.url }}>
            <Flex {...{ color: 'var(--grey-alpha-100)', gap: 'var(--gap-sm)', as: 'button', alignItems: 'center' }}>
              {'Vezi toată echipa'} <ArrowRightIcon {...{ color: 'var(--grey-alpha-100)', size: '22px' }} />
            </Flex>
          </Link>
        </Flex>
        {data && data.length > 0 ? (
          <Box
            {...{
              display: 'grid',
              gridTemplateColumns: 'repeat(3,1fr)',
              w: '100%',
              gap: 'var(--gap-md)',
            }}
          >
            {data?.map(({ key, id, ...obj }) => (
              <Link key={key} {...{ href: `/team/${id}` }}>
                <TeamCard {...obj} />
              </Link>
            ))}
          </Box>
        ) : (
          <EmptyState />
        )}
      </LayoutContainer>
    </Container>
  );
};
export default HomeTeam;

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: var(--blue-600);
  padding: 75px 0;

  .ht-layout-container {
    flex-direction: column;
    gap: var(--gap-xl);
    align-items: flex-start;
  }
`;
