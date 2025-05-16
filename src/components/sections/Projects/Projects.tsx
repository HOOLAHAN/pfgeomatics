// src/components/Projects.tsx

import React, { useState } from 'react';
import {
  Box,
  Heading,
  useDisclosure,
} from '@chakra-ui/react';
import { projectsData } from '../../../data/projectsData';
import ProjectModal from './ProjectModal';
import { Carousel, Direction } from '../../ChakraCarousel';
import ProjectCard from '../../ChakraCarousel/CarouselCard';
import { getFirstImage } from '../../../utils/checkImageExists';

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

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    onOpen();
  };

  const carouselItems = projectsData.map((project) => ({
    title: project.name,
    description: project.description,
    image: { imageUrl: getFirstImage('projectImages', project.imageFolder) },
    onClick: () => handleProjectClick(project),
  }));

  return (
    <Box 
    // bg={brandBg} 
    py={5}
    >
      <Box px={0} maxW="1200px" mx="auto">
        <Heading as="h2" size="xl" mb={6} textAlign="center" color="brand.800">
          Featured Projects
        </Heading>

        <Carousel
          id="project-carousel"
          interval={6000}
          direction={Direction.RIGHT}
          repetitions={1}
          items={carouselItems}
        >
          <ProjectCard
            key="carousel-item"
            title="" // these are overridden via cloneElement
            description=""
            image={{ imageUrl: '' }}
            onClick={() => {}}
            id=""
            index={0}
            slides={projectsData.length}
          />
        </Carousel>

        {selectedProject && (
          <ProjectModal project={selectedProject} isOpen={isOpen} onClose={onClose} />
        )}
      </Box>
    </Box>
  );
};

export default Projects;
