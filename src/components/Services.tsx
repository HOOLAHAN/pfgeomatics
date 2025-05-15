// src/components/Services.tsx

import React, { useState } from 'react';
import {
  Box,
  Heading,
  Image,
  useDisclosure,
  Spinner,
  Center,
  SimpleGrid,
} from '@chakra-ui/react';
import { servicesData } from '../data/servicesData';
import ServiceModal from './ServiceModal';

interface Service {
  title: string;
  imageFolder: string;
  service: string[];
}

const Services: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [loadingImages, setLoadingImages] = useState<{ [key: string]: boolean }>({});

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    onOpen();
  };

  const handleImageLoad = (title: string) => {
    setLoadingImages(prev => ({ ...prev, [title]: false }));
  };

  return (
    <Box py={10}>
      <Box px={5} maxW="1200px" mx="auto">
        <Heading as="h2" size="xl" mb={6} textAlign="center" color="brand.700">
          Our Services
        </Heading>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} justifyContent="center">
          {servicesData.map((service) => (
            <Box
              key={service.title}
              minW="300px"
              maxW="300px"
              mx="auto"
              cursor="pointer"
              onClick={() => handleServiceClick(service)}
              borderRadius="md"
              overflow="hidden"
              transition="all 0.3s ease"
              _hover={{ transform: 'scale(1.03)', boxShadow: 'lg' }}
              >
              {loadingImages[service.title] && (
                <Center h="200px">
                  <Spinner size="lg" />
                </Center>
              )}
              <Image
                src={require(`../media/serviceImages/${service.imageFolder}/1.png`)}
                alt={`${service.title} image`}
                objectFit="cover"
                w="100%"
                h="200px"
                boxShadow="md"
                borderRadius="md"
                display={loadingImages[service.title] ? 'none' : 'block'}
                onLoad={() => handleImageLoad(service.title)}
              />
              <Box p="4" textAlign="center">
                <Heading size="md" mb="1">
                  {service.title}
                </Heading>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      <ServiceModal
        isOpen={isOpen}
        onClose={onClose}
        selectedService={selectedService}
      />
    </Box>
  );
};

export default Services;
