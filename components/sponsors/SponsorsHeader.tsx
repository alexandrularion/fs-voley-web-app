import styled from 'styled-components';
import { ISponsorsHeader } from './Interfaces';
import Background from '../../assets/Background.png';
import { useMemo } from 'react';
import { nanoid } from 'nanoid';
import { LayoutContainer } from '../shared/Layout';
import Tabs from '../shared/Tabs';
import { ITab } from '../shared/Interfaces';
import { Box, Heading } from '@chakra-ui/react';

const SponsorsHeader: React.FC<ISponsorsHeader> = ({ setTab, tab }) => {
  const tabs: ITab[] = useMemo(
    () =>
      [
        { tabId: 0, title: 'Din toti anii' },
        { tabId: 1, title: '2022-2023' },
        { tabId: 2, title: '2021-2022' },
        { tabId: 3, title: '2020-2021' },
      ].map((obj) => ({ ...obj, key: nanoid() })),
    []
  );
  return (
    <Container {...{ src: Background.src }}>
      <LayoutContainer {...{ className: 'sh-layout-container' }}>
        <Heading {...{ color: 'var(--grey-alpha-50)', fontSize: 'var(--heading-md)' }}>{'Sponsori'}</Heading>
        <Tabs {...{ tab, setTab, tabs }} />
      </LayoutContainer>
      <Box {...{ position: 'absolute', top: '230px', left: 0, w: '20px', h: '250px', zIndex: 'var(--z-index-2)', background: 'var(--blue-500)' }} />
    </Container>
  );
};
export default SponsorsHeader;

const Container = styled.section<{ src: string }>`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: url(${({ src }) => src});
  min-height: 350px;
  background-size: cover;
  position: relative;
  padding: 50px;

  &::after {
    top: 0;
    left: 0;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(1.57deg, rgba(6, 4, 183, 0.8) 1.32%, rgba(56, 54, 218, 0.8) 57.87%, rgba(108, 106, 255, 0.8) 96.57%);
    z-index: var(--z-index-1);
  }

  .sh-layout-container {
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: var(--gap-md);
  }
`;
