// src/components/ServiceModal.tsx

import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  Text,
  List,
  ListItem,
} from '@chakra-ui/react';

interface Service {
  title: string;
  imageFolder: string;
  service: string[];
}

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService: Service | null;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, selectedService }) => {
  if (!selectedService) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent m={3}>
        <ModalHeader>{selectedService.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image
            borderRadius="sm"
            src={require(`../media/serviceImages/${selectedService.imageFolder}/1.png`)}
            alt={`${selectedService.title} image`}
            objectFit="cover"
          />
          <Text fontWeight="bold" py={2}>Services:</Text>
          <List spacing={2} styleType="disc" paddingLeft={4}>
            {selectedService.service.map((item, index) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </List>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ServiceModal;
