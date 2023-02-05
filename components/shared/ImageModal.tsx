import { Button, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import styled from 'styled-components';
import { getHumanDate } from '../../utils';
import { IImageModal } from './Interfaces';

const ImageModal: React.FC<IImageModal> = ({ isOpen, onClose, title, image, createdAt }) => {
  const memoizedCreatedAt: string = useMemo(() => getHumanDate(new Date(createdAt)), [createdAt]);
  return (
    <Modal {...{ isOpen, onClose, blockScrollOnMount: true, isCentered: true, size: '3xl' }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody {...{ textAlign: 'center' }}>
          <Container>
            <Image {...{ src: image, alt: title, width: 500, height: 500, className: 'im-image' }} />
            <Text {...{ textAlign: 'left' }}>{`Actualizat ${memoizedCreatedAt}`}</Text>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button {...{ onClick: onClose, mr: 3, variant: 'outline' }}>Inchide</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default ImageModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-xl);

  .im-image {
    width: 100%;
    height: 60vh;
    object-fit: cover;
  }
`;
