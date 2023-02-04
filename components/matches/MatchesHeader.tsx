import styled from 'styled-components';
import Background from '../../assets/Background.png';
import { useEffect, useMemo, useState } from 'react';
import { nanoid } from 'nanoid';
import { LayoutContainer } from '../shared/Layout';
import Tabs from '../shared/Tabs';
import { ITab } from '../shared/Interfaces';
import { Box, Button, Flex, Heading, Select, Text, useDisclosure } from '@chakra-ui/react';
import { IMatchesHeader, TBEMatch, TMatch, TMatchChampionship, TMatchClub } from './Interfaces';
import { fetcher, getRoleNameByRoleId } from '../../utils';
import { USER_ROLE } from '../../constants/Enums';
import { useSession } from 'next-auth/react';
import { getAllEditionsSWRKey } from '../../services/Team.service';
import { TTeamEdition } from '../team/Interfaces';
import { createChampionship, createClub, createMatch, getAllChampionshipsSWRKey } from '../../services/Match.service';
import useSWR from 'swr';
import { adminRoutes } from '../../constants/Navigation';
import { PlusIcon } from '../../styles/Icons';
import Link from 'next/link';
import MatchesChampionshipCUModal from './MatchesChampionshipCUModal';
import { FormApi } from 'final-form';
import { toast } from 'react-toastify';
import { useChampionships } from '../../context/ContextChampionship';
import MatchesClubCUModal from './MatchesClubCUModal';
import MatchesMatchCUModal from './MatchesMatchCUModal';
import { useClubs } from '../../context/ContextClub';
import { useMatches } from '../../context/ContextMatch';

