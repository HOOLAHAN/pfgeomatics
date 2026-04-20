// src/components/modals/ClientModal.tsx

import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Image,
  Text,
  Link,
  Center,
  Box,
  Heading,
  VStack,
  HStack,
  Badge,
  Grid,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

interface ClientInfo {
  name: string;
  website?: string;
  about: string;
  pfgService: string;
}

interface ClientLogo {
  name: string;
  src: string;
}

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedClient: ClientInfo | null;
  clientLogos: ClientLogo[];
}

const ClientModal: React.FC<ClientModalProps> = ({ isOpen, onClose, selectedClient, clientLogos }) => {
  if (!selectedClient) return null;

  const logoSrc = clientLogos.find(logo => logo.name === selectedClient.name)?.src;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" isCentered motionPreset="scale">
      <ModalOverlay bg="rgba(6, 24, 36, 0.76)" backdropFilter="blur(8px)" />
      <ModalContent
        mx={4}
        my={{ base: 3, md: 4 }}
        bg="brand.50"
        borderRadius={{ base: '24px', md: '32px' }}
        boxShadow="0 30px 100px rgba(6, 24, 36, 0.35)"
        maxH="92vh"
        overflowY="auto"
      >
        <ModalCloseButton top={4} right={4} bg="whiteAlpha.900" borderRadius="full" zIndex={2} _hover={{ bg: 'white' }} />
        <ModalBody p={{ base: 4, md: 5 }}>
          <Grid templateColumns={{ base: '1fr', md: '0.75fr 1.25fr' }} gap={{ base: 4, md: 5 }} alignItems="stretch">
            <Center
              bg="white"
              borderRadius="24px"
              border="1px solid"
              borderColor="blackAlpha.100"
              minH={{ base: '180px', md: '220px' }}
              p={{ base: 6, md: 7 }}
              boxShadow="0 18px 55px rgba(6, 24, 36, 0.10)"
            >
              <Image
                src={logoSrc}
                alt={`${selectedClient.name} logo`}
                objectFit="contain"
                maxH={{ base: '96px', md: '115px' }}
                maxW="100%"
              />
            </Center>
            <VStack align="stretch" spacing={{ base: 4, md: 4 }}>
              <Box>
                <Badge bg="accent.100" color="brand.900" borderRadius="full" px={3} py={1} mb={4}>
                  Client
                </Badge>
                <Heading color="brand.900" fontSize={{ base: '2xl', md: '3xl', xl: '4xl' }} lineHeight="1" letterSpacing="-0.06em">
                  {selectedClient.name}
                </Heading>
              </Box>
              <Box p={{ base: 4, md: 5 }} bg="white" borderRadius="2xl" border="1px solid" borderColor="blackAlpha.100">
                <Text color="gray.500" fontSize="xs" fontWeight="900" letterSpacing="0.12em" textTransform="uppercase" mb={2}>
                  About
                </Text>
                <Text color="gray.700" lineHeight="1.65">
                  {selectedClient.about}
                </Text>
              </Box>
              <Box p={{ base: 4, md: 5 }} bg="white" borderRadius="2xl" border="1px solid" borderColor="blackAlpha.100">
                <Text color="gray.500" fontSize="xs" fontWeight="900" letterSpacing="0.12em" textTransform="uppercase" mb={2}>
                  PF Geomatics Services
                </Text>
                <Text color="brand.900" fontWeight="750" lineHeight="1.6">
                  {selectedClient.pfgService}
                </Text>
              </Box>
          {selectedClient.website && (
                <HStack>
              <Link
                href={selectedClient.website}
                isExternal
                    color="brand.900"
                    fontWeight="900"
                    _hover={{ color: 'accent.300' }}
              >
                {selectedClient.website} <ExternalLinkIcon mx="2px" />
              </Link>
                </HStack>
          )}
            </VStack>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ClientModal;
