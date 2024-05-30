import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  List,
  ListItem,
  VStack,
} from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import checkImageExists from '../utils/checkImageExists';

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

  useEffect(() => {
    if (selectedService) {
      const imageUrls = checkImageExists('serviceImages', selectedService.imageFolder);
      setImages(imageUrls);
    }
  }, [selectedService]);

  if (!selectedService) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent m={3}>
        <ModalHeader>{selectedService.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="stretch" spacing={3}>
            {images.length > 0 && (
              <Carousel
                showThumbs={true}
                infiniteLoop={true}
                autoPlay={true}
                dynamicHeight={true}
                thumbWidth={100}
              >
                {images.map((src, index) => (
                  <div key={index} style={{ height: '100%' }}>
                    <img
                      src={src}
                      alt={`Slide ${index + 1} of ${selectedService.title}`}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                        maxHeight: '500px'
                      }}
                    />
                  </div>
                ))}
              </Carousel>
            )}
            <Text fontWeight="bold" py={2}>Services:</Text>
            <List spacing={2} styleType="disc" paddingLeft={4}>
              {selectedService.service.map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
              ))}
            </List>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ServiceModal;
