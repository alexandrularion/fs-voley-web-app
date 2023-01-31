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
import EmptyState from '../shared/EmptyState';
import { useRouter } from 'next/dist/client/router';
import { TMatchChampionship } from './Interfaces';
import MatchesChampionshipCUModal from './MatchesChampionshipCUModal';
import { useChampionships } from '../../context/ContextChampionship';
import { deleteChampionship, updateChampionship } from '../../services/Match.service';

const MatchesChampionshipsTable: React.FC = () => {
  const { championships, setChampionships } = useChampionships();
  const { reload } = useRouter();
  const deleteModal = useDisclosure();
  const cuModal = useDisclosure();
  const [championship, setChampionship] = useState<TMatchChampionship>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmitHandler = async (values: object, form: FormApi) => {
    const { title } = values as TMatchChampionship;
    setIsLoading(true);
    try {
      await updateChampionship(championship?.id!, { title } as TMatchChampionship);
      setChampionships(championships.map(({ id, ...obj }) => (id === championship?.id ? { id, title, createdAt: new Date().toString(), updatedAt: new Date().toString() } : { ...obj, id })));
      toast('Felicitari! Campionatul a fost actualizat cu success.', { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'bottom-right' });
      cuModal.onClose();
      form.reset();
    } catch (e) {
      toast('Ooops. Ceva nu a mers bine, te rugam incearca din nou.', { hideProgressBar: true, autoClose: 5000, type: 'error', position: 'bottom-right' });
    }
    setIsLoading(false);
  };

  const onDeleteHandler = async (championshipId: number) => {
    setIsLoading(true);
    try {
      await deleteChampionship(championshipId);
      setChampionships(championships.filter(({ id }) => id !== championshipId));
      toast('Campionatul a fost sters cu succcess.', { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'bottom-right' });
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
        Cell: ({ row: { original } }: CellValue) => <> {original.id ? `#${original.id}` : '-'}</>,
      },
      {
        Header: 'Nume campionat',
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
        Header: 'Actualizat la',
        accessor: 'updatedAt',
        Cell: ({ row: { original } }: CellValue) =>
          new Date(original.updatedAt).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }),
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
                      setChampionship(original);
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
                      setChampionship(original);
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
    [deleteModal, cuModal, reload]
  );

  return (
    <Container>
      <LayoutContainer {...{ className: 'sl-layout-container' }}>
        {championships && championships.length > 0 ? <CommonTable {...{ columns, data: championships }} /> : <EmptyState {...{ title: 'Uuups.' }} />}
      </LayoutContainer>
      <DeleteModal
        {...{
          isOpen: deleteModal.isOpen,
          onClose: deleteModal.onClose,
          title: `Sterge campionat - ${championship?.title}`,
          description: `Este sigur ca vrei sa stergi campionatul  ${championship?.title}?`,
          isLoading,
          onDeleteHandler,
          entityId: championship?.id!,
        }}
      />
      <MatchesChampionshipCUModal
        {...{
          isOpen: cuModal.isOpen,
          onClose: cuModal.onClose,
          title: `Editeaza campionat - ${championship?.title}`,
          onSubmitHandler,
          isLoading,
          initialValues: championship as TMatchChampionship,
        }}
      />
    </Container>
  );
};

export default MatchesChampionshipsTable;

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
