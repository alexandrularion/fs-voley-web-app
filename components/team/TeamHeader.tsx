import styled from 'styled-components';
import { ITeamHeader, TBETeamPlayer, TTeamCategory, TTeamEdition, TTeamPlayer } from './Interfaces';
import Background from '../../assets/Background.png';
import { useEffect, useMemo, useState } from 'react';
import { nanoid } from 'nanoid';
import { LayoutContainer } from '../shared/Layout';
import Tabs from '../shared/Tabs';
import { ITab } from '../shared/Interfaces';
import { Box, Button, Flex, Heading, Input, InputGroup, InputLeftElement, Link, Select, Text, useDisclosure } from '@chakra-ui/react';
import { PlusIcon, SearchIcon } from '../../styles/Icons';
import { debounce, fetcher, getRoleNameByRoleId } from '../../utils';
import { USER_ROLE } from '../../constants/Enums';
import { useSession } from 'next-auth/react';
import { adminRoutes } from '../../constants/Navigation';
import { createCategory, createEdition, createPlayer, getAllCategoriesSWRKey, getAllEditionsSWRKey } from '../../services/Team.service';
import { toast } from 'react-toastify';
import { useTeamPlayers } from '../../context/ContextTeamPlayers';
import TeamPlayerCUModal from './TeamPlayerCUModal';
import { FormApi } from 'final-form';
import { useTeamCategories } from '../../context/ContextTeamCategory';
import useSWR from 'swr';
import TeamCommonCUModal from './TeamCommonCUModal';
import { useTeamEditions } from '../../context/ContextTeamEdition';

