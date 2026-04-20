// src/components/About.tsx

import React, { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  Grid,
  Image,
  Heading,
  SimpleGrid,
  Text,
  HStack,
} from '@chakra-ui/react';
import AboutModal from './AboutModal';

const About: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <Box py={{ base: 14, md: 20 }} px={{ base: 4, md: 8 }}>
      <Box mx="auto" maxW="1180px">
        <Grid
          templateColumns={{ base: '1fr', lg: '0.8fr 1.2fr' }}
          gap={{ base: 8, lg: 14 }}
          alignItems="center"
        >
          <Box
            textAlign="center"
            bg="white"
            borderRadius="32px"
            p={{ base: 8, md: 12 }}
            border="1px solid"
            borderColor="blackAlpha.100"
            boxShadow="0 24px 80px rgba(6, 24, 36, 0.10)"
            position="relative"
            overflow="hidden"
          >
            <Box position="absolute" inset={0} bgGradient="linear(135deg, white, brand.50)" />
            <Image
              src="/PFG_LOGO_B2.png"
              alt="PF Geomatics Logo"
              loading="lazy"
              maxH={{ base: '140px', md: '240px' }}
              mx="auto"
              position="relative"
            />
          </Box>

          <VStack spacing={6} align="start">
            <Text color="accent.300" fontSize="xs" fontWeight="900" letterSpacing="0.22em" textTransform="uppercase">
              Who We Are
            </Text>
            <Heading
              color="brand.900"
              fontSize={{ base: '3xl', md: '5xl' }}
              lineHeight="1"
              letterSpacing="-0.055em"
              fontWeight="900"
            >
              Survey control, setting out, and as-built intelligence for demanding sites.
            </Heading>
            <Text color="gray.600" fontSize={{ base: 'md', md: 'lg' }} lineHeight="1.8">
              PF Geomatics supports contractors and specialist subcontractors with accurate, responsive engineering survey services. The work is practical, site-aware, and focused on preventing avoidable clashes, delays, and tolerance issues.
            </Text>
            <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={4} w="100%">
              {[
                ['Steelwork', 'line, level, plumb and as-built checks'],
                ['Monitoring', 'rail, structural and excavation control'],
                ['3D Outputs', 'laser scanning and CAD-ready deliverables'],
              ].map(([title, copy]) => (
                <Box key={title} p={4} bg="whiteAlpha.800" borderRadius="2xl" border="1px solid" borderColor="blackAlpha.100">
                  <Text color="brand.900" fontWeight="900">{title}</Text>
                  <Text color="gray.600" fontSize="sm" lineHeight="1.6">{copy}</Text>
                </Box>
              ))}
            </SimpleGrid>
            <HStack spacing={4} flexWrap="wrap">
              <Button
                size={{ base: 'md', md: 'lg' }}
                onClick={() => setModalOpen(true)}
                bg="brand.900"
                color="white"
                px={7}
                _hover={{ bg: 'brand.700', transform: 'translateY(-2px)' }}
              >
                Learn More
              </Button>
              <Text color="gray.500" fontSize="sm">
                Trusted on rail, commercial, refurbishment and high-rise construction.
              </Text>
            </HStack>
          </VStack>
        </Grid>

        <AboutModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      </Box>
    </Box>
  );
};

export default About;
