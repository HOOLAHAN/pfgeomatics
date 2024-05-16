// src/components/Services.tsx

import React, { useState } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Image,
  useDisclosure,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { servicesData } from '../data/servicesData';
import { ViewIcon } from '@chakra-ui/icons';
import ServiceModal from './ServiceModal';

interface Service {
  title: string;
  image: string;
  service: string[];
}

const Services: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const brandColour = useColorModeValue('lightBrand.600', 'darkBrand.600');

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    onOpen();
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
              <Image
                borderRadius="sm"
                src={require(`../media/serviceImages/${service.image}`)}
                alt={`${service.title} image`}
                objectFit="cover"
                width="100%"
                height="100%"
                transition="all 0.3s ease-in-out"
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
              <Heading
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                color="white"
                size="lg"
                textShadow="1px 1px 3px rgba(0,0,0,0.7)"
              >
                {service.title}
              </Heading>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      <ServiceModal isOpen={isOpen} onClose={onClose} selectedService={selectedService} />
    </Box>
  );
};

export default Services;
