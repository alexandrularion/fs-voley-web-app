import { nanoid } from 'nanoid';
import styled from 'styled-components';
import { LayoutContainer } from '../shared/Layout';
import { ISponsorsList, TSponsor } from './Interfaces';
import SponsorsCard from './SponsorsCard';
import { useMemo } from 'react';
import { Box } from '@chakra-ui/react';

const SponsorsList: React.FC<ISponsorsList> = ({ data }) => {
  const memoizedData: TSponsor[] = useMemo(() => data.map((obj) => ({ ...obj, key: nanoid() })), [data]);
  return (
    <Container>
      <LayoutContainer {...{ className: 'sl-layout-container' }}>
        <Box {...{ display: 'grid', gridTemplateColumns: 'repeat(3,max-content)', w:'100%'}}>
        {memoizedData?.map(({ key, ...obj }) => (
          <SponsorsCard key={key} {...obj} />
        ))}
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
    top: -85px;
    gap: var(--gap-lg);
  }
`;
