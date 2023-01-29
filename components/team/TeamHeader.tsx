import styled from 'styled-components';
import { ITeamHeader } from './Interfaces';
import Background from '../../assets/Background.png';
import { useEffect, useMemo, useState } from 'react';
import { nanoid } from 'nanoid';
import { LayoutContainer } from '../shared/Layout';
import Tabs from '../shared/Tabs';
import { ITab } from '../shared/Interfaces';
import { Box, Flex, Heading, Input, InputGroup, InputLeftElement, Select } from '@chakra-ui/react';
import { SearchIcon } from '../../styles/Icons';
import { debounce } from '../../utils';

const TeamHeader: React.FC<ITeamHeader> = ({ setSearch, isUsedOnCoachPage }) => {
  const [query, setQuery] = useState<string>();
  const [editionId, setEditionId] = useState<string>();
  const [categoryId, setCategoryId] = useState<string>();

  const tabs: ITab[] = useMemo(
    () =>
      [
        { tabId: 0, title: 'Jucatori', href: '/team', value: 0 },
        { tabId: 1, title: 'Antrenori', href: '/team/coaches', value: 1 },
      ].map((obj) => ({ ...obj, key: nanoid() })),
    []
  );

  //this should come from BE
  const options: { id: string; title: string; key?: string }[] = useMemo(
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

  const setSearchQuery = useMemo(() => debounce((query: string) => setSearch((prevState) => ({ ...prevState, query: query }))), [setSearch]);

  useEffect(() => {
    editionId && setSearch((prevState) => ({ ...prevState, editionId }));
    categoryId && setSearch((prevState) => ({ ...prevState, categoryId }));
  }, [editionId, categoryId, setSearch]);

  useEffect(() => {
    setSearchQuery(query);
  }, [query, setSearchQuery]);

  return (
    <Container {...{ src: Background.src }}>
      <LayoutContainer {...{ className: 'sh-layout-container' }}>
        <Heading {...{ color: 'var(--grey-alpha-50)', fontSize: 'var(--heading-md)' }}>{'Echipa'}</Heading>
        <Tabs {...{ tabs }} />
        <Flex {...{ gap: '20px' }}>
          <InputGroup>
            <InputLeftElement>
              <SearchIcon {...{ color: 'var(--grey-alpha-50)' }} />
            </InputLeftElement>
            <Input
              {...{
                type: 'text',
                placeholder: isUsedOnCoachPage ? 'Cautare: Antrenor' : 'Cautare: Jucator',
                _placeholder: { color: 'var(--grey-alpha-300)' },
                outline: 'none',
                _focus: { borderColor: 'var(--grey-alpha-50)' },
                color: 'var(--grey-alpha-50)',
                onChange: (e) => setQuery(e.target.value),
                w: '350px',
              }}
            />
          </InputGroup>
          {!isUsedOnCoachPage && (
            <>
              <Select
                {...{
                  type: 'text',
                  placeholder: 'Selecteaza editia',
                  _placeholder: { color: 'var(--grey-alpha-300)' },
                  outline: 'none',
                  _focus: { borderColor: 'var(--grey-alpha-50)' },
                  color: 'var(--grey-alpha-50)',
                  onChange: (e) => setEditionId(e.target.value),
                  className: 'th-select',
                }}
              >
                {options?.map(({ title, key, id }) => (
                  <option key={key} {...{ value: id }}>
                    {title}
                  </option>
                ))}
              </Select>
              <Select
                {...{
                  type: 'text',
                  placeholder: 'Selecteaza categoria',
                  _placeholder: { color: 'var(--grey-alpha-300)' },
                  outline: 'none',
                  _focus: { borderColor: 'var(--grey-alpha-50)' },
                  color: 'var(--grey-alpha-50)',
                  onChange: (e) => setCategoryId(e.target.value),
                  className: 'th-select',
                }}
              >
                {options?.map(({ title, key, id }) => (
                  <option key={key} {...{ value: id }}>
                    {title}
                  </option>
                ))}
              </Select>
            </>
          )}
        </Flex>
      </LayoutContainer>
      <Box {...{ position: 'absolute', top: '310px', left: 0, w: '20px', h: '250px', zIndex: 'var(--z-index-2)', background: 'var(--blue-400)' }} />
    </Container>
  );
};
export default TeamHeader;

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
