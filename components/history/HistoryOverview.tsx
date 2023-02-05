import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import Image from 'next/dist/client/image';
import styled from 'styled-components';
import { LayoutContainer } from '../shared/Layout';
import { IHistoryOverview } from './Interfaces';

const HistoryOverview: React.FC<IHistoryOverview> = ({ data: { image, description, title, aligned } }) => {
  return (
    <Container>
      <LayoutContainer {...{ className: 'ho-layout-container' }}>
        {aligned === 'left' || aligned === 'right' ? (
          <Box {...{ display: 'grid', gridTemplateColumns: 'repeat(2,auto)', gap: 'var(--gap-md)' }}>
            <Image {...{ src: image, alt: title, width: 1000, height: 1000 }} />
            <Flex {...{ flexDirection: 'column', gap: 'var(--gap-md)' }}>
              <Heading>{title}</Heading>
              <Text>{description}</Text>
            </Flex>
          </Box>
        ) : (
          <Flex {...{ flexDirection: 'column', gap: '50px' }}>
            <Flex {...{ flexDirection: 'column', gap: 'var(--gap-md)', justifyContent: 'center', alignItems: ' center' }}>
              <Heading>{title}</Heading>
              <Text>{description}</Text>
            </Flex>
            <Image {...{ src: image, alt: title, width: 1000, height: 1000 }} />
          </Flex>
        )}
      </LayoutContainer>
    </Container>
  );
};

export default HistoryOverview;

const Container = styled.div`
  display: flex;
  justify-content: center;

  .ho-layout-container {
  }
`;
