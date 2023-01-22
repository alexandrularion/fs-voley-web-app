import { nanoid } from 'nanoid';
import styled from 'styled-components';
import { LayoutContainer } from '../shared/Layout';
import { ISponsorsList, TSponsor } from './Interfaces';
import SponsorsCard from './SponsorsCard';
import { useMemo } from 'react';

const SponsorsList: React.FC<ISponsorsList> = ({ sponsors }) => {
  const data: TSponsor[] = useMemo(() => sponsors.map((obj) => ({ ...obj, key: nanoid() })), [sponsors]);
  return (
    <Container>
      <LayoutContainer {...{ className: 'sl-layout-container' }}>
        {data?.map(({ key, ...obj }) => (
          <SponsorsCard key={key} {...obj} />
        ))}
      </LayoutContainer>
    </Container>
  );
};

export default SponsorsList;

const Container = styled.section`
  display: flex;
  justify-content: center;
  background: var(--grey-alpha-100);

  .sl-layout-container {
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-template-rows: auto;
    position: relative;
    top: -120px;
    gap: var(--gap-lg);
  }
`;
