import { Box, Heading, Text } from '@chakra-ui/react';
import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';

const TeamCard: React.FC<any> = ({ name, surName, image, position, shirtNumber, id }) => {
  return (
    <Link {...{ href: `/team/${id}` }}>
      <Container>
        {shirtNumber && <Heading {...{ fontSize: '150px', color: 'var(--grey-alpha-200)', position: 'absolute', top: '0', left: '30px' }}>{shirtNumber}</Heading>}
        <Box {...{ position: 'absolute', left: '30px', bottom: '30px', zIndex: 'var(--z-index-1)' }}>
          <Text {...{ fontSize: 'var(--text-sm)', color: 'var(--blue-500)', transition: '0.2s all ease-in-out' }}>{surName}</Text>
          <Heading {...{ fontSize: 'var(--heading-md)', color: 'var(--blue-500)', transition: '0.2s all ease-in-out' }}>{name}</Heading>
          <Text {...{ marginTop: 'var(--gap-sm)', color: 'var(--blue-500)', transition: '0.2s all ease-in-out' }}>{position.toUpperCase()}</Text>
        </Box>
        <Box {...{ className: 'tc-player-container', position: 'absolute', bottom: -1, right: 'calc(-180px/2)', transition: '0.2s all ease-in-out', zIndex: 'var(--z-index-3)' }}>
          <Image {...{ src: image, alt: `${name} ${surName} - ${position} - ${'C.S.M Suceava'}`, width: 250, height: 450 }} />
        </Box>
      </Container>
    </Link>
  );
};
export default TeamCard;

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
      width: 250px;
      height: max-content;
    }
  }
  &:hover {
    background: var(--blue-400);

    p,
    h2 {
      color: var(--white-color);
    }

    .tc-player-container {
      right: 0;
    }
  }
`;
