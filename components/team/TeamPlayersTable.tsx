import styled from 'styled-components';
import { LayoutContainer } from '../shared/Layout';
import { useMemo, useState } from 'react';
import { CellValue } from 'react-table';
import CommonTable from '../shared/Table';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { EyeIcon, PenIcon, TrashIcon } from '../../styles/Icons';
import DeleteModal from '../shared/DeleteModal';
import { toast } from 'react-toastify';
import { FormApi } from 'final-form';
import { useTeamPlayers } from '../../context/ContextTeamPlayers';
import { TBETeamPlayer, TTeamPlayer } from './Interfaces';
import { deletePlayer, updatePlayer } from '../../services/Team.service';
import Image from 'next/image';
import EmptyState from '../shared/EmptyState';
import TeamPlayerDModal from './TeamPlayerDModal';
import TeamPlayerCUModal from './TeamPlayerCUModal';
import ImageModal from '../shared/ImageModal';
import { useRouter } from 'next/router';

const TeamPlayersTable: React.FC = () => {
  const { teamPlayers, setTeamPlayers } = useTeamPlayers();
  const { reload } = useRouter();
  const deleteModal = useDisclosure();
  const dModal = useDisclosure();
  const cuModal = useDisclosure();
  const iModal = useDisclosure();
  const [teamPlayer, setTeamPlayer] = useState<TTeamPlayer>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmitHandler = async (values: object, form: FormApi) => {
    const { name, surName, position, birthday, nationality, height, description, image, shirtNumber, editionId, categoryId } = values as TTeamPlayer;
    setIsLoading(true);
    try {
      await updatePlayer(teamPlayer?.id!, {
        first_name: name,
        last_name: surName,
        position,
        birthday: new Date(birthday).toISOString(),
        nationality,
        height,
        description,
        image,
        shirtNumber,
        categoryId: Number(categoryId),
        editionId: Number(editionId),
      } as TBETeamPlayer);
      setTeamPlayers(teamPlayers.map(({ id, ...obj }) => (id === teamPlayer?.id ? { id, name, surName, position, birthday, nationality, height, description, image, shirtNumber } : { ...obj, id })));
      toast('Felicitari! Jucatorul a fost actualizat cu success.', { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'bottom-right' });
      cuModal.onClose();
      form.reset();
    } catch (e) {
      toast('Ooops. Ceva nu a mers bine, te rugam incearca din nou.', { hideProgressBar: true, autoClose: 5000, type: 'error', position: 'bottom-right' });
    }
    setIsLoading(false);
  };

  const onDeleteHandler = async (playerId: number) => {
    setIsLoading(true);
    try {
      await deletePlayer(playerId);
      setTeamPlayers(teamPlayers.filter(({ id }) => id !== playerId));
      toast('Jucatorul a fost sters cu succcess.', { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'bottom-right' });
      deleteModal.onClose();
    } catch (e) {
      toast('Ooops. Ceva nu a mers bine, te rugam incearca din nou.', { hideProgressBar: true, autoClose: 5000, type: 'error', position: 'bottom-right' });
    }
    setIsLoading(false);
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
        Cell: ({ row: { original } }: CellValue) => <> {original.id ? `#${original.id}` : ''}</>,
      },
      {
        Header: 'Profil',
        accessor: 'image',
        Cell: ({ row: { original } }: CellValue) => (
          <Flex
            {...{
              cursor: 'pointer',
              justifyContent: 'center',
              gap: 'var(--gap-xs)',
              alignItems: 'center',
              onClick: async () => {
                setTeamPlayer(original);
                iModal.onOpen();
              },
            }}
          >
            <Image {...{ src: original.image, width: 100, height: 100, alt: 'Fotografie Profile' }} />
          </Flex>
        ),
      },
      {
        Header: 'Nume',
        accessor: 'name',
        Cell: ({ row: { original } }: CellValue) => original.name,
      },
      {
        Header: 'Prenume',
        accessor: 'surName',
        Cell: ({ row: { original } }: CellValue) => original.surName,
      },
      {
        Header: 'Pozitie',
        accessor: 'position',
        Cell: ({ row: { original } }: CellValue) => original.position,
      },
      {
        Header: 'Data nasterii',
        accessor: 'birthday',
        Cell: ({ row: { original } }: CellValue) => new Date(original.birthday).toLocaleDateString('ro-RO', { day: 'numeric', year: 'numeric', month: 'long' }),
      },
      {
        Header: 'Nationalitate',
        accessor: 'nationality',
        Cell: ({ row: { original } }: CellValue) => original.nationality,
      },
      {
        Header: 'Inaltime',
        accessor: 'height',
        Cell: ({ row: { original } }: CellValue) => `${original.height}cm`,
      },
      {
        Header: 'Biografie',
        accessor: 'description',
        Cell: ({ row: { original } }: CellValue) => (
          <Flex
            {...{
              cursor: 'pointer',
              justifyContent: 'center',
              gap: 'var(--gap-xs)',
              alignItems: 'center',
              onClick: async () => {
                setTeamPlayer(original);
                dModal.onOpen();
              },
            }}
          >
            <EyeIcon
              {...{
                size: '20px',
                color: 'var(--grey-alpha-600)',
              }}
            />
            Vezi Biografie
          </Flex>
        ),
      },
      {
        Header: 'Actiuni',
        accessor: 'actions',
        Cell: ({ row: { original } }: CellValue) =>
          original?.id ? (
            <Flex {...{ gap: 'var(--gap-md)' }}>
              <Box {...{ cursor: 'pointer ' }}>
                <PenIcon
                  {...{
                    size: '22px',
                    color: 'var(--grey-alpha-600)',
                    onClick: async () => {
                      setTeamPlayer(original);
                      cuModal.onOpen();
                    },
                  }}
                />
              </Box>
              <Box {...{ cursor: 'pointer ' }}>
                <TrashIcon
                  {...{
                    size: '22px',
                    color: 'var(--red-color)',
                    onClick: () => {
                      setTeamPlayer(original);
                      deleteModal.onOpen();
                    },
                  }}
                />
              </Box>
            </Flex>
          ) : (
            <Box {...{ onClick: () => reload(), cursor: 'pointer' }}>{'Click aici pentru incarcare'}</Box>
          ),
      },
    ],
    [deleteModal, cuModal, dModal, iModal, reload]
  );

  return (
    <Container>
      <LayoutContainer {...{ className: 'sl-layout-container' }}>
        {teamPlayers && teamPlayers.length > 0 ? <CommonTable {...{ columns, data: teamPlayers }} /> : <EmptyState {...{ title: 'Uuups.' }} />}
      </LayoutContainer>
      <DeleteModal
        {...{
          isOpen: deleteModal.isOpen,
          onClose: deleteModal.onClose,
          title: `Sterge utilizator - ${teamPlayer?.name} ${teamPlayer?.surName}`,
          description: `Este sigur ca vrei sa stergi jucatorul ${teamPlayer?.name}? Toate datele asociate jucatorului vor fi sterse definitiv.`,
          isLoading,
          onDeleteHandler,
          entityId: teamPlayer?.id!,
        }}
      />
      <TeamPlayerCUModal
        {...{
          isOpen: cuModal.isOpen,
          onClose: cuModal.onClose,
          title: `Editeaza jucator - ${teamPlayer?.name} ${teamPlayer?.surName}`,
          onSubmitHandler,
          isLoading,
          initialValues: { ...teamPlayer!, birthday: teamPlayer?.birthday! ? new Date(teamPlayer?.birthday!)?.toISOString().slice(0, 10) : teamPlayer?.birthday! } as TTeamPlayer,
        }}
      />
      <TeamPlayerDModal
        {...{
          isOpen: dModal.isOpen,
          onClose: dModal.onClose,
          title: `Biografie - ${teamPlayer?.name} ${teamPlayer?.surName}`,
          description: teamPlayer?.description!,
        }}
      />
      <ImageModal
        {...{
          isOpen: iModal.isOpen,
          onClose: iModal.onClose,
          title: `Vizualiare imagine profil - ${teamPlayer?.name} ${teamPlayer?.surName}`,
          image: teamPlayer?.image!,
          createdAt: teamPlayer?.createdAt!,
        }}
      />
    </Container>
  );
};

export default TeamPlayersTable;

const Container = styled.section`
  display: flex;
  justify-content: center;

  .sl-layout-container {
    display: flex;
    position: relative;
    top: -110px;
    gap: var(--gap-lg);
  }
`;
