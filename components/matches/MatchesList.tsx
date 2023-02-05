import { Box } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import { useMemo } from 'react';
import styled from 'styled-components';
import { useMatches } from '../../context/ContextMatch';
import { device } from '../shared/DevicesBreakpoints';
import EmptyState from '../shared/EmptyState';
import { LayoutContainer } from '../shared/Layout';
import { TMatch } from './Interfaces';
import MatchesCard from './MatchesCard';

const MatchesList: React.FC = () => {
  const { matches } = useMatches();
  const data: TMatch[] = useMemo(() => matches.map((obj) => ({ ...obj, key: nanoid() })), [matches]);
  return (
    <Container>
      <LayoutContainer {...{ className: 'sl-layout-container' }}>
        {data && data.length > 0 ? (
          <Box
            {...{
              display: 'grid',
              gridTemplateColumns: 'repeat(2,1fr)',
              w: '100%',
              gap: 'var(--gap-md)',
            }}
          >
            {data.map(({ key, ...obj }) => (
              <MatchesCard key={key} {...{ match: obj }} />
            ))}
          </Box>
        ) : (
          <EmptyState />
        )}
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
    position: relative;
    top: -120px;
    gap: var(--gap-md);

    @media ${device.tablet} {
      grid-template-columns: 1fr;
    }
  }
`;
