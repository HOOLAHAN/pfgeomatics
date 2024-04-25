// src/components/Projects.tsx
import React, { useState } from 'react';
import { Box, Image, Text, Heading, HStack, useDisclosure } from '@chakra-ui/react';
import { projectsData } from '../data/projectsData';
import ProjectModal from './ProjectModal';

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
    <Box p={5} maxW="1200px" mx="auto">
      <Heading as="h2" size="xl" mb={6}>Projects</Heading>
      <HStack spacing={5} overflowX="scroll">
        {projectsData.map((project: Project) => (
          <Box key={project.name} onClick={() => handleProjectClick(project)} cursor="pointer">
            <Image src={require(`../data/projectImages/${project.image}`)} alt={project.name} boxSize="200px" objectFit="cover" />
            <Text textAlign="center">{project.name}</Text>
          </Box>
        ))}
      </HStack>
      {selectedProject && (
        <ProjectModal project={selectedProject} isOpen={isOpen} onClose={onClose} />
      )}
    </Box>
  );
};

export default Projects;
