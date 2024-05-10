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
  Link
} from '@chakra-ui/react';

import { FaLinkedin } from 'react-icons/fa';

interface Project {
  name: string;
  location: string;
  client: string;
  dateStarted: string;
  dateEnded: string;
  image: string;
  description: string;
  linkedIn: string;
}

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{project.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="stretch" spacing={3}>
          {project.image && (
            <Image src={require(`../media/projectImages/${project.image}`)} alt={project.name} boxSize="full" objectFit="cover" />
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
          <Button colorScheme="blue" mr={3} onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProjectModal;
