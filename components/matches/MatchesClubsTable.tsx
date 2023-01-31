import styled from 'styled-components';
import { LayoutContainer } from '../shared/Layout';
import { useMemo, useState } from 'react';
import { CellValue } from 'react-table';
import CommonTable from '../shared/Table';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { PenIcon, TrashIcon } from '../../styles/Icons';
import DeleteModal from '../shared/DeleteModal';
import { FormApi } from 'final-form';
import { TMatchClub } from './Interfaces';
import { deleteClub, updateClub } from '../../services/Match.service';
import { toast } from 'react-toastify';
import EmptyState from '../shared/EmptyState';
import { useClubs } from '../../context/ContextClub';
import Image from 'next/image';
import MatchesClubCUModal from './MatchesClubCUModal';

const MatchesClubsTable: React.FC = () => {
  const { clubs, setClubs } = useClubs();
  const deleteModal = useDisclosure();
  const cuModal = useDisclosure();
  const [club, setClub] = useState<TMatchClub>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmitHandler = async (values: object, form: FormApi) => {
    const { title, image, championshipId } = values as TMatchClub;
    setIsLoading(true);
    try {
      await updateClub(club?.id!, { id: club?.id!, title, image, championshipId } as TMatchClub);
      setClubs(clubs.map(({ id, ...obj }) => (id === club?.id ? { id: club?.id!, title, image, championshipId, createdAt: new Date().toString() } : { ...obj, id })));
      toast('Felicitari! Clubul a fost actualizat cu success.', { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'bottom-right' });
      cuModal.onClose();
      form.reset();
    } catch (e) {
      toast('Ooops. Ceva nu a mers bine, te rugam incearca din nou.', { hideProgressBar: true, autoClose: 5000, type: 'error', position: 'bottom-right' });
    }
    setIsLoading(false);
  };

  const onDeleteHandler = async (matchId: number) => {
    setIsLoading(true);
    try {
      await deleteClub(matchId);
      setClubs(clubs.filter(({ id }) => id !== matchId));
      toast('Clubul a fost sters cu succcess.', { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'bottom-right' });
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
        Header: 'Logo',
        accessor: 'image',
        Cell: ({ row: { original } }: CellValue) => (
          <Flex
            {...{
              cursor: 'pointer',
              gap: 'var(--gap-xs)',
              alignItems: 'center',
            }}
          >
            <Image {...{ src: original.image, width: 80, height: 80, alt: 'Logo Club' }} />
          </Flex>
        ),
      },
      {
        Header: 'Nume Club',
        accessor: 'title',
        Cell: ({ row: { original } }: CellValue) => original.title,
      },
      {
        Header: 'Creat la',
        accessor: 'createdAt',
        Cell: ({ row: { original } }: CellValue) =>
          new Date(original.createdAt).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }),
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
                      setClub({
                        ...original,
                      });
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
                      setClub({
                        ...original,
                      });
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
      <LayoutContainer {...{ className: 'sl-layout-container' }}>{clubs && clubs.length > 0 ? <CommonTable {...{ columns, data: clubs }} /> : <EmptyState {...{ title: 'Uuups.' }} />}</LayoutContainer>
      <DeleteModal
        {...{
          isOpen: deleteModal.isOpen,
          onClose: deleteModal.onClose,
          title: `Sterge club - ${club?.title}`,
          description: `Este sigur ca vrei sa stergi clubul - ${club?.title}? Toate datele asociate clubului vor fi sterse definitiv.`,
          isLoading,
          onDeleteHandler,
          entityId: club?.id!,
        }}
      />
      <MatchesClubCUModal
        {...{
          isOpen: cuModal.isOpen,
          onClose: cuModal.onClose,
          title: `Editeaza club - ${club?.title}`,
          onSubmitHandler,
          isLoading,
          initialValues: {
            ...club!,
          },
        }}
      />
    </Container>
  );
};

export default MatchesClubsTable;

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
