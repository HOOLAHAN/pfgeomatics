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
  useToken,
  Box,
  Image,
  Center
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
  const brandBg = useToken("colors", "brand.50");
  const buttonBg = useToken("colors", "brand.600");
  const buttonBorderColor = useToken("colors", "brand.600");
  const buttonTextColor = useToken("colors", "white");
  const buttonHoverTextColor = useToken("colors", "brand.600");
  const buttonHoverBg = useToken("colors", "brand.50");

  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef<any>(null);

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
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered motionPreset="scale">
      <ModalOverlay />
      <ModalContent
        mx={4}
        my={6}
        borderRadius="xl"
        boxShadow="lg"
        maxH="100vh"
        overflowY="auto"
        bg={brandBg}
      >
        <ModalHeader fontSize="2xl" fontWeight="semibold" textAlign="center">
          {project.name}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="stretch" spacing={4}>
            {!loading && images.length > 0 && (
              <>
                <Carousel
                  ref={carouselRef}
                  showThumbs={false}
                  infiniteLoop
                  autoPlay
                  interval={6000}
                  showStatus={false}
                  showIndicators={false}
                  emulateTouch
                  showArrows
                  renderArrowPrev={() => null}
                  renderArrowNext={() => null}
                >
                  {images.map((src, index) => (
                    <Box
                      key={index}
                      w="100%"
                      h={{ base: '200px', md: '300px' }}
                      position="relative"
                      overflow="hidden"
                      borderRadius="md"
                      bg="gray.100"
                    >
                      <Image
                        src={src}
                        alt={`Slide ${index + 1} of ${project.name}`}
                        objectFit="cover"
                        w="100%"
                        h="100%"
                        borderRadius="md"
                      />
                    </Box>
                  ))}
                </Carousel>

                {/* Custom Arrow Controls Below */}
                {images.length > 1 && (
                  <Box mt={3}>
                    <Center>
                      <Box display="flex" gap={12} px={4}>
                        <Box
                          as="button"
                          onClick={() => carouselRef.current?.moveTo(carouselRef.current.state.selectedItem - 1)}
                          p={2}
                          px={4}
                          fontSize="24px"
                          color="white"
                          bg={buttonBg}
                          border="1px solid"
                          borderColor={buttonBorderColor}
                          borderRadius="full"
                          _hover={{ bg: buttonHoverBg, color: buttonHoverTextColor }}
                          _active={{ bg: buttonHoverBg, transform: 'scale(0.95)' }}
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
                          bg={buttonBg}
                          border="1px solid"
                          borderColor={buttonBorderColor}
                          borderRadius="full"
                          _hover={{ bg: buttonHoverBg, color: buttonHoverTextColor }}
                          _active={{ bg: buttonHoverBg, transform: 'scale(0.95)' }}
                          aria-label="Next slide"
                        >
                          &#10095;
                        </Box>
                      </Box>
                    </Center>
                  </Box>
                )}
              </>
            )}

            <VStack align="start" spacing={2}>
              <HStack>
                <Icon as={FaMapMarkerAlt} color="gray.600" />
                <Text><strong>Location:</strong> {project.location}</Text>
              </HStack>
              <HStack>
                <Icon as={FaBuilding} color="gray.600" />
                <Text><strong>Client:</strong> {project.client}</Text>
              </HStack>
              <HStack>
                <Icon as={FaCalendarAlt} color="gray.600" />
                <Text><strong>Duration:</strong> {project.dateStarted} – {project.dateEnded}</Text>
              </HStack>
              <HStack align="start">
                <Icon as={FaInfoCircle} mt={1} color="gray.600" />
                <Text><strong>Description:</strong> {project.description}</Text>
              </HStack>
              {project.linkedIn && (
                <HStack spacing={2}>
                  <Icon as={FaLinkedin} w={5} h={5} color="blue.500" />
                  <Link href={project.linkedIn} isExternal color="blue.500" fontWeight="medium">
                    View on LinkedIn
                  </Link>
                </HStack>
              )}
            </VStack>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            size="sm"
            variant="outline"
            borderColor={buttonBorderColor}
            color={buttonTextColor}
            bg={buttonBg}
            _hover={{ bg: buttonHoverBg, color: buttonHoverTextColor }}
            _active={{ bg: buttonHoverBg, transform: 'scale(0.95)' }}
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
