import { Flex, Heading, Text } from '@chakra-ui/react';
import Image from 'next/dist/client/image';
import styled from 'styled-components';
import { LayoutContainer } from '../shared/Layout';
import { IHistoryOverview } from './Interfaces';

const HistoryOverview: React.FC<IHistoryOverview> = ({ data: { image, description, title, aligned } }) => {
  return (
    <Container {...{ aligned }}>
      <LayoutContainer {...{ className: 'ho-layout-container' }}>
        {aligned === 'left' || aligned === 'right' ? (
          <Flex {...{ gap: 'var(--gap-xl)', flexDirection: aligned === 'right' ? 'row-reverse' : 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Image {...{ src: image, alt: title, width: 1000, height: 1000, className: 'ho-img-lr' }} />
            <Flex {...{ flexDirection: 'column', gap: 'var(--gap-md)' }}>
              <Heading {...{ fontSize: 'var(--heading-sm)', color: 'var(--white-color)' }}>{title}</Heading>
              <Text {...{ whiteSpace: 'pre-line', fontSize: 'var(--text-sm)', color: 'var(--grey-alpha-300)' }}>{description}</Text>
            </Flex>
          </Flex>
        ) : (
          <Flex {...{ flexDirection: 'column', gap: '50px', justifyContent: 'center', alignItems: 'center' }}>
            <Flex {...{ flexDirection: 'column', gap: 'var(--gap-md)', justifyContent: 'center', alignItems: ' center' }}>
              <Heading>{title}</Heading>
              <Text {...{ whiteSpace: 'pre-line', textAlign: 'center' }}>{description}</Text>
            </Flex>
            <Image {...{ src: image, alt: title, width: 1000, height: 1000, className: 'ho-img-c' }} />
          </Flex>
        )}
      </LayoutContainer>
    </Container>
  );
};

export default HistoryOverview;

const Container = styled.div<{ aligned: 'left' | 'center' | 'right' }>`
  display: flex;
  justify-content: center;
  padding: 75px 0;
  background: ${({ aligned }) => (aligned === 'left' ? 'var(--blue-500)' : aligned === 'right' ? 'var(--blue-700)' : 'var(--white-color)')};
  width: 100%;

  .ho-layout-container {
    .ho-img-lr {
      width: 45vw;
      height: 100%;
      object-fit: cover;
    }
    .ho-img-c {
      width: 70vw;
      height: 100%;
      object-fit: cover;
    }
  }
`;
