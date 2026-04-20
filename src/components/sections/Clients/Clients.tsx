// src/components/Clients.tsx

import React, { useState } from 'react';
import {
  Box,
  Image,
  VStack,
  SimpleGrid,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import { clientData } from '../../../data/clientData';
import ClientModal from './ClientModal';
import { getMediaUrl } from '../../../utils/getMediaUrl';
import SectionHeader from '../../shared/SectionHeader';

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
    <Box py={{ base: 16, md: 22 }} px={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
      <VStack spacing={4} align="center">
        <SectionHeader
          eyebrow="Clients"
          title="Trusted by contractors and specialist subcontractors."
          description="PF Geomatics works with project teams that need reliable survey information, fast turnaround, and practical construction context."
        />
        <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing={5} mt={5}>
          {clientLogoMeta.map((logo) => (
            <Box
              key={logo.name}
              maxW={{ base: "150px", sm: "150px", md: "200px", lg: "250px" }}
              minH={{ base: "112px", md: "138px" }}
              p={5}
              bg="white"
              borderRadius="2xl"
              border="1px solid"
              borderColor="blackAlpha.100"
              boxShadow="0 16px 45px rgba(6, 24, 36, 0.08)"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap={3}
              onClick={() => handleLogoClick(logo.name)}
              _hover={{ cursor: 'pointer', transform: 'translateY(-6px)', boxShadow: '0 22px 60px rgba(6, 24, 36, 0.14)' }}
              transition="all 0.25s ease"
            >
              <Image
                src={getMediaUrl('clients', logo.filename)}
                alt={`${logo.name} logo`}
                loading="lazy"
                objectFit="contain"
                maxH={{ base: "48px", sm: "60px", md: "74px", lg: "82px" }}
              />
              <Text fontSize="xs" color="gray.500" fontWeight="700" textAlign="center">
                {logo.name}
              </Text>
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