const TeamHeader: React.FC<ITeamHeader> = ({ setSearch, isUsedOnCoachPage = false, isUsedInAdminPage = false, isUsedInCategoryPage = false, isUsedInEditionPage = false }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>();
  const [editionId, setEditionId] = useState<string>();
  const [categoryId, setCategoryId] = useState<string>();

  const { data } = useSession();
  const { setTeamPlayers, teamPlayers } = useTeamPlayers();
  const { setTeamCategories, teamCategories } = useTeamCategories();
  const { setTeamEditions, teamEditions } = useTeamEditions();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const tabs: ITab[] = useMemo(
    () =>
      isUsedInAdminPage
        ? [
            { tabId: 0, title: 'Jucatori', href: '/a/team', value: 0 },
            { tabId: 1, title: 'Antrenori', href: '/a/team/coaches', value: 1 },
            { tabId: 2, title: 'Loturi', href: '/a/team/categories', value: 2 },
            { tabId: 3, title: 'Editii', href: '/a/team/editions', value: 3 },
          ].map((obj) => ({ ...obj, key: nanoid() }))
        : [
            { tabId: 0, title: 'Jucatori', href: isUsedInAdminPage ? '/a/team' : '/team', value: 0 },
            { tabId: 1, title: 'Antrenori', href: isUsedInAdminPage ? '/a/team/coaches' : '/team/coaches', value: 1 },
          ].map((obj) => ({ ...obj, key: nanoid() })),
    [isUsedInAdminPage]
  );

  const { data: categories } = useSWR(getAllCategoriesSWRKey, fetcher);
  const categoryOptions: TTeamCategory[] = useMemo(() => categories?.map((obj: TTeamCategory) => ({ ...obj, key: nanoid() })) || [], [categories]);
  const { data: edition } = useSWR(getAllEditionsSWRKey, fetcher);
  const editionOptions: TTeamEdition[] = useMemo(() => edition?.map((obj: TTeamEdition) => ({ ...obj, key: nanoid() })) || [], [edition]);

  const setSearchQuery = useMemo(() => debounce((query: string) => setSearch((prevState) => ({ ...prevState, query: query }))), [setSearch]);

  useEffect(() => {
    editionId && setSearch((prevState) => ({ ...prevState, editionId }));
    categoryId && setSearch((prevState) => ({ ...prevState, categoryId }));
  }, [editionId, categoryId, setSearch]);

  useEffect(() => {
    setSearchQuery(query);
  }, [query, setSearchQuery]);

  const onSubmitHandler = async (values: object, form: FormApi) => {
    setIsLoading(true);

    try {
      if (isUsedOnCoachPage) {
        // const { title, logo, endDate, startDate, site } = values as T;
        // try {
        //   await createPlayer({ website: site, date_end: endDate, title, image_url: logo, date_start: startDate } as TBESponsor);
        //   setSponsors([...sponsors, values as TSponsor]);
        //   toast('Felicitari! Sponsorul a fost adaugat cu success.', { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'bottom-right' });
        //   onClose();
        //   form.reset();
        // } catch (err) {
        //   toast('Ooops. Ceva nu a mers bine, te rugam incearca din nou.', { hideProgressBar: true, autoClose: 5000, type: 'error', position: 'bottom-right' });
        // }
      } else if (isUsedInCategoryPage) {
        const { title } = values as TTeamCategory;
        await createCategory({ title } as TTeamCategory);
        setTeamCategories([...teamCategories, { ...values, createdAt: new Date().toString(), updatedAt: new Date().toString() } as TTeamCategory]);
        toast('Felicitari! Categoria a fost adaugata cu success.', { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'bottom-right' });
        onClose();
        form.reset();
      } else if (isUsedInEditionPage) {
        const { title } = values as TTeamEdition;
        await createEdition({ title } as TTeamEdition);
        setTeamEditions([...teamEditions, { ...values, createdAt: new Date().toString(), updatedAt: new Date().toString() } as TTeamEdition]);
        toast('Felicitari! Editia a fost adaugata cu success.', { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'bottom-right' });
        onClose();
        form.reset();
      } else {
        const { name, surName, position, birthday, nationality, height, description, image, shirtNumber } = values as TTeamPlayer;
        await createPlayer({
          first_name: name,
          last_name: surName,
          position,
          birthday: new Date(birthday).toISOString(),
          nationality,
          height: Number(height),
          description,
          shirtNumber,
          image,
        } as TBETeamPlayer);
        setTeamPlayers([...teamPlayers, values as TTeamPlayer]);
        toast('Felicitari! jucatorul a fost adaugat cu success.', { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'bottom-right' });
        onClose();
        form.reset();
      }
    } catch (e) {
      toast('Ooops. Ceva nu a mers bine, te rugam incearca din nou.', { hideProgressBar: true, autoClose: 5000, type: 'error', position: 'bottom-right' });
    }
    setIsLoading(false);
  };

  return (
    <Container {...{ src: Background.src, isUsedInAdminPage }}>
      <LayoutContainer {...{ className: 'sh-layout-container' }}>
        {isUsedInAdminPage && data?.role === USER_ROLE.ADMIN ? (
          <Text {...{ color: 'var(--white-color)', fontSize: 'var(--text-sm)' }}>{getRoleNameByRoleId(data?.role)}</Text>
        ) : (
          <Text {...{ color: 'var(--white-color)', fontSize: 'var(--text-sm)' }}>{'C.S.M Suceava'}</Text>
        )}
        <Flex {...{ w: '100%', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--gap-md)' }}>
          <Heading {...{ color: 'var(--grey-alpha-50)', fontSize: 'var(--heading-md)' }}>{'Echipa'}</Heading>
          {data?.role === USER_ROLE.ADMIN && (
            <>
              {isUsedInAdminPage && (
                <Button
                  {...{
                    variant: 'outline',
                    colorScheme: 'whiteAlpha',
                    color: 'var(--white-color)',
                    onClick: () => onOpen(),
                    leftIcon: <PlusIcon {...{ color: 'var(--white-color)', size: '22px' }} />,
                  }}
                >
                  {isUsedOnCoachPage ? 'Adauga un antrenor' : isUsedInCategoryPage ? 'Adauga un lot' : isUsedInEditionPage ? 'Adauga o editie' : 'Adauga un jucator'}
                </Button>
              )}
              {!isUsedInAdminPage && (
                <Link {...{ href: adminRoutes.team.url }}>
                  <Button {...{ variant: 'solid', colorScheme: 'whiteAlpha', color: 'var(--black-color)', background: 'var(--white-color)' }}>{'Gestioneaza echipa'}</Button>
                </Link>
              )}
            </>
          )}
        </Flex>
        <Tabs {...{ tabs }} />
        <Flex {...{ gap: '20px' }}>
          <InputGroup>
            <InputLeftElement>
              <SearchIcon {...{ color: 'var(--grey-alpha-50)' }} />
            </InputLeftElement>
            <Input
              {...{
                type: 'text',
                placeholder: isUsedOnCoachPage ? 'Cautare: Antrenor' : isUsedInCategoryPage ? 'Cautare: Categorie' : isUsedInEditionPage ? 'Cautare: Editie' : 'Cautare: Jucator',
                _placeholder: { color: 'var(--grey-alpha-300)' },
                outline: 'none',
                _focus: { borderColor: 'var(--grey-alpha-50)' },
                color: 'var(--grey-alpha-50)',
                onChange: (e) => setQuery(e.target.value),
                w: '350px',
              }}
            />
          </InputGroup>
          {!isUsedOnCoachPage && !isUsedInCategoryPage && !isUsedInEditionPage && (
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
                {editionOptions?.map(({ title, key, id }) => (
                  <option key={key} {...{ value: id }}>
                    {title}
                  </option>
                ))}
              </Select>
              <Select
                {...{
                  type: 'text',
                  placeholder: 'Selecteaza lotul',
                  _placeholder: { color: 'var(--grey-alpha-300)' },
                  outline: 'none',
                  _focus: { borderColor: 'var(--grey-alpha-50)' },
                  color: 'var(--grey-alpha-50)',
                  onChange: (e) => setCategoryId(e.target.value),
                  className: 'th-select',
                }}
              >
                {categoryOptions?.map(({ title, key, id }: TTeamCategory) => (
                  <option key={key} {...{ value: id }}>
                    {title}
                  </option>
                ))}
              </Select>
            </>
          )}
        </Flex>
      </LayoutContainer>
      <Box {...{ position: 'absolute', top: '320px', left: 0, w: '20px', h: '250px', zIndex: 'var(--z-index-2)', background: 'var(--blue-400)' }} />
      {isUsedInAdminPage &&
        (isUsedOnCoachPage ? (
          <>asdasdasd</>
        ) : isUsedInEditionPage ? (
          <TeamCommonCUModal
            {...{
              isOpen,
              onClose,
              title: 'Adauga o editie',
              onSubmitHandler,
              isLoading,
            }}
          />
        ) : isUsedInCategoryPage ? (
          <TeamCommonCUModal
            {...{
              isOpen,
              onClose,
              title: 'Adauga un lot',
              onSubmitHandler,
              isLoading,
            }}
          />
        ) : (
          <TeamPlayerCUModal
            {...{
              isOpen,
              onClose,
              title: 'Adauga un jucator',
              onSubmitHandler,
              isLoading,
            }}
          />
        ))}
    </Container>
  );
};
export default TeamHeader;

const Container = styled.section<{ src: string; isUsedInAdminPage: boolean }>`
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
    background: ${({ isUsedInAdminPage }) =>
      isUsedInAdminPage
        ? 'linear-gradient(1.57deg, rgba(3, 209, 255, 0.931) 1.32%, rgba(54, 54, 218, 0.833) 57.87%, rgba(127, 106, 255, 0.8) 96.57%)'
        : 'linear-gradient(1.57deg, rgba(6, 4, 183, 0.8) 1.32%, rgba(56, 54, 218, 0.8) 57.87%, rgba(108, 106, 255, 0.8) 96.57%)'};
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
