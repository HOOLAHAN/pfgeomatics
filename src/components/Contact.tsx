// src/components/Contact.tsx

import { Button, Text, VStack, Link, Icon, Heading, HStack, Box } from '@chakra-ui/react';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Contact: React.FC = () => {
  return (
    <Box bg="brand.500">
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
              colorScheme="blue"
              size="lg"
            >
              Email
            </Button>
            <Link href="https://www.linkedin.com/company/pf-geomatics/" isExternal>
              <Button
                leftIcon={<Icon as={FaLinkedin} />}
                colorScheme="blue"
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