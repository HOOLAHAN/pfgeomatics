// src/components/ServiceModal.tsx

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
  Box,
  Image,
  List,
  ListItem,
  useToken,
  Center,
} from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { fetchImageUrls } from '../../../utils/fetchImageUrls';

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
          {selectedService.title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody maxH={{ base: '90vh', md: 'auto' }}>
          <VStack align="stretch" spacing={4}>
            {!loading && images.length > 0 && (
              <>
                <Carousel
                  ref={carouselRef}
                  showThumbs={false}
                  infiniteLoop={true}
                  autoPlay={true}
                  interval={6000}
                  showStatus={false}
                  showIndicators={false}
                  emulateTouch
                  showArrows={images.length > 1}
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
                        alt={`Slide ${index + 1} of ${selectedService.title}`}
                        objectFit="cover"
                        w="100%"
                        h="100%"
                        borderRadius="md"
                      />
                    </Box>
                  ))}
                </Carousel>

                {images.length > 1 && (
                  <Box mt={3}>
                    <Center>
                      <Box display="flex" gap={12} px={4}>
                        <Box
                          as="button"
                          onClick={() =>
                            carouselRef.current?.moveTo(carouselRef.current.state.selectedItem - 1)
                          }
                          p={2}
                          px={4}
                          fontSize="24px"
                          color={buttonTextColor}
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
                          onClick={() =>
                            carouselRef.current?.moveTo(carouselRef.current.state.selectedItem + 1)
                          }
                          p={2}
                          px={4}
                          fontSize="24px"
                          color={buttonTextColor}
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
              <Text fontWeight="bold">Services:</Text>
              <List spacing={2} styleType="disc" pl={4}>
                {selectedService.service.map((item, index) => (
                  <ListItem key={index}>{item}</ListItem>
                ))}
              </List>
            </VStack>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            size="sm"
            variant="outline"
            borderColor={buttonBorderColor}
            color={buttonTextColor}
            _hover={{ bg: buttonHoverBg, color : buttonHoverTextColor }}
            _active={{ bg: buttonHoverBg,  transform: 'scale(0.95)' }}
            onClick={onClose}
            bg={buttonBg}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ServiceModal;
