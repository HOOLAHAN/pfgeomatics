// src/components/Clients.tsx
import React from 'react';
import { SimpleGrid, Box, Image, Heading, VStack } from '@chakra-ui/react';

// Import images
import lindnerPraterLogo from '../clients/lindner-prater-logo.png';
import typeTenLogo from '../clients/typeten-logo.png';
import severfieldLogo from '../clients/severfield-logo.png';
import build8Logo from '../clients/8build-logo.png';
import kilnbridgeLogo from '../clients/kilnbridge-logo.jpeg';
import regalLondonLogo from '../clients/regal-london-logo.jpeg';

// Define an interface for each client logo
interface ClientLogo {
  name: string;
  src: string; 
}

// Client logos array using imported images
const clientLogos: ClientLogo[] = [
  { name: 'Lindner PRATER', src: lindnerPraterLogo },
  { name: 'TypeTen', src: typeTenLogo },
  { name: 'Severfield', src: severfieldLogo },
  { name: '8build', src: build8Logo },
  { name: 'Kilnbridge', src: kilnbridgeLogo },
  { name: 'Regal London', src: regalLondonLogo },
];

const Clients: React.FC = () => {
  return (
    <Box p={5} maxW="1200px" mx="auto">
      <VStack spacing={4} align="center">
        <Heading>Clients</Heading>
        <SimpleGrid columns={[2, null, 3]} spacing={10}>
          {clientLogos.map((logo) => (
            <Box key={logo.name} height="150px" px={5} bg="white" display="flex" justifyContent="center" alignItems="center">
              <Image src={logo.src} alt={`${logo.name} logo`} objectFit="contain" maxHeight="100%" />
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default Clients;
