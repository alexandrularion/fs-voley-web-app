import { nanoid } from 'nanoid';
import { useMemo } from 'react';
import styled from 'styled-components';
import { LayoutContainer } from '../shared/Layout';
import { ITeamList, TTeamPlayer } from './Interfaces';
import TeamCard from './TeamCard';

const TeamList: React.FC<ITeamList> = ({ players }) => {
  const data: TTeamPlayer[] = useMemo(() => players.map((obj) => ({ ...obj, key: nanoid() })), [players]);
  return (
    <Container>
      <LayoutContainer {...{ className: 'sl-layout-container' }}>
        {data?.map(({ key, ...obj }) => (
          <TeamCard key={key} {...obj} />
        ))}
      </LayoutContainer>
    </Container>
  );
};

export default TeamList;

const Container = styled.div`
  display: flex;
  justify-content: center;

  .sl-layout-container {
    display: grid;
    grid-template-columns: repeat(3, auto);
    place-content: start;
    position: relative;
    top: -120px;
    gap: var(--gap-md);
  }
`;
