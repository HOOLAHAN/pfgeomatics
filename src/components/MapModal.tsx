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
  useColorModeValue,
} from '@chakra-ui/react';
import { ProjectWithCoordinates } from './MapComponent';

interface MapModalProps {
  project: ProjectWithCoordinates | null;
  isOpen: boolean;
  onClose: () => void;
  onMoreInfoClick: () => void;
}

const MapModal: React.FC<MapModalProps> = ({ project, isOpen, onClose, onMoreInfoClick }) => {
  const buttonBorderColor = useColorModeValue('black', 'white');
  const buttonTextColor = useColorModeValue('black', 'white');
  const buttonHoverBg = useColorModeValue('gray.200', 'whiteAlpha.300');

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
      <ModalOverlay />
      <ModalContent m={3}>
        <ModalHeader>{project?.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack align="start" spacing={4}>
            <VStack align="start" spacing={2}>
              <p><strong>Client:</strong> {project?.client}</p>
              <p><strong>Duration:</strong> {project?.dateStarted} - {project?.dateEnded}</p>
            </VStack>
            {project?.thumbnail && (
              <Image
                src={project.thumbnail}
                alt={`${project.name} thumbnail`}
                boxSize="150px"
                objectFit="cover"
                mb={4}
                htmlWidth="150px"
                htmlHeight="150px"
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
