// src/components/ProjectModal.tsx

import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  VStack,
  HStack,
  Icon,
  Link,
  Box,
  Image,
  Center,
  SimpleGrid,
  Badge,
  Heading,
  Skeleton,
} from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {
  FaLinkedin,
  FaMapMarkerAlt,
  FaBuilding,
  FaCalendarAlt,
  FaInfoCircle,
} from 'react-icons/fa';
import { fetchImageUrls } from '../../../utils/fetchImageUrls';
import { getMediaUrl } from '../../../utils/getMediaUrl';

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

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef<any>(null);
  const fallbackImage = getMediaUrl('projectImages', `${project.imageFolder}/1.png`);
  const displayImages = images.length > 0 ? images : [fallbackImage];

  useEffect(() => {
  if (!project) return;

  const loadImages = async () => {
    setLoading(true);
    const urls = await fetchImageUrls('projectImages', project.imageFolder);
    setImages(urls);
    setLoading(false);
  };

  loadImages();
}, [project]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl" isCentered motionPreset="scale">
      <ModalOverlay bg="rgba(6, 24, 36, 0.76)" backdropFilter="blur(8px)" />
      <ModalContent
        mx={4}
        my={6}
        borderRadius="32px"
        boxShadow="0 30px 100px rgba(6, 24, 36, 0.35)"
        maxH="92vh"
        overflowY="auto"
        bg="brand.50"
        border="1px solid"
        borderColor="blackAlpha.100"
      >
        <ModalCloseButton
          top={5}
          right={5}
          bg="whiteAlpha.900"
          borderRadius="full"
          zIndex={2}
          _hover={{ bg: 'white' }}
        />
        <ModalBody p={{ base: 4, md: 6 }}>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 6, lg: 8 }} alignItems="stretch">
            <Box>
              <Box
                position="relative"
                overflow="hidden"
                borderRadius="28px"
                bg="brand.900"
                minH={{ base: '260px', md: '420px' }}
                boxShadow="0 24px 70px rgba(6, 24, 36, 0.20)"
              >
                {loading && <Skeleton position="absolute" inset={0} startColor="brand.800" endColor="brand.600" />}
                <Carousel
                  ref={carouselRef}
                  showThumbs={false}
                  infiniteLoop
                  autoPlay
                  interval={6000}
                  showStatus={false}
                  showIndicators={displayImages.length > 1}
                  emulateTouch
                  showArrows={false}
                  renderArrowPrev={() => null}
                  renderArrowNext={() => null}
                >
                  {displayImages.map((src, index) => (
                    <Box
                      key={index}
                      w="100%"
                      h={{ base: '260px', md: '420px' }}
                      position="relative"
                      overflow="hidden"
                    >
                      <Image
                        src={src}
                        alt={`Slide ${index + 1} of ${project.name}`}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        objectFit="cover"
                        w="100%"
                        h="100%"
                      />
                    </Box>
                  ))}
                </Carousel>
                <Box
                  position="absolute"
                  inset={0}
                  bgGradient="linear(to-t, rgba(6,24,36,0.85), transparent 52%)"
                  pointerEvents="none"
                />
                <VStack position="absolute" left={6} right={6} bottom={6} align="start" spacing={2}>
                  <Badge bg="accent.100" color="brand.900" borderRadius="full" px={3} py={1}>
                    Project
                  </Badge>
                  <Heading color="white" fontSize={{ base: '2xl', md: '4xl' }} letterSpacing="-0.055em">
                    {project.name}
                  </Heading>
                </VStack>
              </Box>

              {displayImages.length > 1 && (
                <Box mt={4}>
                    <Center>
                    <Box display="flex" gap={4} px={4}>
                        <Box
                          as="button"
                          onClick={() => carouselRef.current?.moveTo(carouselRef.current.state.selectedItem - 1)}
                        px={5}
                        py={2}
                          fontSize="24px"
                          color="white"
                        bg="brand.900"
                          border="1px solid"
                        borderColor="brand.900"
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
                        px={5}
                        py={2}
                          fontSize="24px"
                          color="white"
                        bg="brand.900"
                          border="1px solid"
                        borderColor="brand.900"
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
                )}
            </Box>

            <VStack align="stretch" spacing={6} justify="space-between">
              <Box>
                <Text color="accent.300" fontSize="xs" fontWeight="900" letterSpacing="0.2em" textTransform="uppercase" mb={3}>
                  Case Study
                </Text>
                <Heading color="brand.900" fontSize={{ base: '3xl', md: '5xl' }} lineHeight="1" letterSpacing="-0.06em">
                  {project.name}
                </Heading>
              </Box>

              <SimpleGrid columns={{ base: 1, sm: 3, lg: 1, xl: 3 }} spacing={3}>
                {[
                  [FaMapMarkerAlt, 'Location', project.location],
                  [FaBuilding, 'Client', project.client],
                  [FaCalendarAlt, 'Duration', `${project.dateStarted} - ${project.dateEnded}`],
                ].map(([icon, label, value]) => (
                  <Box key={label as string} p={4} bg="white" borderRadius="2xl" border="1px solid" borderColor="blackAlpha.100">
                    <Icon as={icon as any} color="accent.300" mb={3} />
                    <Text color="gray.500" fontSize="xs" fontWeight="900" letterSpacing="0.12em" textTransform="uppercase">
                      {label as string}
                    </Text>
                    <Text color="brand.900" fontWeight="800" lineHeight="1.3">
                      {value as string}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>

              <Box p={{ base: 5, md: 6 }} bg="white" borderRadius="2xl" border="1px solid" borderColor="blackAlpha.100">
                <HStack mb={3}>
                  <Icon as={FaInfoCircle} color="accent.300" />
                  <Text color="brand.900" fontWeight="900">Project Scope</Text>
                </HStack>
                <Text color="gray.700" lineHeight="1.85">
                  {project.description || 'Further project information will be added shortly.'}
                </Text>
              </Box>

              {project.linkedIn && (
                <Link href={project.linkedIn} isExternal alignSelf="flex-start">
                  <Button leftIcon={<Icon as={FaLinkedin} />} bg="brand.900" color="white" _hover={{ bg: 'brand.700' }}>
                    View on LinkedIn
                  </Button>
                </Link>
              )}
            </VStack>
          </SimpleGrid>
        </ModalBody>
        <ModalFooter px={6} pb={6} pt={0}>
          <Button
            bg="brand.900"
            color="white"
            _hover={{ bg: 'brand.700' }}
            _active={{ transform: 'scale(0.95)' }}
            onClick={onClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProjectModal;
