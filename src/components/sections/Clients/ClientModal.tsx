// src/components/modals/ClientModal.tsx

import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Image,
  Text,
  Link,
  Center,
  useToken,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

interface ClientInfo {
  name: string;
  website?: string;
  about: string;
  pfgService: string;
}

interface ClientLogo {
  name: string;
  src: string;
}

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedClient: ClientInfo | null;
  clientLogos: ClientLogo[];
}

const ClientModal: React.FC<ClientModalProps> = ({ isOpen, onClose, selectedClient, clientLogos }) => {
  const brandBg = useToken("colors", "brand.50");

  if (!selectedClient) return null;

  const logoSrc = clientLogos.find(logo => logo.name === selectedClient.name)?.src;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered motionPreset="scale">
      <ModalOverlay />
      <ModalContent mx={4} my={6} bg={brandBg} borderRadius="xl" boxShadow="lg">
        <ModalCloseButton />
        <ModalBody py={6}>
          <Center>
            <Image
              src={logoSrc}
              alt={`${selectedClient.name} logo`}
              objectFit="contain"
              maxH="60px"
              mb={2}
            />
          </Center>
          {selectedClient.website && (
            <Text>
              <strong>Website:</strong>
              <Link
                href={selectedClient.website}
                isExternal
                color="blue.500"
                textDecoration="underline"
                ml={2}
              >
                {selectedClient.website} <ExternalLinkIcon mx="2px" />
              </Link>
            </Text>
          )}
          <Text mt={2}><strong>About:</strong> {selectedClient.about}</Text>
          <Text mt={2}><strong>Our Services:</strong> {selectedClient.pfgService}</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ClientModal;
