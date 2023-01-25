import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { IDeleteModal } from './Interfaces';

const DeleteModal: React.FC<IDeleteModal> = ({ isOpen, onClose, title, description }) => {
  return (
    <Modal {...{ isOpen, onClose, blockScrollOnMount: true, isCentered: true }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{description}</ModalBody>
        <ModalFooter>
          <Button {...{ onClick: onClose, mr: 3, variant: 'outline' }}>Inchide</Button>
          <Button {...{ variant: 'solid', background: 'var(--red-color)', color: 'var(--white-color)', colorScheme: 'red' }}>Sterge</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default DeleteModal;
