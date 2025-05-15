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
  Spinner,
  Center,
  Box,
  useToken,
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
  const [loading, setLoading] = useState(true);

  const modalBg = useToken("colors", "white");
  const borderRadius = useToken("radii", "md");

  useEffect(() => {
    if (selectedService) {
      const imageUrls = checkImageExists('serviceImages', selectedService.imageFolder);
      setImages(imageUrls);
      setLoading(false);
    }
  }, [selectedService]);

  if (!selectedService) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent m={3} bg={modalBg} borderRadius={borderRadius}>
        <ModalHeader>{selectedService.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="stretch" spacing={4}>
            {loading && (
              <Center minH="300px">
                <Spinner size="lg" />
              </Center>
            )}

            {!loading && images.length > 0 && (
              <Box
                overflow="hidden"
                borderRadius="md"
                position="relative"
                minH="300px"
                maxH="500px"
              >
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
                      as="div"
                      key={index}
                      height="100%"
                      overflow="hidden"
                      borderRadius="md"
                    >
                      <img
                        src={src}
                        alt={`Slide ${index + 1} of ${selectedService.title}`}
                        style={{
                          width: '100%',
                          height: '500px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                        }}
                        onLoad={() => setLoading(false)}
                      />
                    </Box>
                  ))}
                </Carousel>
              </Box>
            )}

            <Box>
              <Text fontWeight="bold" pt={2}>Services:</Text>
              <List spacing={2} styleType="disc" pl={4}>
                {selectedService.service.map((item, index) => (
                  <ListItem key={index}>{item}</ListItem>
                ))}
              </List>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ServiceModal;
