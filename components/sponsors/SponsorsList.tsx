import { nanoid } from 'nanoid';
import styled from 'styled-components';
import { LayoutContainer } from '../shared/Layout';
import { ISponsorsList, TSponsor } from './Interfaces';
import SponsorsCard from './SponsorsCard';
import { Box } from '@chakra-ui/react';
import EmptyState from '../shared/EmptyState';
import { useMemo } from 'react';
import { useSponsors } from '../../context/ContextSponsors';

const SponsorsList: React.FC<ISponsorsList> = () => {
  const { sponsors } = useSponsors();
  const data: TSponsor[] = useMemo(() => sponsors.map((obj) => ({ ...obj, key: nanoid() })), [sponsors]);

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
            {data.map(({ key, ...obj }) => (
              <SponsorsCard key={key} {...obj} />
            ))}
          </Box>
        ) : (
          <EmptyState />
        )}
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
