import { nanoid } from 'nanoid';
import styled from 'styled-components';
import { LayoutContainer } from '../shared/Layout';
import { THistory } from './Interfaces';
import { useMemo } from 'react';
import { useHistories } from '../../context/ContextHistory';
import HistoryOverview from './HistoryOverview';

const HistoryList: React.FC = () => {
  const { histories } = useHistories();
  const data: THistory[] = useMemo(() => histories.map((obj) => ({ ...obj, key: nanoid() })), [histories]);

  return (
    <Container>
      <LayoutContainer {...{ className: 'sl-layout-container' }}>
        {data.map(({ key, ...data }) => (
          <HistoryOverview key={key} {...{ data }} />
        ))}
      </LayoutContainer>
    </Container>
  );
};

export default HistoryList;

const Container = styled.section`
  display: flex;
  justify-content: center;
  background: var(--grey-alpha-100);
  width: 100%;

  .sl-layout-container {
    flex-direction: column;
    gap: 75px;
    position: relative;
    z-index: var(--z-index-4);
  }
`;
