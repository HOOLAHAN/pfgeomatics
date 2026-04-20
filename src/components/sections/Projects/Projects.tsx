// src/components/Projects.tsx

import React, { useCallback, useRef, useState } from 'react';
import {
  Box,
  useDisclosure,
  Center,
  useBreakpointValue,
  Text,
} from '@chakra-ui/react';
import { projectsData } from '../../../data/projectsData';
import ProjectModal from './ProjectModal';
import { Carousel, Direction } from '../../ChakraCarousel';
import ProjectCard from '../../ChakraCarousel/CarouselCard';
import { getMediaUrl } from '../../../utils/getMediaUrl';
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import SectionHeader from '../../shared/SectionHeader';

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
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? true;
  const carouselRef = useRef<ResponsiveCarousel>(null);

  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project);
    onOpen();
  }, [onOpen]);

  const carouselItems = projectsData.map((project) => ({
    title: project.name,
    description: project.description,
    image: {
      imageUrl: getMediaUrl('projectImages', `${project.imageFolder}/1.png`),
    },
    onClick: () => handleProjectClick(project),
  }));

  return (
    <Box py={{ base: 16, md: 24 }} px={{ base: 4, md: 8 }} bg="brand.900" position="relative" overflow="hidden">
      <Box
        position="absolute"
        inset={0}
        opacity={0.22}
        bgImage="linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)"
        bgSize="72px 72px"
      />
      <Box px={0} maxW="1335px" mx="auto" position="relative">
        <SectionHeader
          eyebrow="Project Experience"
          title="Proven on high-tolerance, high-pressure construction work."
          description="A selection of projects spanning transport infrastructure, steel frames, commercial refurbishment, residential towers, and landmark buildings."
          inverse
        />

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
              ref={carouselRef}
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

            <Box mt={4}>
              <Center>
                <Box display="flex" gap={12} px={4}>
                  <Box
                    as="button"
                    onClick={() => carouselRef.current?.moveTo(carouselRef.current.state.selectedItem - 1)}
                    p={2}
                    px={4}
                    fontSize="24px"
                    color="white"
                    bg="whiteAlpha.200"
                    border="1px solid"
                    borderColor="whiteAlpha.300"
                    borderRadius="full"
                    _hover={{ bg: 'accent.100', color: 'brand.900', borderColor: 'accent.100' }}
                    _active={{ transform: 'scale(0.95)' }}
                    aria-label="Previous slide"
                  >
                    &#10094;
                  </Box>
                  <Box
                    as="button"
                    onClick={() => carouselRef.current?.moveTo(carouselRef.current.state.selectedItem + 1)}
                    p={2}
                    px={4}
                    fontSize="24px"
                    color="white"
                    bg="whiteAlpha.200"
                    border="1px solid"
                    borderColor="whiteAlpha.300"
                    borderRadius="full"
                    _hover={{ bg: 'accent.100', color: 'brand.900', borderColor: 'accent.100' }}
                    _active={{ transform: 'scale(0.95)' }}
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
              slides={carouselItems.length}
            />
          </Carousel>
        )}
        <Text color="whiteAlpha.600" textAlign="center" mt={8} fontSize="sm">
          Select a project to review the client, scope, duration, and supporting media.
        </Text>
        {selectedProject && (
          <ProjectModal project={selectedProject} isOpen={isOpen} onClose={onClose} />
        )}
      </Box>
    </Box>
  );
};

export default Projects;
