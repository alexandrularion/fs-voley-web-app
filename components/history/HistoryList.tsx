import { nanoid } from 'nanoid';
import styled from 'styled-components';
import { THistory } from './Interfaces';
import { useMemo } from 'react';
import { useHistories } from '../../context/ContextHistory';
import HistoryOverview from './HistoryOverview';

const HistoryList: React.FC = () => {
  const { histories } = useHistories();
  const data: THistory[] = useMemo(() => histories.map((obj) => ({ ...obj, key: nanoid() })), [histories]);

  return (
    <Container>
      {data.map(({ key, ...data }) => (
        <HistoryOverview key={key} {...{ data }} />
      ))}
    </Container>
  );
};

export default HistoryList;

const Container = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: column;
`;
