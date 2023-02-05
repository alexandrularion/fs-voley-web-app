import { Flex, Heading, Text } from '@chakra-ui/react';
import styled from 'styled-components';
import { LayoutContainer } from '../shared/Layout';

const HistoryShortHeader = () => {
  return (
    <Container>
      <LayoutContainer {...{ className: 'hsh-layout-container' }}>
        <Flex {...{ flexDirection: 'column', gap: 'var(--gap-sm)' }}>
          <Heading>{'Istoric Club'}</Heading>
          <Text>{'Descopera istoria clubului CSM Volei Suceava.'}</Text>
        </Flex>
      </LayoutContainer>
    </Container>
  );
};

export default HistoryShortHeader;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 50px 0;

  .hsh-layout-container {
    justify-content: flex-start;
  }
`;
