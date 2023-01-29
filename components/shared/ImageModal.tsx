import { Button, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { getHumanDate } from '../../utils';
import { IImageModal } from './Interfaces';

const ImageModal: React.FC<IImageModal> = ({ isOpen, onClose, title, image, createdAt }) => {
  const memoizedCreatedAt: string = useMemo(() => getHumanDate(new Date(createdAt)), [createdAt]);
  return (
    <Modal {...{ isOpen, onClose, blockScrollOnMount: true, isCentered: true }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody {...{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 'var(--gap-sm)' }}>
          <Image {...{ src: image, alt: title }} />
          <Text>{`Adaugat ${memoizedCreatedAt}`}</Text>
        </ModalBody>
        <ModalFooter>
          <Button {...{ onClick: onClose, mr: 3, variant: 'outline' }}>Inchide</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default ImageModal;
