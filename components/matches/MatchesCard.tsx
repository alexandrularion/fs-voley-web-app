import styled from 'styled-components';
import { IMatchesCard } from './Interfaces';

const MatchesCard: React.FC<IMatchesCard> = () => {
  return <Container></Container>;
};
export default MatchesCard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--white-color);
  transition: 0.2s all ease-in-out;
  height: 446px;
  width: 415px;
  position: relative;
  overflow: hidden;

  .tc-player-container {
    img {
      width: 450px;
    }
  }
  &:hover {
    background: var(--blue-400);

    p,
    h2 {
      color: var(--white-color);
    }

    .tc-player-container {
      right: -20%;
    }
  }
`;
