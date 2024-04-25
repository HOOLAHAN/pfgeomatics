// src/components/Services.tsx
import React, { useState } from 'react';
import { Box, Heading, SimpleGrid, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, Text, useColorModeValue } from '@chakra-ui/react';
import { servicesData } from '../data/servicesData';

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
        <Heading as="h2" size="xl" mb={6} textAlign="center">Our Services</Heading>
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={10}>
          {servicesData.map((service: Service) => (
            <Box key={service.title} position="relative" cursor="pointer" onClick={() => handleServiceClick(service)}>
              <Image
                borderRadius="sm"
                src={require(`../media/serviceImages/${service.image}`)}
                alt={`${service.title} image`}
                objectFit="cover"
              />
              <Heading
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                color="white"
                size="lg"
              >
                {service.title}
              </Heading>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      {selectedService && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedService.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Image
                borderRadius="sm"
                src={require(`../media/serviceImages/${selectedService.image}`)}
                alt={`${selectedService.title} image`}
                objectFit="cover"
              />
              <Text fontWeight="bold">Services:</Text>
              {selectedService.service.map((item, index) => (
                <Text key={index}>{item}</Text>
              ))}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default Services;
