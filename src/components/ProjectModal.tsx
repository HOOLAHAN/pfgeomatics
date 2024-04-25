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
  Image,
  Link
} from '@chakra-ui/react';

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
            <Image src={require(`../data/projectImages/${project.image}`)} alt={project.name} boxSize="full" objectFit="cover" />
            <Text><strong>Location:</strong> {project.location}</Text>
            <Text><strong>Client:</strong> {project.client}</Text>
            <Text><strong>Started:</strong> {project.dateStarted}</Text>
            <Text><strong>Ended:</strong> {project.dateEnded}</Text>
            <Text>{project.description}</Text>
            {project.linkedIn && (
              <Link href={project.linkedIn} isExternal color="blue.500">
                View on LinkedIn
              </Link>
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
