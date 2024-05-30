// src/components/Clients.tsx

import React, { useState } from 'react';
import { Box, Image, Heading, VStack, Text, useColorModeValue, SimpleGrid, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, useDisclosure, Link, Center } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { clientData } from '../data/clientData';

// Import images
import lindnerPraterLogo from '../media/clients/lindner-prater-logo.png';
import severfieldLogo from '../media/clients/severfield-logo.png';
import build8Logo from '../media/clients/8build-logo.png';
import kilnbridgeLogo from '../media/clients/kilnbridge-logo.png';
import regalLondonLogo from '../media/clients/regal-london-logo.png';
import mjrobinsonLogo from '../media/clients/MJ-Robinson-Structures.png';
import capitalSteelStructuresLogo from '../media/clients/capital-steel-structures-logo.jpeg';
import alpineGroupLogo from '../media/clients/alpine-group-logo.png';

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
];

const Clients: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const boxBg = useColorModeValue('transparent', 'rgba(255, 255, 255, 0.3)');

  const handleLogoClick = (clientName: string) => {
    const clientInfo = clientData.find(client => client.name === clientName);
    setSelectedClient(clientInfo);
    onOpen();
  };

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
              onClick={() => handleLogoClick(logo.name)}
              _hover={{ cursor: 'pointer', transform: 'scale(1.1)' }}
              transition="transform 0.2s"
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

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            {selectedClient && (
              <>
                <Center>
                  <Image 
                    src={clientLogos.find(logo => logo.name === selectedClient.name)?.src} 
                    alt={`${selectedClient.name} logo`} 
                    objectFit="contain" 
                    maxH="60px" 
                    mb={2}
                  />
                </Center>
                {selectedClient.website && (
                  <Text>
                    <strong>Website:</strong> 
                    <Link href={selectedClient.website} isExternal color="blue.500" textDecoration="underline" ml={2}>
                      {selectedClient.website} <ExternalLinkIcon mx="2px" />
                    </Link>
                  </Text>
                )}
                <Text mt={2}><strong>About:</strong> {selectedClient.about}</Text>
                <Text mt={2}><strong>Our Services:</strong> {selectedClient.pfgService}</Text>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Clients;
