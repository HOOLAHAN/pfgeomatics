import React from 'react';
import {
  Box,
  Button,
  Heading,
  Icon,
  Text,
  Link,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import SectionHeader from '../../shared/SectionHeader';

const ContactForm: React.FC = () => {
  return (
    <Box py={{ base: 16, md: 24 }} px={{ base: 4, md: 8 }}>
      <Box maxW="1120px" mx="auto">
        <SectionHeader
          eyebrow="Contact"
          title="Need reliable survey support on site?"
          description="Send the project details and the team will come back to you with the right next step."
        />
        <Box
          maxW="980px"
          p={{ base: 5, md: 8 }}
          shadow="0 24px 80px rgba(6, 24, 36, 0.16)"
          borderWidth="1px"
          borderColor="blackAlpha.100"
          borderRadius="32px"
          bg="white"
          mx="auto"
        >
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} alignItems="start">
          <Box
            bg="brand.900"
            color="white"
            borderRadius="24px"
            p={{ base: 6, md: 8 }}
            minH="100%"
            bgImage="linear-gradient(145deg, rgba(248,213,138,0.18), transparent 42%)"
          >
            <Heading size="lg" letterSpacing="-0.04em" mb={4}>
              Tell us what needs setting out, checking, scanning, or monitoring.
            </Heading>
            <Text color="whiteAlpha.700" lineHeight="1.8" mb={6}>
              Include the site location, programme pressure, discipline, and any drawings or tolerance concerns. We will help identify the most practical survey support.
            </Text>
            <Link href="https://www.linkedin.com/company/pf-geomatics/" isExternal>
              <Button
                leftIcon={<Icon as={FaLinkedin} />}
                variant="outline"
                borderColor="whiteAlpha.500"
                color="white"
                _hover={{ bg: 'whiteAlpha.200' }}
                _active={{ transform: 'scale(0.97)' }}
                transition="all 0.2s ease"
              >
                Find us on LinkedIn
              </Button>
            </Link>
          </Box>
          <VStack
            spacing={5}
            align="stretch"
            justify="center"
            bg="brand.50"
            border="1px solid"
            borderColor="blackAlpha.100"
            borderRadius="24px"
            p={{ base: 6, md: 8 }}
            minH="100%"
          >
              <Icon as={FaEnvelope} color="accent.300" boxSize={9} />
              <Heading size="lg" color="brand.900" letterSpacing="-0.04em">
                Email the team directly.
              </Heading>
              <Text color="gray.600" lineHeight="1.8">
                Send your enquiry to info@pfgeomatics.co.uk. Include the site location, programme pressure, and the type of survey support you need.
              </Text>
              <Text color="brand.900" fontWeight="900">
                info@pfgeomatics.co.uk
              </Text>
              <Button
                as="a"
                href="mailto:info@pfgeomatics.co.uk?subject=PF%20Geomatics%20enquiry"
                mt={4}
                bg="brand.900"
                leftIcon={<Icon as={FaEnvelope} />}
                color="white"
                _hover={{ bg: 'brand.700', transform: 'translateY(-2px)' }}
                _active={{ transform: 'scale(0.97)' }}
                transition="all 0.2s ease"
                size="lg"
                w="100%"
              >
                Email PF Geomatics
              </Button>
          </VStack>
        </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactForm;
