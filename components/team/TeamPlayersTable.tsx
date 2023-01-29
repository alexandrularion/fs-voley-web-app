import styled from 'styled-components';
import { LayoutContainer } from '../shared/Layout';
import { useMemo, useState } from 'react';
import { CellValue } from 'react-table';
import CommonTable from '../shared/Table';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { PenIcon, TrashIcon } from '../../styles/Icons';
import DeleteModal from '../shared/DeleteModal';
import { toast } from 'react-toastify';
import { FormApi } from 'final-form';
import { useTeamPlayers } from '../../context/ContextTeamPlayers';
import { TBETeamPlayer, TTeamPlayer } from './Interfaces';
import { deletePlayer, updatePlayer } from '../../services/Team.service';
import Image from 'next/image';

const TeamPlayersTable: React.FC = () => {
  const { teamPlayers, setTeamPlayers } = useTeamPlayers();
  const deleteModal = useDisclosure();
  const cuModal = useDisclosure();
  const [teamPlayer, setTeamPlayer] = useState<TTeamPlayer>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmitHandler = async (values: object, form: FormApi) => {
    const { name, surName, position, birthday, nationality, height, description, image, shirtNumber } = values as TTeamPlayer;
    setIsLoading(true);
    try {
      await updatePlayer(teamPlayer?.id!, { first_name: name, last_name: surName, position, birthday, nationality, height, description } as TBETeamPlayer);
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
        Header: 'Fotografie profil',
        accessor: 'image',
        Cell: ({ row: { original } }: CellValue) => (
          <Flex>
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
        Cell: ({ row: { original } }: CellValue) => original.birthday,
      },
      {
        Header: 'Nationalitate',
        accessor: 'nationality',
        Cell: ({ row: { original } }: CellValue) => original.nationality,
      },
      {
        Header: 'Inaltime',
        accessor: 'height',
        Cell: ({ row: { original } }: CellValue) => original.height,
      },
      {
        Header: 'Actiuni',
        accessor: 'actions',
        Cell: ({ row: { original } }: CellValue) =>
          original?.id && (
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
          ),
      },
    ],
    [deleteModal, cuModal]
  );

  return (
    <Container>
      <LayoutContainer {...{ className: 'sl-layout-container' }}>{teamPlayers && teamPlayers.length > 0 && <CommonTable {...{ columns, data: teamPlayers }} />}</LayoutContainer>
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
      {/* <UsersCUModal
        {...{
          isOpen: cuModal.isOpen,
          onClose: cuModal.onClose,
          title: `Editeaza utilizator - ${user?.firstName} ${user?.lastName}`,
          onSubmitHandler,
          isLoading,
          initialValues: user!,
        }}
      /> */}
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
    top: -85px;
    gap: var(--gap-lg);
  }
`;
