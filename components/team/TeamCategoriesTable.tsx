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
import { TTeamCategory } from './Interfaces';
import { deleteCategory, updateCategory } from '../../services/Team.service';
import EmptyState from '../shared/EmptyState';
import { useTeamCategories } from '../../context/ContextTeamCategory';
import { useRouter } from 'next/dist/client/router';
import TeamCommonCUModal from './TeamCommonCUModal';

const TeamCategoriesTable: React.FC = () => {
  const { teamCategories, setTeamCategories } = useTeamCategories();
  const { reload } = useRouter();
  const deleteModal = useDisclosure();
  const cuModal = useDisclosure();
  const [teamCategory, setTeamCategory] = useState<TTeamCategory>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmitHandler = async (values: object, form: FormApi) => {
    const { title } = values as TTeamCategory;
    setIsLoading(true);
    try {
      await updateCategory(teamCategory?.id!, { title } as TTeamCategory);
      setTeamCategories(teamCategories.map(({ id, ...obj }) => (id === teamCategory?.id ? { id, title, createdAt: new Date().toString(), updatedAt: new Date().toString() } : { ...obj, id })));
      toast('Felicitari! Categoria a fost actualizata cu success.', { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'bottom-right' });
      cuModal.onClose();
      form.reset();
    } catch (e) {
      toast('Ooops. Ceva nu a mers bine, te rugam incearca din nou.', { hideProgressBar: true, autoClose: 5000, type: 'error', position: 'bottom-right' });
    }
    setIsLoading(false);
  };

  const onDeleteHandler = async (categoryId: number) => {
    setIsLoading(true);
    try {
      await deleteCategory(categoryId);
      setTeamCategories(teamCategories.filter(({ id }) => id !== categoryId));
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
        Header: 'Nume lot',
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
                      setTeamCategory(original);
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
                      setTeamCategory(original);
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
        {teamCategories && teamCategories.length > 0 ? <CommonTable {...{ columns, data: teamCategories }} /> : <EmptyState {...{ title: 'Uuups.' }} />}
      </LayoutContainer>
      <DeleteModal
        {...{
          isOpen: deleteModal.isOpen,
          onClose: deleteModal.onClose,
          title: `Sterge lot - ${teamCategory?.title}`,
          description: `Este sigur ca vrei sa stergi lotul  ${teamCategory?.title}?`,
          isLoading,
          onDeleteHandler,
          entityId: teamCategory?.id!,
        }}
      />
      <TeamCommonCUModal
        {...{
          isOpen: cuModal.isOpen,
          onClose: cuModal.onClose,
          title: `Editeaza lot - ${teamCategory?.title}`,
          onSubmitHandler,
          isLoading,
          initialValues: teamCategory as TTeamCategory,
        }}
      />
    </Container>
  );
};

export default TeamCategoriesTable;

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
