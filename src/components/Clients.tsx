// src/components/Clients.tsx

import React from 'react';
import { Box, Image, Heading, VStack, Text, useColorModeValue, SimpleGrid } from '@chakra-ui/react';

// Import images
import lindnerPraterLogo from '../media/clients/lindner-prater-logo.png';
import severfieldLogo from '../media/clients/severfield-logo.png';
import build8Logo from '../media/clients/8build-logo.png';
import kilnbridgeLogo from '../media/clients/kilnbridge-logo.png';
import regalLondonLogo from '../media/clients/regal-london-logo.png';
import mjrobinsonLogo from '../media/clients/MJ-Robinson-Structures.png'

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
  { name: 'MJ Robinson Structures', src: mjrobinsonLogo },
];

const Clients: React.FC = () => {
  const boxBg = useColorModeValue('transparent', 'rgba(255, 255, 255, 0.3)');

  return (
    <Box pt={7} maxW="1200px" mx="auto">
      <VStack spacing={4} align="center">
        <Heading>Clients</Heading>
        <Text>Working With The Best</Text>
        <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing={5} mt={5}>
          {clientLogos.map((logo) => (
            <Box 
              key={logo.name} 
              maxW={{ base: "150px", sm: "150px", md: "200px", lg: "250px" }}
              p={{ base: 2, sm: 3, md: 4, lg: 5 }}
              bg={boxBg} 
              display="flex" 
              justifyContent="center" 
              alignItems="center"
            >
              <Image 
                src={logo.src} 
                alt={`${logo.name} logo`} 
                objectFit="contain" 
                maxH={{ base: "60px", sm: "80px", md: "100px", lg: "120px" }} 
              />
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default Clients;
