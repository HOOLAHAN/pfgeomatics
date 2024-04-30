// src/components/Projects.tsx

import React, { useState } from 'react';
import { Box, Image, Text, Heading, useDisclosure, useColorModeValue, Icon } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import { projectsData } from '../data/projectsData';
import ProjectModal from './ProjectModal';
import ChakraCarousel from './ChakraCarousel';

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
        <ChakraCarousel gap={5}>
          {projectsData.map((project: Project) => (
            <Box key={project.name} onClick={() => handleProjectClick(project)} cursor="pointer"
              position="relative" overflow="hidden"
              _hover={{
                transform: 'scale(1.05)',
                zIndex: '10',
                boxShadow: '0 0 8px rgba(0,0,0,0.6)'
              }}
            >
              <Box width="400px" height="200px" position="relative">
                <Image 
                  src={require(`../media/projectImages/${project.image}`)}
                  alt={project.name}
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  transition="all 0.3s ease-in-out"
                  _hover={{
                    filter: 'brightness(0.8)'
                  }}
                />
                <Icon as={ViewIcon} color="white" boxSize="4" position="absolute" top="1" right="8"
                  transition="opacity 0.3s ease"
                  _groupHover={{ opacity: '1' }}
                />
              </Box>
              <Text textAlign="center">{project.name}</Text>
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

export default Projects;
