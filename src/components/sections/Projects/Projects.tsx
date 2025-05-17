// src/components/Projects.tsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  useDisclosure,
  Center
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
          <>
            <ResponsiveCarousel
              showThumbs={false}
              infiniteLoop
              autoPlay
              interval={4000}
              showStatus={false}
              showIndicators={false}
              emulateTouch
              showArrows={true}
              renderArrowPrev={() => null}
              renderArrowNext={() => null}
              ref={(ref) => {
                // Store ref so buttons can use it
                (window as any).__projectCarouselRef__ = ref;
              }}
            >
              {carouselItems.map((item, index) => (
                <Center key={index} py={2}>
                  <ProjectCard
                    {...item}
                    id={`mobile-${index}`}
                    index={index}
                    slides={carouselItems.length}
                    isMobile
                  />
                </Center>
              ))}
            </ResponsiveCarousel>

            {/* Custom Arrow Controls Below */}
            <Box mt={4}>
              <Center>
                <Box display="flex" gap={4}>
                  <Box
                    as="button"
                    onClick={() =>
                      (window as any).__projectCarouselRef__?.moveTo(
                        (window as any).__projectCarouselRef__.state.selectedItem - 1
                      )
                    }
                    p={2}
                    px={4}
                    fontSize="24px"
                    color="white"
                    bg="brand.300"
                    borderRadius="full"
                    _hover={{ bg: 'brand.200' }}
                    _active={{ bg: 'brand.100', transform: 'scale(0.95)' }}
                    aria-label="Previous slide"
                  >
                    &#10094;
                  </Box>
                  <Box
                    as="button"
                    onClick={() =>
                      (window as any).__projectCarouselRef__?.moveTo(
                        (window as any).__projectCarouselRef__.state.selectedItem + 1
                      )
                    }
                    p={2}
                    px={4}
                    fontSize="24px"
                    color="white"
                    bg="brand.300"
                    borderRadius="full"
                    _hover={{ bg: 'brand.200' }}
                    _active={{ bg: 'brand.100', transform: 'scale(0.95)' }}
                    aria-label="Next slide"
                  >
                    &#10095;
                  </Box>
                </Box>
              </Center>
            </Box>
          </>
        ) : (
          <Carousel
            id="project-carousel"
            interval={4000}
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
