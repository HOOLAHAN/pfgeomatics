// src/components/Projects.tsx

import React, { useState } from 'react';
import {
  Box,
  Image,
  Heading,
  useDisclosure,
  Icon,
  Spinner,
  Center,
  useToken,
} from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import { projectsData } from '../data/projectsData';
import ProjectModal from './ProjectModal';
import ChakraCarousel from './ChakraCarousel';
import { getFirstImage } from '../utils/checkImageExists';

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
  const [imageLoadingMap, setImageLoadingMap] = useState<Record<string, boolean>>(
    Object.fromEntries(projectsData.map(p => [p.name, true]))
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const brandBg = useToken("colors", "brand.100");

  const handleImageLoad = (projectName: string) => {
    setImageLoadingMap(prev => ({ ...prev, [projectName]: false }));
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    onOpen();
  };

  return (
    <Box bg={brandBg} py={10}>
      <Box px={5} maxW="1200px" mx="auto">
        <Heading as="h2" size="xl" mb={6} textAlign="center" color="brand.700">
          Featured Projects
        </Heading>

        <ChakraCarousel gap={30}>
          {projectsData.map((project) => {
            const firstImage = getFirstImage('projectImages', project.imageFolder);
            const isImageLoading = imageLoadingMap[project.name];

            return (
              <Box
                key={project.name}
                onClick={() => handleProjectClick(project)}
                cursor="pointer"
                position="relative"
                borderRadius="lg"
                boxShadow="md"
                overflow="hidden"
                transition="all 0.3s ease"
                _hover={{ transform: 'scale(1.03)', boxShadow: 'lg' }}
              >
                <Box width="100%" height="250px" position="relative">
                  {isImageLoading && (
                    <Center height="100%">
                      <Spinner size="lg" />
                    </Center>
                  )}
                  <Image
                    src={firstImage}
                    alt={project.name}
                    objectFit="cover"
                    width="100%"
                    height="100%"
                    onLoad={() => handleImageLoad(project.name)}
                    display={isImageLoading ? 'none' : 'block'}
                    transition="filter 0.3s ease"
                    _hover={{ filter: 'brightness(0.85)' }}
                  />
                  <Icon
                    as={ViewIcon}
                    color="white"
                    boxSize="6"
                    position="absolute"
                    top={3}
                    right={3}
                    opacity={0.7}
                  />
                  <Box
                    position="absolute"
                    bottom={0}
                    width="100%"
                    bg="rgba(0,0,0,0.5)"
                    px={4}
                    py={2}
                    textAlign="center"
                  >
                    <Heading
                      size="md"
                      color="white"
                      fontWeight="semibold"
                      textShadow="1px 1px 3px rgba(0,0,0,0.5)"
                      whiteSpace="normal"
                      overflowWrap="break-word"
                    >
                      {project.name}
                    </Heading>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </ChakraCarousel>

        {selectedProject && (
          <ProjectModal project={selectedProject} isOpen={isOpen} onClose={onClose} />
        )}
      </Box>
    </Box>
  );
};

export default Projects;
