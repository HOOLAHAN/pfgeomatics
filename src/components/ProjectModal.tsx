// src/components/ProjectModal.tsx

import React, { useState, useEffect } from 'react';
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
  Link,
  useColorModeValue,
  Spinner,
  Center
} from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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

  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const imageUrls = checkImageExists('projectImages', project.imageFolder);
    setImages(imageUrls);
    setLoading(false);
  }, [project.imageFolder]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent m={3}>
        <ModalHeader>{project.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="stretch" spacing={3}>
            {loading && <Center><Spinner size="md" /></Center>}
            {!loading && images.length > 0 && (
              <Carousel
                showThumbs={true}
                infiniteLoop={true}
                autoPlay={true}
                dynamicHeight={true}
                thumbWidth={100}
              >
                {images.map((src, index) => (
                  <div key={index} style={{ height: '100%' }}>
                    <img
                      src={src}
                      alt={`Slide ${index + 1} of ${project.name}`}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                        maxHeight: '500px'
                      }}
                    />
                  </div>
                ))}
              </Carousel>
            )}
            <Text><strong>Location:</strong> {project.location}</Text>
            <Text><strong>Client:</strong> {project.client}</Text>
            <Text><strong>From:</strong> {project.dateStarted} - {project.dateEnded}</Text>
            <Text>{project.description}</Text>
            {project.linkedIn && (
              <HStack spacing={1}>
                <Icon as={FaLinkedin} w={5} h={5} color="blue.500" />
                <Link href={project.linkedIn} isExternal color="blue.500">
                  View on LinkedIn
                </Link>
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
