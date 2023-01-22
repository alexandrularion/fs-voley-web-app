import { nanoid } from 'nanoid';
import { useMemo } from 'react';
import styled from 'styled-components';
import { device } from '../shared/DevicesBreakpoints';
import { LayoutContainer } from '../shared/Layout';
import { IMatchesCard, IMatchesList } from './Interfaces';
import MatchesCard from './MatchesCard';

const MatchesList: React.FC<IMatchesList> = ({ matches }) => {
  const data: IMatchesCard[] = useMemo(() => matches.map((obj) => ({ ...obj, key: nanoid() })), [matches]);
  return (
    <Container>
      <LayoutContainer {...{ className: 'sl-layout-container' }}>
        {data?.map(({ key, ...obj }) => (
          <MatchesCard key={key} {...obj} />
        ))}
      </LayoutContainer>
    </Container>
  );
};

export default MatchesList;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  .sl-layout-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    place-content: start;
    position: relative;
    top: -120px;
    gap: var(--gap-md);

    @media ${device.tablet} {
      grid-template-columns: 1fr;
    }
  }
`;
