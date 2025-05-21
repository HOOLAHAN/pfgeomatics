// src/components/Clients.tsx

import React, { useState } from 'react';
import {
  Box,
  Image,
  Heading,
  VStack,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react';
import { clientData } from '../../../data/clientData';
import ClientModal from './ClientModal';
import { getMediaUrl } from '../../../utils/getMediaUrl';

interface ClientLogo {
  name: string;
  filename: string;
}

const clientLogoMeta: ClientLogo[] = [
  { name: 'Lindner Prater', filename: 'lindner-prater-logo.png' },
  { name: 'Severfield UK', filename: 'severfield-logo.png' },
  { name: '8 Build', filename: '8build-logo.png' },
  { name: 'Kilnbridge', filename: 'kilnbridge-logo.png' },
  { name: 'Regal London', filename: 'regal-london-logo.png' },
  { name: 'MJ Robinson', filename: 'MJ-Robinson-Structures.png' },
  { name: 'Capital Steel Structures', filename: 'capital-steel-structures-logo.jpeg' },
  { name: 'Alpine Group', filename: 'alpine-group-logo.png' },
  { name: 'Criterion Capital', filename: 'criterion-capital.png' },
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
        <Heading color="brand.800">Clients</Heading>
        <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing={5} mt={5}>
          {clientLogoMeta.map((logo) => (
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
                src={getMediaUrl('clients', logo.filename)}
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
        clientLogos={clientLogoMeta.map((c) => ({
          name: c.name,
          src: getMediaUrl('clients', c.filename),
        }))}
      />
    </Box>
  );
};

export default Clients;
