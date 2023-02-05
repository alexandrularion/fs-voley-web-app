import styled from 'styled-components';
import { THistory } from './Interfaces';
import Background from '../../assets/Background.png';
import { useState } from 'react';
import { LayoutContainer } from '../shared/Layout';
import { Box, Button, Flex, Heading, Text, useDisclosure } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { getRoleNameByRoleId } from '../../utils';
import { toast } from 'react-toastify';
import { FormApi } from 'final-form';
import { PlusIcon } from '../../styles/Icons';
import { useHistories } from '../../context/ContextHistory';
import { createHistory } from '../../services/History.service';
import HistoryCUModal from './HistoryCUModal';

const HistoryHeader: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setHistories, histories } = useHistories();
  const { data } = useSession();
  const { onClose, isOpen, onOpen } = useDisclosure();

  const onSubmitHandler = async (values: object, form: FormApi) => {
    setIsLoading(true);
    try {
      const { data } = await createHistory(values as THistory);
      const { id } = data as THistory;
      setHistories([...histories, { ...values, id } as THistory]);
      toast('Felicitari! Continutul a fost adaugat cu success.', { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'bottom-right' });
      onClose();
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
        <Flex {...{ w: '100%', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--gap-md)' }}>
          <Heading {...{ color: 'var(--grey-alpha-50)', fontSize: 'var(--heading-md)' }}>{'Istoric Club'}</Heading>
          <Button
            {...{
              variant: 'outline',
              colorScheme: 'whiteAlpha',
              color: 'var(--white-color)',
              onClick: () => onOpen(),
              leftIcon: <PlusIcon {...{ color: 'var(--white-color)', size: '22px' }} />,
            }}
          >
            {'Adaugă o noua sectiune'}
          </Button>
        </Flex>
      </LayoutContainer>
      <Box {...{ position: 'absolute', top: '265px', left: 0, w: '20px', h: '170px', zIndex: 'var(--z-index-2)', background: 'var(--blue-500)' }} />
      <HistoryCUModal
        {...{
          isOpen,
          onClose,
          title: 'Adaugă o noua sectiune',
          onSubmitHandler,
          isLoading,
        }}
      />
    </Container>
  );
};
export default HistoryHeader;

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
    margin-top: 30px;
  }
`;
