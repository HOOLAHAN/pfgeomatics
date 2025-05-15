// src/components/MapModal.tsx

import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Image,
  HStack,
  VStack,
  Text,
  useColorModeValue,
  useToken,
} from '@chakra-ui/react';
import { ProjectWithCoordinates } from './MapComponent';

interface MapModalProps {
  project: ProjectWithCoordinates | null;
  isOpen: boolean;
  onClose: () => void;
  onMoreInfoClick: () => void;
}

const MapModal: React.FC<MapModalProps> = ({ project, isOpen, onClose, onMoreInfoClick }) => {
  const [brand600, brand50] = useToken("colors", ["brand.600", "brand.50"]);

  const buttonBorderColor = brand600;
  const buttonTextColor = brand600;
  const buttonHoverBg = useColorModeValue(brand50, "whiteAlpha.300");

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
      <ModalOverlay />
      <ModalContent m={3} borderRadius="lg" boxShadow="xl">
        <ModalHeader>{project?.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack align="flex-start" spacing={4}>
            <VStack align="flex-start" spacing={1}>
              <Text><strong>Client:</strong> {project?.client}</Text>
              <Text>
                <strong>Duration:</strong> {project?.dateStarted} – {project?.dateEnded}
              </Text>
            </VStack>
            {project?.thumbnail && (
              <Image
                src={project.thumbnail}
                alt={`${project.name} thumbnail`}
                boxSize="120px"
                objectFit="cover"
                borderRadius="md"
                shadow="md"
              />
            )}
          </HStack>
        </ModalBody>
        <ModalFooter display="flex" justifyContent="space-between">
          <Button
            size="sm"
            variant="outline"
            borderColor={buttonBorderColor}
            color={buttonTextColor}
            _hover={{ bg: buttonHoverBg }}
            _active={{ bg: buttonHoverBg, transform: 'scale(0.95)' }}
            transition="all 0.2s ease-in-out"
            onClick={onMoreInfoClick}
          >
            More Info
          </Button>
          <Button
            size="sm"
            variant="outline"
            borderColor={buttonBorderColor}
            color={buttonTextColor}
            _hover={{ bg: buttonHoverBg }}
            _active={{ bg: buttonHoverBg, transform: 'scale(0.95)' }}
            transition="all 0.2s ease-in-out"
            onClick={onClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MapModal;
