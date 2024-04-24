// src/components/Footer.tsx

import { Box, Text, Link, VStack, Container, HStack, Icon, useDisclosure } from '@chakra-ui/react';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import PrivacyPolicy from './PrivacyPolicy';

const Footer: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="gray.200" color="gray.700" mt={10} py={5}>
      <Container maxW="container.xl">
        <VStack spacing={2}>
          <Text fontSize="lg" fontWeight="bold">PFGeomatics</Text>
          <Text>© 2024 PFGeomatics. All rights reserved.</Text>
          <HStack spacing={1}>
            <Icon as={FaEnvelope} w={5} h={5} color="blue.500" />
            <Link href="mailto:info@pfgeomatics.co.uk" isExternal color="blue.500">
              info@pfgeomatics.co.uk
            </Link>
          </HStack>
          <HStack spacing={1}>
            <Icon as={FaLinkedin} w={5} h={5} color="blue.500" />
            <Link href="https://www.linkedin.com/company/pf-geomatics/" isExternal color="blue.500">
              LinkedIn
            </Link>
          </HStack>
          <Link href="#" onClick={onOpen} color="blue.500">Privacy Policy</Link>
          <PrivacyPolicy isOpen={isOpen} onClose={onClose} />
        </VStack>
      </Container>
    </Box>
  );
};

export default Footer;
