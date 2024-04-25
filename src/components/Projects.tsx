// src/components/Projects.tsx

import React, { useState } from 'react';
import { Box, Image, Text, Heading, useDisclosure } from '@chakra-ui/react';
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

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    onOpen();
  };

  return (
    <Box bg="brand.700">
      <Box p={5} maxW="1200px" mx="auto">
        <Heading as="h2" size="xl" mb={6}>Projects</Heading>
        <ChakraCarousel gap={5}>
          {projectsData.map((project: Project) => (
            <Box key={project.name} onClick={() => handleProjectClick(project)} cursor="pointer">
              <Box width="400px" height="200px" overflow="hidden">
                <Image 
                  src={require(`../media/projectImages/${project.image}`)}
                  alt={project.name}
                  width="100%"
                  height="100%"
                  objectFit="cover" 
                  px={2}
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
