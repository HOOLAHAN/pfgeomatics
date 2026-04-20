// src/components/ServiceModal.tsx

import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  VStack,
  Box,
  Image,
  Center,
  SimpleGrid,
  Badge,
  Heading,
  Skeleton,
  HStack,
} from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { fetchImageUrls } from '../../../utils/fetchImageUrls';
import { getMediaUrl } from '../../../utils/getMediaUrl';

interface Service {
  title: string;
  imageFolder: string;
  service: string[];
}

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService: Service | null;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, selectedService }) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef<any>(null);

  useEffect(() => {
  if (!selectedService) return;

  const loadImages = async () => {
    setLoading(true);
    const urls = await fetchImageUrls('serviceImages', selectedService.imageFolder);
    setImages(urls);
    setLoading(false);
  };

  loadImages();
}, [selectedService]);

  if (!selectedService) return null;

  const fallbackImage = getMediaUrl('serviceImages', `${selectedService.imageFolder}/1.png`);
  const displayImages = images.length > 0 ? images : [fallbackImage];

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
        <ModalCloseButton top={5} right={5} bg="whiteAlpha.900" borderRadius="full" zIndex={2} _hover={{ bg: 'white' }} />
        <ModalBody p={{ base: 4, md: 6 }}>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 6, lg: 8 }}>
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
                  infiniteLoop={true}
                  autoPlay={true}
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
                        alt={`Slide ${index + 1} of ${selectedService.title}`}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        objectFit="cover"
                        w="100%"
                        h="100%"
                      />
                    </Box>
                  ))}
                </Carousel>
                <Box position="absolute" inset={0} bgGradient="linear(to-t, rgba(6,24,36,0.86), transparent 52%)" pointerEvents="none" />
                <VStack position="absolute" left={6} right={6} bottom={6} align="start" spacing={2}>
                  <Badge bg="accent.100" color="brand.900" borderRadius="full" px={3} py={1}>
                    Service Capability
                  </Badge>
                  <Heading color="white" fontSize={{ base: '2xl', md: '4xl' }} letterSpacing="-0.055em">
                    {selectedService.title}
                  </Heading>
                </VStack>
              </Box>

              {displayImages.length > 1 && (
                <Box mt={4}>
                  <Center>
                    <HStack spacing={4}>
                      {[
                        ['Previous slide', -1, '&#10094;'],
                        ['Next slide', 1, '&#10095;'],
                      ].map(([label, direction, glyph]) => (
                        <Box
                          key={label as string}
                          as="button"
                          onClick={() =>
                            carouselRef.current?.moveTo(carouselRef.current.state.selectedItem + (direction as number))
                          }
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
                          aria-label={label as string}
                          dangerouslySetInnerHTML={{ __html: glyph as string }}
                        />
                      ))}
                    </HStack>
                  </Center>
                </Box>
              )}
            </Box>

            <VStack align="stretch" spacing={6}>
              <Box>
                <Text color="accent.300" fontSize="xs" fontWeight="900" letterSpacing="0.2em" textTransform="uppercase" mb={3}>
                  Service Detail
                </Text>
                <Heading color="brand.900" fontSize={{ base: '3xl', md: '5xl' }} lineHeight="1" letterSpacing="-0.06em">
                  {selectedService.title}
                </Heading>
                <Text color="gray.600" mt={4} lineHeight="1.8">
                  A practical breakdown of the support available for this discipline.
                </Text>
              </Box>

              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={3}>
                {selectedService.service.map((item, index) => (
                  <HStack
                    key={item}
                    align="start"
                    spacing={3}
                    p={4}
                    bg="white"
                    borderRadius="2xl"
                    border="1px solid"
                    borderColor="blackAlpha.100"
                  >
                    <Center minW="28px" h="28px" borderRadius="full" bg="accent.100" color="brand.900" fontSize="sm" fontWeight="900">
                      {index + 1}
                    </Center>
                    <Text
                      color="brand.900"
                      fontWeight="750"
                      lineHeight="1.45"
                      minW={0}
                      overflowWrap="anywhere"
                      wordBreak="break-word"
                    >
                      {item}
                    </Text>
                  </HStack>
                ))}
              </SimpleGrid>
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

export default ServiceModal;
