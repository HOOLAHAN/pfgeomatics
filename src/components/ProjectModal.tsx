// src/components/ProjectModal.tsx
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
  Text,
  VStack,
  HStack,
  Icon,
  Image,
  Link, useColorModeValue
} from '@chakra-ui/react';

import { FaLinkedin } from 'react-icons/fa';
import checkImageExists from '../utils/checkImageExists';

interface Project {
  name: string;
  location: string;
  client: string;
  dateStarted: string;
  dateEnded: string;
  imageFolder: string;
  description: string;
  linkedIn: string;
}

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const buttonBorderColor = useColorModeValue('black', 'white');
  const buttonTextColor = useColorModeValue('black', 'white');
  const buttonHoverBg = useColorModeValue('gray.200', 'whiteAlpha.300');
  const imageUrl = checkImageExists(project.imageFolder);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent m={3}>
        <ModalHeader>{project.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="stretch" spacing={3}>
            {imageUrl && (
              <Image src={imageUrl} alt={project.name} boxSize="full" objectFit="cover" />
            )}
            <Text><strong>Location:</strong> {project.location}</Text>
            <Text><strong>Client:</strong> {project.client}</Text>
            <Text><strong>From:</strong> {project.dateStarted} - {project.dateEnded}</Text>
            <Text>{project.description}</Text>
            {project.linkedIn && (
              <HStack spacing={1}>
                <Icon as={FaLinkedin} w={5} h={5} color="blue.500" />
                {project.linkedIn && (
                  <Link href={project.linkedIn} isExternal color="blue.500">
                    View on LinkedIn
                  </Link>
                )}
              </HStack>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter>
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

export default ProjectModal;
