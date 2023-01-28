import styled from 'styled-components';
import { LayoutContainer } from '../shared/Layout';
import Background from '../../assets/Background.png';
import { ISettingsContent } from './Interfaces';
import { Avatar, Button, Flex, Heading, Text, useDisclosure } from '@chakra-ui/react';
import { PenIcon, CheckedFillIcon } from '../../styles/Icons';
import { useSession } from 'next-auth/react';
import { getRoleNameByRoleId } from '../../utils';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import SettingsUModal from './SettingsUModal';
import { FormApi } from 'final-form';
import { toast } from 'react-toastify';
import { TBEUser, TUser } from '../users/Interfaces';
import { updateUser } from '../../services/User.service';
import { TDisplayData } from '../shared/Interfaces';

const SettingsContent: React.FC<ISettingsContent> = () => {
  const uModal = useDisclosure();
  const { data } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<TDisplayData[]>([
    {
      title: 'Prenume',
      description: data!.lastName.toUpperCase(),
      key: 'lastName',
    },
    {
      title: 'Nume',
      description: data!.firstName.toUpperCase(),
      key: 'firstName',
    },
    {
      title: 'Tip de utilizator',
      description: getRoleNameByRoleId(data!.role).toUpperCase(),
      key: nanoid(),
    },
    {
      title: 'Email',
      description: data!.email.toUpperCase(),
      key: 'email',
    },
    {
      title: 'Data inregistrarii',
      description: new Date(data?.createdAt!)
        .toLocaleDateString(undefined, {
          month: 'long',
          year: 'numeric',
        })
        .toUpperCase(),
      key: nanoid(),
    },
  ]);

  const onSubmitHandler = async (values: object, form: FormApi) => {
    const { firstName, lastName, email } = values as TUser;
    setIsLoading(true);
    try {
      await updateUser(data?.id!, { first_name: firstName, last_name: lastName, email } as TBEUser);
      setUserData(
        userData.map(({ key, ...obj }) => {
          switch (key) {
            case 'firstName':
              return { ...obj, key, description: firstName.toUpperCase() };
            case 'lastName':
              return { ...obj, key, description: lastName.toUpperCase() };
            case 'email':
              return { ...obj, key, description: email.toUpperCase() };
            default:
              return { ...obj, key };
          }
        })
      );
      toast('Felicitari! Ti-ai actualizat informatiile cu succes!', { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'bottom-right' });
      uModal.onClose();
      form.reset();
    } catch (err) {
      toast('Ooops. Ceva nu a mers bine, te rugam incearca din nou.', { hideProgressBar: true, autoClose: 5000, type: 'error', position: 'bottom-right' });
    }
    setIsLoading(false);
  };

  return (
    <Container {...{ src: Background.src }}>
      <LayoutContainer {...{ className: 'sc-layout-container' }}>
        <Flex {...{ gap: 'var(--gap-md)', flexDirection: 'column', w: '100%' }}>
          <Text {...{ color: 'var(--white-color)', fontSize: 'var(--text-sm)' }}>{'C.S.M Suceava'}</Text>
          <Flex {...{ w: '100%', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--gap-md)' }}>
            <Heading {...{ color: 'var(--grey-alpha-50)', fontSize: 'var(--heading-md)' }}>{'Setări de utilizator'}</Heading>
            <Button
              {...{
                variant: 'outline',
                colorScheme: 'whiteAlpha',
                color: 'var(--white-color)',
                onClick: () => uModal.onOpen(),
                leftIcon: <PenIcon {...{ color: 'var(--white-color)', size: '22px' }} />,
              }}
            >
              {'Modifică informatii'}
            </Button>
          </Flex>
        </Flex>
        <Flex {...{ alignItems: 'center', gap: 'var(--gap-lg)' }}>
          <Avatar
            {...{
              name: data?.name || 'Alex',
              size: '2xl',
              mb: '3px',
              background: 'var(--blue-200)',
            }}
          />
          <Flex {...{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <Text {...{ fontWeight: 'bold', color: 'var(--white-color)', fontSize: 'var(--heading-xs)' }}>{`Bună, ${data?.name}!`}</Text>
            <Flex {...{ gap: 'var(--gap-sm)', alignItems: 'center' }}>
              <CheckedFillIcon {...{ size: '24px', color: 'var(--green-color)' }} />
              <Text {...{ color: 'var(--grey-alpha-300)', fontSize: 'var(--text-md)', fontWeight: '400' }}>{'Contul dvs. este activat.'}</Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex {...{ gap: 'var(--gap-xl)', justifyContent: 'space-between', w: '100%' }}>
          {userData?.map(({ title, description, key }) => (
            <Flex key={key} {...{ flexDirection: 'column', gap: 'var(--gap-sm)' }}>
              <Text {...{ color: 'var(--grey-alpha-200)' }}>{title}</Text>
              <Heading {...{ color: 'var(--white-color)', fontSize: 'var(--heading-xs)' }}>{description}</Heading>
            </Flex>
          ))}
        </Flex>
      </LayoutContainer>
      <SettingsUModal
        {...{
          title: `Modifică informatii - ${data?.name}`,
          ...uModal,
          onSubmitHandler,
          initialValues: {
            firstName: userData[0].description.toLowerCase(),
            lastName: userData[1].description.toLowerCase(),
            email: userData[3].description.toLowerCase(),
          },
          isLoading,
        }}
      />
    </Container>
  );
};

export default SettingsContent;

const Container = styled.section<{ src: string }>`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: url(${({ src }) => src});
  min-height: 570px;
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
    background: linear-gradient(1.57deg, rgba(6, 4, 183, 1) 1.32%, rgba(56, 54, 218, 0.8) 57.87%, rgba(108, 106, 255, 0.8) 96.57%);
    z-index: var(--z-index-1);
  }

  .sc-layout-container {
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: calc(var(--gap-lg) * 2);
  }
`;
