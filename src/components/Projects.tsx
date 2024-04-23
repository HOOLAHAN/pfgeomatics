// src/components/Projects.tsx
import React from 'react';
import { Box, Image, Text, Heading, VStack, HStack, Link } from '@chakra-ui/react';
import { projectsData } from '../data/projectsData';

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
  return (
    <Box p={5} maxW="1200px" mx="auto">
      <Heading as="h2" size="xl" mb={6}>Projects</Heading>
      {projectsData.map((project: Project) => (
        <Box key={project.name} mb={10} boxShadow="lg" borderRadius="lg" overflow="hidden">
          <HStack spacing={3} align="top">
            <Box flexShrink={0}>
              {/* Dynamically import images based on the filename */}
              <Image src={require(`../data/projectImages/${project.image}`)} alt={project.name} boxSize="200px" objectFit="cover" />
            </Box>
            <VStack align="stretch" p={5} spacing={3}>
              <Heading size="lg">{project.name}</Heading>
              <Text fontSize="md"><strong>Location:</strong> {project.location}</Text>
              <Text fontSize="md"><strong>Client:</strong> {project.client}</Text>
              <Text fontSize="md"><strong>Started:</strong> {project.dateStarted}</Text>
              <Text fontSize="md"><strong>Ended:</strong> {project.dateEnded}</Text>
              <Text fontSize="md">{project.description}</Text>
              {project.linkedIn && (
                <Link href={project.linkedIn} isExternal color="blue.500">
                  View on LinkedIn
                </Link>
              )}
            </VStack>
          </HStack>
        </Box>
      ))}
    </Box>
  );
};

export default Projects;
