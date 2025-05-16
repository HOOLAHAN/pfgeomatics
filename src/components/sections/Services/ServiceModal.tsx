// src/components/ServiceModal.tsx

import React, { useState, useEffect } from 'react';
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
  useColorModeValue,
  List,
  ListItem,
} from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import checkImageExists from '../../../utils/checkImageExists';

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
  const buttonBorderColor = useColorModeValue('black', 'white');
  const buttonTextColor = useColorModeValue('black', 'white');
  const buttonHoverBg = useColorModeValue('gray.200', 'whiteAlpha.300');

  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedService) {
      const imageUrls = checkImageExists('serviceImages', selectedService.imageFolder);
      setImages(imageUrls);
      setLoading(false);
    }
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
      >
        <ModalHeader fontSize="2xl" fontWeight="semibold" textAlign="center">
          {selectedService.title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody maxH={{ base: '90vh', md: 'auto' }}>
          <VStack align="stretch" spacing={4}>
            {!loading && images.length > 0 && (
              <Carousel
                showThumbs={true}
                infiniteLoop={true}
                autoPlay={true}
                interval={6000}
                showStatus={false}
                dynamicHeight={false}
                thumbWidth={100}
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
            _hover={{ bg: buttonHoverBg }}
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

export default ServiceModal;
