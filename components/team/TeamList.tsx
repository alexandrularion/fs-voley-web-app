import { Box, Link } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import { useMemo } from 'react';
import styled from 'styled-components';
import { useTeamCoaches } from '../../context/ContextTeamCoaches';
import { useTeamPlayers } from '../../context/ContextTeamPlayers';
import EmptyState from '../shared/EmptyState';
import { LayoutContainer } from '../shared/Layout';
import { ITeamList } from './Interfaces';
import TeamCard from './TeamCard';

const TeamList: React.FC<ITeamList> = ({ isUsedInCoachPage = false }) => {
  const { teamPlayers } = useTeamPlayers();
  const { teamCoaches } = useTeamCoaches();
  const data = useMemo(
    () => (isUsedInCoachPage ? teamCoaches?.map((obj) => ({ ...obj, key: nanoid() })) : teamPlayers?.map((obj) => ({ ...obj, key: nanoid() }))),
    [teamPlayers, teamCoaches, isUsedInCoachPage]
  );

  return (
    <Container>
      <LayoutContainer {...{ className: 'sl-layout-container' }}>
        {data && data.length > 0 ? (
          <Box
            {...{
              display: 'grid',
              gridTemplateColumns: 'repeat(3,1fr)',
              w: '100%',
              gap: 'var(--gap-md)',
            }}
          >
            {data?.map(({ key, id, ...obj }) =>
              isUsedInCoachPage ? (
                <TeamCard key={key} {...obj} />
              ) : (
                <Link key={key} {...{ href: `/team/${id}` }}>
                  <TeamCard {...obj} />
                </Link>
              )
            )}
          </Box>
        ) : (
          <EmptyState />
        )}
      </LayoutContainer>
    </Container>
  );
};

export default TeamList;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  .sl-layout-container {
    place-content: start;
    position: relative;
    top: -110px;
    gap: var(--gap-md);
  }
`;
