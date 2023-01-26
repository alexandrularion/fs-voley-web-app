import styled from 'styled-components';
import Background from '../../assets/Background.png';
import { useMemo, useState } from 'react';
import { nanoid } from 'nanoid';
import { LayoutContainer } from '../shared/Layout';
import Tabs from '../shared/Tabs';
import { ITab } from '../shared/Interfaces';
import { Box, Button, Flex, Heading, Text, useDisclosure } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { getRoleNameByRoleId } from '../../utils';
import { createUser } from '../../services/User.service';
import { toast } from 'react-toastify';
import { FormApi } from 'final-form';
import { PlusIcon } from '../../styles/Icons';
import { USER_ROLE } from '../../constants/Enums';
import { TBEUser, TUser } from './Interfaces';
import { useUsers } from '../../context/ContextUsers';
import UsersCUModal from './UsersCUModal';

const UsersHeader: React.FC = () => {
  const tabs: ITab[] = useMemo(
    () =>
      [
        { tabId: 0, title: 'Toti utilizatorii', value: 0 },
        { tabId: 1, title: 'Creator de continut', value: 2 },
        { tabId: 2, title: 'Administrator', value: 1 },
      ].map((obj) => ({ ...obj, key: nanoid() })),
    []
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUsers, users } = useUsers();
  const { data } = useSession();
  const cuModal = useDisclosure();

  const onSubmitHandler = async (values: object, form: FormApi) => {
    const { firstName, lastName, email, role } = values as TUser;
    setIsLoading(true);
    try {
      await createUser({ first_name: firstName, last_name: lastName, email, role } as TBEUser);
      setUsers([...users, values as TUser]);
      toast('Felicitari! Utilizatorul a fost adaugat cu success.', { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'bottom-right' });
      cuModal.onClose();
      form.reset();
    } catch (err) {
      toast('Ooops. Ceva nu a mers bine, te rugam incearca din nou.', { hideProgressBar: true, autoClose: 5000, type: 'error', position: 'bottom-right' });
    }
    setIsLoading(false);
  };

  return (
    <Container {...{ src: Background.src }}>
      <LayoutContainer {...{ className: 'sh-layout-container' }}>
        <Text {...{ color: 'var(--white-color)', fontSize: 'var(--text-sm)' }}>{getRoleNameByRoleId(data?.role!)}</Text>
        {data?.role === USER_ROLE.ADMIN && (
          <Flex {...{ w: '100%', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--gap-md)' }}>
            <Heading {...{ color: 'var(--grey-alpha-50)', fontSize: 'var(--heading-md)' }}>{'Utilizatori'}</Heading>
            <Button
              {...{
                variant: 'outline',
                colorScheme: 'whiteAlpha',
                color: 'var(--white-color)',
                onClick: () => cuModal.onOpen(),
                leftIcon: <PlusIcon {...{ color: 'var(--white-color)', size: '22px' }} />,
              }}
            >
              {'Adauga un utilizator'}
            </Button>
          </Flex>
        )}
        <Tabs {...{ tabs }} />
      </LayoutContainer>
      <Box {...{ position: 'absolute', top: '265px', left: 0, w: '20px', h: '170px', zIndex: 'var(--z-index-2)', background: 'var(--blue-500)' }} />
      <UsersCUModal
        {...{
          isOpen: cuModal.isOpen,
          onClose: cuModal.onClose,
          title: 'Adauga utilizator',
          onSubmitHandler,
          isLoading,
        }}
      />
    </Container>
  );
};
export default UsersHeader;

const Container = styled.section<{ src: string }>`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: url(${({ src }) => src});
  min-height: 350px;
  background-size: cover;
  position: relative;
  z-index: var(--z-index-1);
  padding: 50px;

  &::after {
    top: 0;
    left: 0;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(1.57deg, rgba(3, 209, 255, 0.931) 1.32%, rgba(54, 54, 218, 0.833) 57.87%, rgba(127, 106, 255, 0.8) 96.57%);
    z-index: var(--z-index-1);
  }

  .sh-layout-container {
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: var(--gap-md);
  }
`;
