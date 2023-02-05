import styled from 'styled-components';
import { LayoutContainer } from '../shared/Layout';
import { useMemo, useState } from 'react';
import { CellValue } from 'react-table';
import Image from 'next/image';
import CommonTable from '../shared/Table';
import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { EyeIcon, PenIcon, TrashIcon } from '../../styles/Icons';
import DeleteModal from '../shared/DeleteModal';
import { toast } from 'react-toastify';
import { FormApi } from 'final-form';
import { THistory } from './Interfaces';
import { useHistories } from '../../context/ContextHistory';
import { deleteHistory, updateHistory } from '../../services/History.service';
import EmptyState from '../shared/EmptyState';
import HistoryCUModal from './HistoryCUModal';
import ImageModal from '../shared/ImageModal';
import TeamCommonDModal from '../team/TeamCommonDModal';

const HistoryTable: React.FC = () => {
  const { histories, setHistories } = useHistories();
  const deleteModal = useDisclosure();
  const cuModal = useDisclosure();
  const iModal = useDisclosure();
  const dModal = useDisclosure();
  const [history, setHistory] = useState<THistory>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmitHandler = async (values: object, form: FormApi) => {
    setIsLoading(true);
    try {
      await updateHistory(history?.id!, values as THistory);
      setHistories(histories.map(({ id, ...obj }) => (id === history?.id ? { ...(values as THistory), id } : { ...obj, id })));
      toast('Felicitari! Continutul a fost actualizat cu success.', { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'bottom-right' });
      cuModal.onClose();
      form.reset();
    } catch (e) {
      toast('Ooops. Ceva nu a mers bine, te rugam incearca din nou.', { hideProgressBar: true, autoClose: 5000, type: 'error', position: 'bottom-right' });
    }
    setIsLoading(false);
  };

  const onDeleteHandler = async (historyId: number) => {
    setIsLoading(true);
    try {
      await deleteHistory(historyId);
      setHistories(histories.filter(({ id }) => id !== historyId));
      toast('Continutul a fost sters cu succcess.', { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'bottom-right' });
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
        Header: 'Imagine',
        accessor: 'image',
        Cell: ({ row: { original } }: CellValue) => (
          <Flex
            {...{
              cursor: 'pointer',
              justifyContent: 'center',
              gap: 'var(--gap-xs)',
              alignItems: 'center',
              onClick: async () => {
                setHistory(original);
                iModal.onOpen();
              },
            }}
          >
            <Image {...{ src: original.image, width: 200, height: 100, alt: 'Continut', style: { width: 'max-content', height: '100px' } }} />
          </Flex>
        ),
      },
      {
        Header: 'Descriere',
        accessor: 'description',
        Cell: ({ row: { original } }: CellValue) => (
          <Flex
            {...{
              cursor: 'pointer',
              justifyContent: 'flex-start',
              gap: 'var(--gap-xs)',
              alignItems: 'center',
              onClick: async () => {
                setHistory(original);
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
            Vezi descrierea
          </Flex>
        ),
      },
      {
        Header: 'Aliniat',
        accessor: 'aligned',
        Cell: ({ row: { original } }: CellValue) => <Flex>{original.aligned === 'left' ? 'La stânga' : original.aligned === 'right' ? 'La dreapta' : 'În centru'}</Flex>,
      },
      {
        Header: 'Actualizat la',
        accessor: 'updatedAt',
        Cell: ({ row: { original } }: CellValue) => (
          <Text>{new Date(original.updatedAt).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}</Text>
        ),
      },
      {
        Header: 'Actiuni',
        accessor: 'actions',
        Cell: ({ row: { original } }: CellValue) => (
          <Flex {...{ gap: 'var(--gap-md)' }}>
            <Box {...{ cursor: 'pointer ' }}>
              <PenIcon
                {...{
                  size: '22px',
                  color: 'var(--grey-alpha-600)',
                  onClick: async () => {
                    setHistory({
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
                    setHistory({
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
    [deleteModal, cuModal, iModal, dModal]
  );

  return (
    <Container>
      <LayoutContainer {...{ className: 'sl-layout-container' }}>{histories && histories.length > 0 ? <CommonTable {...{ columns, data: histories }} /> : <EmptyState />}</LayoutContainer>
      <DeleteModal
        {...{
          isOpen: deleteModal.isOpen,
          onClose: deleteModal.onClose,
          title: `Sterge Continut - ${history?.title}`,
          description: `Este sigur ca vrei sa stergi continutul ${history?.title}? Toate datele asociate continutului vor fi sterse definitiv.`,
          isLoading,
          onDeleteHandler,
          entityId: history?.id!,
        }}
      />
      <HistoryCUModal
        {...{
          isOpen: cuModal.isOpen,
          onClose: cuModal.onClose,
          title: `Editeaza Continut - ${history?.title}`,
          onSubmitHandler,
          isLoading,
          initialValues: {
            ...history!,
          },
        }}
      />
      <TeamCommonDModal
        {...{
          isOpen: dModal.isOpen,
          onClose: dModal.onClose,
          title: `Descriere - ${history?.title}`,
          description: history?.description!,
        }}
      />
      <ImageModal
        {...{
          isOpen: iModal.isOpen,
          onClose: iModal.onClose,
          title: `Vizualiare Continut Imagine - ${history?.title}`,
          image: history?.image!,
          createdAt: history?.createdAt!,
        }}
      />
    </Container>
  );
};

export default HistoryTable;

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
