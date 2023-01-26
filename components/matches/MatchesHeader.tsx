import styled from 'styled-components';
import Background from '../../assets/Background.png';
import { useEffect, useMemo, useState } from 'react';
import { nanoid } from 'nanoid';
import { LayoutContainer } from '../shared/Layout';
import Tabs from '../shared/Tabs';
import { ITab } from '../shared/Interfaces';
import { Box, Flex, Heading, Select } from '@chakra-ui/react';
import { IMatchesHeader } from './Interfaces';

const MatchesHeader: React.FC<IMatchesHeader> = ({ setSearch, areFiltrablesVisible = true }) => {
  const [championship, setChampionship] = useState<string>();
  const [edition, setEdition] = useState<string>();
  const tabs: ITab[] = useMemo(
    () =>
      [
        { tabId: 0, title: 'Meciuri viitoare', href: '/matches', value: 0 },
        { tabId: 1, title: 'Rezultate', href: '/matches/results', value: 1 },
        { tabId: 2, title: 'Clasament', href: '/matches/ranking', value: 2 },
      ].map((obj) => ({ ...obj, key: nanoid() })),
    []
  );

  //TO-DO
  // Get it from BE
  const editionOptions: { id: string; title: string; key?: string }[] = useMemo(
    () =>
      [
        {
          id: '0',
          title: '2022-2023',
        },
        {
          id: '1',
          title: '2021-2022',
        },
        {
          id: '2',
          title: '2020-2021',
        },
      ].map((obj) => ({ ...obj, key: nanoid() })),
    []
  );
  const championshipOptions: { id: string; title: string; key?: string }[] = useMemo(
    () =>
      [
        {
          id: '0',
          title: '2022-2023',
        },
        {
          id: '1',
          title: '2021-2022',
        },
        {
          id: '2',
          title: '2020-2021',
        },
      ].map((obj) => ({ ...obj, key: nanoid() })),
    []
  );

  useEffect(() => {
    edition && setSearch((prevState) => ({ ...prevState, edition }));
    championship && setSearch((prevState) => ({ ...prevState, championship }));
    /* eslint-disable-next-line */
  }, [edition, championship]);

  return (
    <Container {...{ src: Background.src }}>
      <LayoutContainer {...{ className: 'sh-layout-container' }}>
        <Heading {...{ color: 'var(--grey-alpha-50)', fontSize: 'var(--heading-md)' }}>{'Calendar Meciuri'}</Heading>
        <Tabs {...{ tabs }} />
        {areFiltrablesVisible && (
          <Flex {...{ gap: '20px' }}>
            <Select
              {...{
                type: 'text',
                placeholder: 'Selecteaza campionatul',
                _placeholder: { color: 'var(--grey-alpha-300)' },
                outline: 'none',
                _focus: { borderColor: 'var(--grey-alpha-50)' },
                color: 'var(--grey-alpha-50)',
                onChange: (e) => setChampionship(e.target.value),
                className: 'th-select',
              }}
            >
              {championshipOptions?.map(({ title, key, id }) => (
                <option key={key} {...{ value: id }}>
                  {title}
                </option>
              ))}
            </Select>
            <Select
              {...{
                type: 'text',
                placeholder: 'Selecteaza editia',
                _placeholder: { color: 'var(--grey-alpha-300)' },
                outline: 'none',
                _focus: { borderColor: 'var(--grey-alpha-50)' },
                color: 'var(--grey-alpha-50)',
                onChange: (e) => setEdition(e.target.value),
                className: 'th-select',
              }}
            >
              {editionOptions?.map(({ title, key, id }) => (
                <option key={key} {...{ value: id }}>
                  {title}
                </option>
              ))}
            </Select>
          </Flex>
        )}
      </LayoutContainer>
      <Box {...{ position: 'absolute', top: '310px', left: 0, w: '20px', h: '250px', zIndex: 'var(--z-index-2)', background: 'var(--blue-400)' }} />
    </Container>
  );
};
export default MatchesHeader;

const Container = styled.section<{ src: string }>`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: url(${({ src }) => src});
  min-height: 430px;
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

    .th-select {
      width: max-content;

      option {
        color: var(--black-color);
      }
    }
  }
`;
