// src/components/Contact.tsx

import { Button, Text, VStack, Link, Icon, Heading, HStack, Box, useColorModeValue } from '@chakra-ui/react';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Contact: React.FC = () => {
  const brandColour = useColorModeValue('lightBrand.500', 'darkBrand.500');
  const buttonBorderColor = useColorModeValue('black', 'white');
  const buttonTextColor = useColorModeValue('black', 'white');
  const buttonHoverBg = useColorModeValue('gray.200', 'whiteAlpha.300');

  return (
    <Box bg={brandColour}>
      <Box p={5} maxW="1200px" mx="auto">
        <VStack spacing={4} align="center">
          <Heading>Contact Us</Heading>
          <Text fontSize="lg" textAlign="center">
            For enquiries reach out to us via email or find us on LinkedIn for more updates.
          </Text>
          <HStack spacing={4}>
            <Button
              as="a"
              href="mailto:info@pfgeomatics.co.uk"
              leftIcon={<Icon as={FaEnvelope} />}
              variant="outline"
              borderColor={buttonBorderColor}
              color={buttonTextColor}
              _hover={{ bg: buttonHoverBg }}
              _active={{ bg: buttonHoverBg, transform: 'scale(0.95)' }}
              transition="all 0.2s ease-in-out"
              size="lg"
            >
              Email
            </Button>
            <Link href="https://www.linkedin.com/company/pf-geomatics/" isExternal>
              <Button
                leftIcon={<Icon as={FaLinkedin} />}
                variant="outline"
                borderColor={buttonBorderColor}
                color={buttonTextColor}
                _hover={{ bg: buttonHoverBg }}
                _active={{ bg: buttonHoverBg, transform: 'scale(0.95)' }}
                transition="all 0.2s ease-in-out"
                size="lg"
              >
                LinkedIn
              </Button>
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default Contact;
