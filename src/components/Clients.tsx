// src/components/Clients.tsx
import React from 'react';
import { Box, Image, Heading, VStack, Text } from '@chakra-ui/react';
import ChakraCarousel from './ChakraCarousel';

// Import images
import lindnerPraterLogo from '../media/clients/lindner-prater-logo.png';
import severfieldLogo from '../media/clients/severfield-logo.png';
import build8Logo from '../media/clients/8build-logo.png';
import kilnbridgeLogo from '../media/clients/kilnbridge-logo.jpeg';
import regalLondonLogo from '../media/clients/regal-london-logo.jpeg';

// Define an interface for each client logo
interface ClientLogo {
  name: string;
  src: string; 
}

// Client logos array using imported images
const clientLogos: ClientLogo[] = [
  { name: 'Lindner PRATER', src: lindnerPraterLogo },
  { name: 'Severfield', src: severfieldLogo },
  { name: '8build', src: build8Logo },
  { name: 'Kilnbridge', src: kilnbridgeLogo },
  { name: 'Regal London', src: regalLondonLogo },
];

const Clients: React.FC = () => {
  return (
    <Box pt={7} maxW="1200px" mx="auto">
      <VStack spacing={4} align="center">
        <Heading>Clients</Heading>
        <Text>Working With The Best</Text>
        <ChakraCarousel gap={10}>
          {clientLogos.map((logo) => (
            <Box 
              key={logo.name} 
              maxW="300px"
              maxH="150px"
              p={5}
              bg="white" 
              display="flex" 
              justifyContent="center" 
              alignItems="center"
              >
              <Image src={logo.src} alt={`${logo.name} logo`} objectFit="contain" maxHeight="100%" />
            </Box>
          ))}
        </ChakraCarousel>
      </VStack>
    </Box>
  );
};

export default Clients;
