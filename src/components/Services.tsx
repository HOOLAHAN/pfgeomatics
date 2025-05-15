// src/components/Services.tsx

import React, { useState } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Image,
  useDisclosure,
  Icon,
  Spinner,
  Center
} from '@chakra-ui/react';
import { servicesData } from '../data/servicesData';
import { ViewIcon } from '@chakra-ui/icons';
import ServiceModal from './ServiceModal';

interface Service {
  title: string;
  imageFolder: string;
  service: string[];
}

const Services: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const brandColour = 'brand.400';
  const [loadingImages, setLoadingImages] = useState<{ [key: string]: boolean }>({});

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    onOpen();
  };

  const handleImageLoad = (title: string) => {
    setLoadingImages(prevState => ({ ...prevState, [title]: false }));
  };

  return (
    <Box bg={brandColour}>
      <Box p={5} maxW="1200px" mx="auto">
        <Heading as="h2" size="xl" mb={6} textAlign="center">
          Our Services
        </Heading>
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={10}>
          {servicesData.map((service: Service) => (
            <Box
              key={service.title}
              position="relative"
              cursor="pointer"
              onClick={() => handleServiceClick(service)}
              overflow="hidden"
              _hover={{
                transform: 'scale(1.05)',
                zIndex: '10',
              }}
            >
              {loadingImages[service.title] && (
                <Center><Spinner
                  size="xl"
                  position="absolute"
                  top="50%"
                  transform="translate(-50%, -50%)"
                  zIndex="10"
                /></Center>
              )}
              <Image
                borderRadius="sm"
                src={require(`../media/serviceImages/${service.imageFolder}/1.png`)}
                alt={`${service.title} image`}
                objectFit="cover"
                width="100%"
                height="100%"
                transition="all 0.3s ease-in-out"
                onLoad={() => handleImageLoad(service.title)}
                display={loadingImages[service.title] ? 'none' : 'block'}
                _hover={{
                  filter: 'brightness(0.8)',
                }}
              />
              <Icon
                as={ViewIcon}
                color="white"
                boxSize="4"
                position="absolute"
                top="1"
                right="3"
                transition="opacity 0.3s ease"
                _groupHover={{ opacity: '1' }}
              />
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                textAlign="center"
                px={2}
                backgroundColor="rgba(0, 0, 0, 0.2)"
                padding="5px"
                borderRadius="md"
              >
                <Heading
                  color="white"
                  fontSize="2xl"
                  fontWeight="bold"
                  textShadow="1px 1px 3px rgba(0,0,0,0.7)"
                  whiteSpace="normal"
                  overflowWrap="break-word"
                >
                  {service.title}
                </Heading>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      <ServiceModal isOpen={isOpen} onClose={onClose} selectedService={selectedService} />
    </Box>
  );
};

export default Services;
