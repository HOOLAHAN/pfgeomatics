// src/components/Projects.tsx

import React, { useState } from 'react';
import { Box, Image, Heading, useDisclosure, useColorModeValue, Icon } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import { projectsData } from '../data/projectsData';
import ProjectModal from './ProjectModal';
import ChakraCarousel from './ChakraCarousel';
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

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const brandColour = useColorModeValue('lightBrand.700', 'darkBrand.700');

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    onOpen();
  };

  return (
    <Box bg={brandColour}>
      <Box p={5} maxW="1200px" mx="auto">
        <Heading as="h2" size="xl" mb={6} textAlign="center">Projects</Heading>
        <ChakraCarousel gap={40}>
          {projectsData.map((project: Project) => (
            <Box
              key={project.name}
              onClick={() => handleProjectClick(project)}
              cursor="pointer"
              position="relative"
              overflow="hidden"
              _hover={{
                transform: 'scale(1.05)',
                zIndex: '10',
              }}
            >
              {project.imageFolder && (
                <ImageContainer>
                  <Image 
                    src={checkImageExists(project.imageFolder)}
                    alt={project.name}
                    objectFit="cover"
                    objectPosition="center"
                    w="100%"
                    transition="all 0.3s ease-in-out"
                    _hover={{
                      filter: 'brightness(0.8)'
                    }}
                  />
                  <Icon as={ViewIcon} color="white" boxSize="4" position="absolute" top="1" right="3"
                    transition="opacity 0.3s ease"
                    _groupHover={{ opacity: '1' }}
                  />
                </ImageContainer>
              )}
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                textAlign="center"
                px={2}
                backgroundColor="rgba(0, 0, 0, 0.2)"
                padding="5px"
                borderRadius="md"
              >
                <Heading
                  color="white"
                  fontSize="2xl"
                  fontWeight="bold"
                  textShadow="1px 1px 3px rgba(0,0,0,0.7)"
                  whiteSpace="normal"
                  overflowWrap="break-word"
                >
                  {project.name}
                </Heading>
              </Box>
            </Box>
          ))}
        </ChakraCarousel>
        {selectedProject && (
          <ProjectModal project={selectedProject} isOpen={isOpen} onClose={onClose} />
        )}
      </Box>
    </Box>
  );
};

const ImageContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box width="100%" height="200px" position="relative" overflow="hidden" borderRadius="sm">
    {children}
  </Box>
);

export default Projects;
