import { Button, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import styled from 'styled-components';
import { getHumanDate } from '../../utils';
import { IImageModal } from './Interfaces';

const ImageModal: React.FC<IImageModal> = ({ isOpen, onClose, title, image, createdAt }) => {
  const memoizedCreatedAt: string = useMemo(() => getHumanDate(new Date(createdAt)), [createdAt]);
  return (
    <Modal {...{ isOpen, onClose, blockScrollOnMount: true, isCentered: true }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody {...{ textAlign: 'center' }}>
          <Container>
            <Image {...{ src: image, alt: title, height: 450 }} />
            <Text>{`Actualizat ${memoizedCreatedAt}`}</Text>
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
  justify-content: center;
  align-items: center;
  gap: var(--gap-sm);

  img {
    width: max-content;
  }
`;
