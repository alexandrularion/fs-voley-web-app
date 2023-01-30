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
import { TTeamCategory, TTeamEdition } from './Interfaces';
import { deleteCategory, updateCategory } from '../../services/Team.service';
import EmptyState from '../shared/EmptyState';
import TeamCategoryCUModal from './TeamCommonCUModal';
import { useRouter } from 'next/dist/client/router';
import { useTeamEditions } from '../../context/ContextTeamEdition';

const TeamEditionsTable: React.FC = () => {
  const { teamEditions, setTeamEditions } = useTeamEditions();
  const { reload } = useRouter();
  const deleteModal = useDisclosure();
  const cuModal = useDisclosure();
  const [teamEdition, setTeamEdition] = useState<TTeamCategory>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmitHandler = async (values: object, form: FormApi) => {
    const { title } = values as TTeamCategory;
    setIsLoading(true);
    try {
      await updateCategory(teamEdition?.id!, { title } as TTeamCategory);
      setTeamEditions(teamEditions.map(({ id, ...obj }) => (id === teamEdition?.id ? { id, title, createdAt: new Date().toString(), updatedAt: new Date().toString() } : { ...obj, id })));
      toast('Felicitari! Categoria a fost actualizata cu success.', { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'bottom-right' });
      cuModal.onClose();
      form.reset();
    } catch (e) {
      toast('Ooops. Ceva nu a mers bine, te rugam incearca din nou.', { hideProgressBar: true, autoClose: 5000, type: 'error', position: 'bottom-right' });
    }
    setIsLoading(false);
  };

  const onDeleteHandler = async (editionId: number) => {
    setIsLoading(true);
    try {
      await deleteCategory(editionId);
      setTeamEditions(teamEditions.filter(({ id }) => id !== editionId));
      toast('Categoria a fost stearsa cu succcess.', { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'bottom-right' });
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
        Header: 'Nume editie',
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
                      setTeamEdition(original);
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
                      setTeamEdition(original);
                      deleteModal.onOpen();
                    },
                  }}
                />
              </Box>
            </Flex>
          ) : (
            <Box {...{ onClick: () => reload(), cursor: 'pointer' }}>{'Apasa click pentru incarcare'}</Box>
          ),
      },
    ],
    [deleteModal, cuModal, reload]
  );

  return (
    <Container>
      <LayoutContainer {...{ className: 'sl-layout-container' }}>
        {teamEditions && teamEditions.length > 0 ? <CommonTable {...{ columns, data: teamEditions }} /> : <EmptyState {...{ title: 'Uuups.' }} />}
      </LayoutContainer>
      <DeleteModal
        {...{
          isOpen: deleteModal.isOpen,
          onClose: deleteModal.onClose,
          title: `Sterge editie - ${teamEdition?.title}`,
          description: `Este sigur ca vrei sa stergi editia  ${teamEdition?.title}?`,
          isLoading,
          onDeleteHandler,
          entityId: teamEdition?.id!,
        }}
      />
      <TeamCategoryCUModal
        {...{
          isOpen: cuModal.isOpen,
          onClose: cuModal.onClose,
          title: `Editeaza lot - ${teamEdition?.title}`,
          onSubmitHandler,
          isLoading,
          initialValues: teamEdition as TTeamEdition,
        }}
      />
    </Container>
  );
};

export default TeamEditionsTable;

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
