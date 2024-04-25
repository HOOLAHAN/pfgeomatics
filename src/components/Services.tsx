// src/components/Services.tsx
import React from 'react';
import { Box, Heading, UnorderedList, ListItem, SimpleGrid, Image, VStack } from '@chakra-ui/react';
import { servicesData } from '../data/servicesData';

interface Service {
  title: string;
  image: string;
  service: string[];
}

const Services: React.FC = () => {
  return (
    <Box bg="brand.600">
      <Box p={5} maxW="1200px" mx="auto" >
        <Heading as="h2" size="xl" mb={6} >Our Services</Heading>
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={10} >
          {servicesData.map((service: Service) => (
            <VStack key={service.title} align="stretch" p={4} boxShadow="lg" borderRadius="lg" bg="brand.300">
              <Image borderRadius="md" src={require(`../data/serviceImages/${service.image}`)} alt={`${service.title} image`} objectFit="cover" />
              <Heading size="lg" mt={4}>{service.title}</Heading>
              <UnorderedList spacing={2} mt={2}>
                {service.service.map((item, index) => (
                  <ListItem key={index}>{item}</ListItem>
                ))}
              </UnorderedList>
            </VStack>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Services;