const MatchesHeader: React.FC<IMatchesHeader> = ({
  setSearch,
  areFiltrablesVisible = true,
  isUsedInAdminPage = false,
  isUsedInMatchPage = false,
  isUsedInChampionshipPage = false,
  isUsedInClubsPage = false,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [championship, setChampionship] = useState<string>();
  const [edition, setEdition] = useState<string>();
  const { data } = useSession();
  const { setChampionships, championships } = useChampionships();
  const { setClubs, clubs } = useClubs();
  const { setMatches, matches } = useMatches();

  const { onOpen, isOpen, onClose } = useDisclosure();

  const tabs: ITab[] = useMemo(
    () =>
      isUsedInAdminPage
        ? [
            { tabId: 0, title: 'Meciuri', href: '/a/matches', value: 0 },
            { tabId: 1, title: 'Cluburi', href: '/a/matches/clubs', value: 1 },
            { tabId: 2, title: 'Campionate', href: '/a/matches/championships', value: 2 },
          ]
        : [
            { tabId: 0, title: 'Meciuri viitoare', href: '/matches', value: 0 },
            { tabId: 1, title: 'Rezultate', href: '/matches/results', value: 1 },
            { tabId: 2, title: 'Clasament', href: '/matches/ranking', value: 2 },
          ].map((obj) => ({ ...obj, key: nanoid() })),
    [isUsedInAdminPage]
  );

  const { data: championshipsOpt } = useSWR(getAllChampionshipsSWRKey, fetcher);
  const championshipOptions: TMatchChampionship[] = useMemo(() => championshipsOpt?.map((obj: TMatchChampionship) => ({ ...obj, key: nanoid() })) || [], [championshipsOpt]);
  const { data: editions } = useSWR(getAllEditionsSWRKey, fetcher);
  const editionOptions: TTeamEdition[] = useMemo(() => editions?.map((obj: TTeamEdition) => ({ ...obj, key: nanoid() })) || [], [editions]);

  useEffect(() => {
    edition && setSearch && setSearch((prevState) => ({ ...prevState, edition }));
  }, [edition, setSearch]);

  useEffect(() => {
    championship && setSearch && setSearch((prevState) => ({ ...prevState, championship }));
  }, [championship, setSearch]);

  const onSubmitHandler = async (values: object, form: FormApi) => {
    setIsLoading(true);

    try {
      if (isUsedInChampionshipPage) {
        try {
          const { data } = await createChampionship(values as TMatchChampionship);
          const { id } = data as TMatchChampionship;
          setChampionships([...championships, { ...values, updatedAt: new Date().toString(), createdAt: new Date().toString(), id } as TMatchChampionship]);
          toast('Felicitari! Antrenorul a fost adaugat cu success.', { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'bottom-right' });
          onClose();
          form.reset();
        } catch (err) {
          toast('Ooops. Ceva nu a mers bine, te rugam incearca din nou.', { hideProgressBar: true, autoClose: 5000, type: 'error', position: 'bottom-right' });
        }
      } else if (isUsedInClubsPage) {
        const { championshipId } = values as TMatchClub;
        const { data } = await createClub({ ...values, championshipId: Number(championshipId) } as TMatchClub);
        const { id } = data as TMatchClub;
        setClubs([...clubs, { ...values, createdAt: new Date().toString(), championshipId: Number(championshipId), championship: data?.championship, id } as TMatchClub]);
        toast('Felicitari! Clubul a fost adaugata cu success.', { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'bottom-right' });
        onClose();
        form.reset();
      } else {
        const { dateTime, link, editionId, championshipId, clubTwoId } = values as TMatch;
        const { data } = await createMatch({
          dateTime: new Date(dateTime).toISOString(),
          link,
          editionId: Number(editionId),
          championshipId: Number(championshipId),
          club_firstId: Number(1),
          club_secondId: Number(clubTwoId),
        } as TBEMatch);
        const { id } = data as TMatch;
        setMatches([...matches, { ...values, createdAt: new Date().toString(), id } as TMatch]);
        toast('Felicitari! Meciul a fost adaugata cu success.', { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'bottom-right' });
        onClose();
        form.reset();
      }
    } catch (e) {
      toast('Ooops. Ceva nu a mers bine, te rugam incearca din nou.', { hideProgressBar: true, autoClose: 5000, type: 'error', position: 'bottom-right' });
    }
    setIsLoading(false);
  };

  return (
    <Container {...{ src: Background.src }}>
      <LayoutContainer {...{ className: 'sh-layout-container' }}>
        {isUsedInAdminPage && data?.role === USER_ROLE.ADMIN ? (
          <Text {...{ color: 'var(--white-color)', fontSize: 'var(--text-sm)' }}>{getRoleNameByRoleId(data?.role)}</Text>
        ) : (
          <Text {...{ color: 'var(--white-color)', fontSize: 'var(--text-sm)' }}>{'C.S.M Suceava'}</Text>
        )}
        <Flex {...{ w: '100%', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--gap-md)' }}>
          <Heading {...{ color: 'var(--grey-alpha-50)', fontSize: 'var(--heading-md)' }}>{'Calendar Meciuri'}</Heading>
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
                  {isUsedInClubsPage ? 'Adaugă un club' : isUsedInChampionshipPage ? 'Adaugă un campionat' : 'Adaugă un meci'}
                </Button>
              )}
              {!isUsedInAdminPage && (
                <Link {...{ href: adminRoutes.matches.url }}>
                  <Button {...{ variant: 'solid', colorScheme: 'whiteAlpha', color: 'var(--black-color)', background: 'var(--white-color)' }}>{'Gestionează meciuri'}</Button>
                </Link>
              )}
            </>
          )}
        </Flex>
        <Tabs {...{ tabs }} />
        {areFiltrablesVisible && isUsedInMatchPage && (
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
      {isUsedInAdminPage &&
        (isUsedInChampionshipPage ? (
          <MatchesChampionshipCUModal
            {...{
              isOpen,
              onClose,
              title: 'Adaugă un campionat',
              onSubmitHandler,
              isLoading,
            }}
          />
        ) : isUsedInClubsPage ? (
          <MatchesClubCUModal
            {...{
              isOpen,
              onClose,
              title: 'Adaugă un club',
              onSubmitHandler,
              isLoading,
            }}
          />
        ) : (
          <MatchesMatchCUModal
            {...{
              isOpen,
              onClose,
              title: 'Adaugă un meci',
              onSubmitHandler,
              isLoading,
            }}
          />
        ))}
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
