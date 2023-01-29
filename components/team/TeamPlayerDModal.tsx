import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import { ITeamPlayerDModal } from './Interfaces';

const TeamPlayerDModal: React.FC<ITeamPlayerDModal> = ({ isOpen, onClose, title, description }) => {
  return (
    <Modal {...{ isOpen, onClose, blockScrollOnMount: true, isCentered: true, size: '2xl' }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <Text {...{ color: 'var(--grey-alpha-6)', fontSize: 'var(--text-md)' }}>{description}</Text>
        </ModalBody>
        <ModalFooter>
          <Button {...{ onClick: onClose, mr: 3, variant: 'outline' }}>Inchide</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default TeamPlayerDModal;
