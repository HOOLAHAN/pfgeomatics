// src/components/Projects.tsx

import React, { useState, useEffect } from 'react';
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
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
        const checkScreenSize = () => {
          setIsMobile(window.innerWidth < 720);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
      }, []);

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
    py={5}
    >
      <Box px={0} maxW="1335px" mx="auto">
        <Heading as="h2" size="xl" mb={6} textAlign="center" color="brand.800">
          Featured Projects
        </Heading>

        {isMobile ? (
          <ResponsiveCarousel
            showThumbs={false}
            infiniteLoop
            autoPlay
            interval={6000}
            showStatus={false}
            showIndicators={false}
            emulateTouch
          >
            {carouselItems.map((item, index) => (
              <Box
                key={index}
                cursor="pointer"
                onClick={item.onClick}
                borderRadius="md"
                overflow="hidden"
                px={4} py={2}
              >
                <img
                  src={item.image?.imageUrl}
                  alt={item.title}
                  style={{
                    width: '100%',
                    maxWidth: '360px',
                    margin: '0 auto',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
                <Heading size="md" mt={2} textAlign="center" color="brand.800">
                  {item.title}
                </Heading>
              </Box>
            ))}
          </ResponsiveCarousel>
        ) : (
          <Carousel
            id="project-carousel"
            interval={6000}
            direction={Direction.RIGHT}
            repetitions={1}
            items={carouselItems}
          >
            <ProjectCard
              key="carousel-item"
              title=""
              description=""
              image={{ imageUrl: '' }}
              onClick={() => {}}
              id=""
              index={0}
              slides={projectsData.length}
            />
          </Carousel>
        )}
        {selectedProject && (
          <ProjectModal project={selectedProject} isOpen={isOpen} onClose={onClose} />
        )}
      </Box>
    </Box>
  );
};

export default Projects;
