import { nanoid } from 'nanoid';
import styled from 'styled-components';
import { LayoutContainer } from '../shared/Layout';
import { ISponsorsList, TSponsor } from './Interfaces';
import SponsorsCard from './SponsorsCard';
import { Box } from '@chakra-ui/react';
import EmptyState from '../shared/EmptyState';
import { useState } from 'react';

const SponsorsList: React.FC<ISponsorsList> = ({ data }) => {
  const [memoizedData] = useState<TSponsor[]>(data.map((obj) => ({ ...obj, key: nanoid() })));
  return (
    <Container>
      <LayoutContainer {...{ className: 'sl-layout-container' }}>
        <Box {...{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', w: '100%', gap: 'var(--gap-md)' }}>
          {memoizedData && memoizedData.length > 0 ? memoizedData.map(({ key, ...obj }) => <SponsorsCard key={key} {...obj} />) : <EmptyState />}
        </Box>
      </LayoutContainer>
    </Container>
  );
};

export default SponsorsList;

const Container = styled.section`
  display: flex;
  justify-content: center;
  background: var(--grey-alpha-100);
  width: 100%;

  .sl-layout-container {
    position: relative;
    z-index: var(--z-index-4);
    top: -85px;
    gap: var(--gap-lg);
    min-height: 280px;
  }
`;
