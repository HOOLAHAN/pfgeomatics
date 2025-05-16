// src/components/Clients.tsx

import React, { useState } from 'react';
import { Box, Image, Heading, VStack, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { clientData } from '../../../data/clientData';
import ClientModal from './ClientModal';

// Import images
import lindnerPraterLogo from '../../../media/clients/lindner-prater-logo.png';
import severfieldLogo from '../../../media/clients/severfield-logo.png';
import build8Logo from '../../../media/clients/8build-logo.png';
import kilnbridgeLogo from '../../../media/clients/kilnbridge-logo.png';
import regalLondonLogo from '../../../media/clients/regal-london-logo.png';
import mjrobinsonLogo from '../../../media/clients/MJ-Robinson-Structures.png';
import capitalSteelStructuresLogo from '../../../media/clients/capital-steel-structures-logo.jpeg';
import alpineGroupLogo from '../../../media/clients/alpine-group-logo.png';
import criterionCapitalLogo from '../../../media/clients/criterion-capital.png'

// Define an interface for each client logo
interface ClientLogo {
  name: string;
  src: string; 
}

// Client logos array using imported images
const clientLogos: ClientLogo[] = [
  { name: 'Lindner Prater', src: lindnerPraterLogo },
  { name: 'Severfield UK', src: severfieldLogo },
  { name: '8 Build', src: build8Logo },
  { name: 'Kilnbridge', src: kilnbridgeLogo },
  { name: 'Regal London', src: regalLondonLogo },
  { name: 'MJ Robinson', src: mjrobinsonLogo },
  { name: 'Capital Steel Structures', src: capitalSteelStructuresLogo },
  { name: 'Alpine Group', src: alpineGroupLogo },
  { name: 'Criterion Capital', src: criterionCapitalLogo },
];

const Clients: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const handleLogoClick = (clientName: string) => {
    const clientInfo = clientData.find(client => client.name === clientName);
    setSelectedClient(clientInfo);
    onOpen();
  };

  return (
    <Box pt={7} maxW="1200px" mx="auto">
      <VStack spacing={4} align="center">
        <Heading>Clients</Heading>
        <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing={5} mt={5}>
          {clientLogos.map((logo) => (
            <Box
              key={logo.name}
              maxW={{ base: "150px", sm: "150px", md: "200px", lg: "250px" }}
              p={4}
              bg="whiteAlpha.600"
              borderRadius="md"
              boxShadow="md"
              display="flex"
              justifyContent="center"
              alignItems="center"
              onClick={() => handleLogoClick(logo.name)}
              _hover={{ cursor: 'pointer', transform: 'scale(1.05)' }}
              transition="transform 0.2s ease"
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

      <ClientModal
        isOpen={isOpen}
        onClose={onClose}
        selectedClient={selectedClient}
        clientLogos={clientLogos}
      />
    </Box>
  );
};

export default Clients;
