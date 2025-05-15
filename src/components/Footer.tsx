// src/components/Footer.tsx

import { Box, Text, Link, Flex, Icon, useDisclosure, useBreakpointValue, Container } from '@chakra-ui/react';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import PrivacyPolicy from './PrivacyPolicy';

const Footer: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Determine the flex direction based on screen size
  const flexDirection = useBreakpointValue<'column' | 'row'>({ base: 'column', md: 'row' });

  return (
    <Box 
    // bg="brand.100" 
    color="gray.700" mt={10} py={5}>
      <Container maxW="container.xl">
        <Flex direction="column" align="center">
          <Text fontSize="lg" fontWeight="bold">PF Geomatics</Text>
          <Text>© 2024 PF Geomatics. All rights reserved.</Text>
          <Flex
            direction={flexDirection}
            align="center"
            justify="center"
            wrap="wrap"
          >
            <Flex align="center" m={2}>
              <Icon as={FaEnvelope} w={5} h={5} color="blue.500" mr={2} />
              <Link href="mailto:info@pfgeomatics.co.uk" isExternal color="blue.500">
                info@pfgeomatics.co.uk
              </Link>
            </Flex>
            <Flex align="center" m={2}>
              <Icon as={FaLinkedin} w={5} h={5} color="blue.500" mr={2} />
              <Link href="https://www.linkedin.com/company/pf-geomatics/" isExternal color="blue.500">
                LinkedIn
              </Link>
            </Flex>
            <Link href="#" onClick={onOpen} color="blue.500" m={2}>Privacy Policy</Link>
          </Flex>
          <PrivacyPolicy isOpen={isOpen} onClose={onClose} />
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
