import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import styled from 'styled-components';

const HomeHero = () => {
  return (
    <Container>
      <Box {...{ w: '100%', h: 'calc(100vh - 90px)' }}>
        <Flex {...{ zIndex: 'var(--z-index-5)', position: 'relative' }}>
          <Heading {...{ color: 'var(--white-color)' }}>{'Some heading'}</Heading>
          <Text {...{ color: 'var(--grey-alpha-100)' }}> {'text'}</Text>
        </Flex>
        <video {...{ controls: false, autoPlay: true, loop: true, preload: 'auto', muted: true }}>
          <source {...{ src: '/assets/hero-video.mp4', type: 'video/mp4' }} />
          {'Your browser does not support the video tag.'}
        </video>
      </Box>
    </Container>
  );
};
export default HomeHero;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  video {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: var(--z-index-1);
    object-fit: cover;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(22, 77, 229, 0.5) 0%, rgba(2, 24, 123, 0.5) 100%);
    z-index: var(--z-index-2);
  }
`;
