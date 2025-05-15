// src/components/Contact.tsx

import {
  Button,
  Text,
  VStack,
  Icon,
  Heading,
  HStack,
  Box,
  useToken,
} from '@chakra-ui/react';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Contact: React.FC = () => {
  const brandBg = useToken('colors', 'brand.300');
  const buttonBorderColor = useToken('colors', 'gray.600');
  const buttonTextColor = useToken('colors', 'gray.600');
  const buttonHoverBg = useToken('colors', 'brand.50');

  return (
    <Box py={10}>
      <Box px={5} maxW="1200px" mx="auto" bg={brandBg} >
        <VStack spacing={6} align="center">
          <Heading color="brand.700">Contact Us</Heading>
          <Text fontSize="lg" textAlign="center" color="brand.700" maxW="600px">
            For enquiries, reach out via email or follow us on LinkedIn for the latest updates.
          </Text>
          <HStack spacing={4}>
            <Button
              as="a"
              href="mailto:info@pfgeomatics.co.uk"
              leftIcon={<Icon as={FaEnvelope} />}
              variant="outline"
              borderColor={buttonBorderColor}
              color={buttonTextColor}
              bg={brandBg}
              _hover={{ bg: buttonHoverBg }}
              _active={{ bg: buttonHoverBg, transform: 'scale(0.97)' }}
              transition="all 0.2s ease"
              size="lg"
            >
              Email
            </Button>
            <Button
              as="a"
              href="https://www.linkedin.com/company/pf-geomatics/"
              target="_blank"
              leftIcon={<Icon as={FaLinkedin} />}
              variant="outline"
              borderColor={buttonBorderColor}
              color={buttonTextColor}
              bg={brandBg}
              _hover={{ bg: buttonHoverBg }}
              _active={{ bg: buttonHoverBg, transform: 'scale(0.97)' }}
              transition="all 0.2s ease"
              size="lg"
            >
              LinkedIn
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default Contact;
