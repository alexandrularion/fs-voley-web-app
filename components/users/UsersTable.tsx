import styled from 'styled-components';
import { LayoutContainer } from '../shared/Layout';
import { IUsersTable, TBEUser, TUser } from './Interfaces';
import { useMemo, useState } from 'react';
import { CellValue } from 'react-table';
import CommonTable from '../shared/Table';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { PenIcon, TrashIcon } from '../../styles/Icons';
import DeleteModal from '../shared/DeleteModal';
import { toast } from 'react-toastify';
import { FormApi } from 'final-form';
import { getRoleNameByRoleId } from '../../utils';
import { useUsers } from '../../context/ContextUsers';
import { deleteUser, updateUser } from '../../services/User.service';
import UsersCUModal from './UsersCUModal';

const UsersTable: React.FC<IUsersTable> = ({ filter }) => {
  const { users, setUsers } = useUsers();
  const deleteModal = useDisclosure();
  const cuModal = useDisclosure();
  const [user, setUser] = useState<TUser>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmitHandler = async (values: object, form: FormApi) => {
    const { firstName, lastName, email, role } = values as TUser;
    setIsLoading(true);
    try {
      await updateUser(user?.id!, { first_name: firstName, last_name: lastName, role: Number(role), email } as TBEUser);
      setUsers(users.map(({ id, ...obj }) => (id === user?.id ? { id, firstName, lastName, email, role: Number(role) } : { ...obj, id })));
      toast('Felicitari! Utilizatorul a fost actualizat cu success.', { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'bottom-right' });
      cuModal.onClose();
      form.reset();
    } catch (e) {
      toast('Ooops. Ceva nu a mers bine, te rugam incearca din nou.', { hideProgressBar: true, autoClose: 5000, type: 'error', position: 'bottom-right' });
    }
    setIsLoading(false);
  };

  const onDeleteHandler = async (sponsorId: number) => {
    setIsLoading(true);
    try {
      await deleteUser(sponsorId);
      setUsers(users.filter(({ id }) => id !== user?.id!));
      toast('Utilizatorul a fost sters cu succcess.', { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'bottom-right' });
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
        Header: 'Nume',
        accessor: 'firstName',
        Cell: ({ row: { original } }: CellValue) => original.firstName,
      },
      {
        Header: 'Prenume',
        accessor: 'lastName',
        Cell: ({ row: { original } }: CellValue) => original.lastName,
      },
      {
        Header: 'Email',
        accessor: 'email',
        Cell: ({ row: { original } }: CellValue) => original.email,
      },
      {
        Header: 'Tip de utilizator',
        accessor: 'role',
        Cell: ({ row: { original } }: CellValue) => getRoleNameByRoleId(original.role),
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
                      setUser(original);
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
                      setUser(original);
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
      <LayoutContainer {...{ className: 'sl-layout-container' }}>{users && users.length > 0 && <CommonTable {...{ columns, data: users, filter }} />}</LayoutContainer>
      <DeleteModal
        {...{
          isOpen: deleteModal.isOpen,
          onClose: deleteModal.onClose,
          title: `Sterge Utilizator - ${user?.firstName} ${user?.lastName}`,
          description: `Este sigur ca vrei sa stergi utilizatorul ${user?.firstName}? Toate datele asociate utilizatorului vor fi sterse definitiv.`,
          isLoading,
          onDeleteHandler,
          entityId: user?.id!,
        }}
      />
      <UsersCUModal
        {...{
          isOpen: cuModal.isOpen,
          onClose: cuModal.onClose,
          title: `Editeaza Utilizator - ${user?.firstName} ${user?.lastName}`,
          onSubmitHandler,
          isLoading,
          initialValues: user!,
        }}
      />
    </Container>
  );
};

export default UsersTable;

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
