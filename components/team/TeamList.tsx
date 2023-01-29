import { Box } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import { useMemo } from 'react';
import styled from 'styled-components';
import { useTeamPlayers } from '../../context/ContextTeamPlayers';
import EmptyState from '../shared/EmptyState';
import { LayoutContainer } from '../shared/Layout';
import { TTeamPlayer } from './Interfaces';
import TeamCard from './TeamCard';

const TeamList: React.FC = () => {
  const { teamPlayers } = useTeamPlayers();
  const data: TTeamPlayer[] = useMemo(() => teamPlayers.map((obj) => ({ ...obj, key: nanoid() })), [teamPlayers]);
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
            {data?.map(({ key, ...obj }) => (
              <TeamCard key={key} {...obj} />
            ))}
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
    top: -120px;
    gap: var(--gap-md);
  }
`;
