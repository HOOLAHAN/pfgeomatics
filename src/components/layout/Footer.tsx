// src/components/Footer.tsx

import { Box, Text, Link, Flex, Icon, useDisclosure, useBreakpointValue, Container } from '@chakra-ui/react';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import PrivacyPolicy from '../legal/PrivacyPolicy';

const Footer: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Determine the flex direction based on screen size
  const flexDirection = useBreakpointValue<'column' | 'row'>({ base: 'column', md: 'row' });

  return (
    <Box
      color="whiteAlpha.800"
      mt={5}
      py={8}
      bg="brand.900"
      borderTop="1px solid"
      borderColor="whiteAlpha.200"
    >
      <Container maxW="container.xl">
        <Flex direction="column" align="center">
          <Text fontSize="lg" fontWeight="900" letterSpacing="-0.03em">PF Geomatics</Text>
          <Text color="whiteAlpha.600">© 2024 PF Geomatics. All rights reserved.</Text>
          <Flex
            direction={flexDirection}
            align="center"
            justify="center"
            wrap="wrap"
          >
            <Flex align="center" m={2}>
              <Icon as={FaEnvelope} w={5} h={5} color="accent.100" mr={2} />
              <Link href="mailto:info@pfgeomatics.co.uk" isExternal color="whiteAlpha.800" _hover={{ color: 'accent.100' }}>
                info@pfgeomatics.co.uk
              </Link>
            </Flex>
            <Flex align="center" m={2}>
              <Icon as={FaLinkedin} w={5} h={5} color="accent.100" mr={2} />
              <Link href="https://www.linkedin.com/company/pf-geomatics/" isExternal color="whiteAlpha.800" _hover={{ color: 'accent.100' }}>
                LinkedIn
              </Link>
            </Flex>
            <Link href="#" onClick={onOpen} color="whiteAlpha.800" _hover={{ color: 'accent.100' }} m={2}>Privacy Policy</Link>
          </Flex>
          <PrivacyPolicy isOpen={isOpen} onClose={onClose} />
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
