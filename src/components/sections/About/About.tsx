// src/components/About.tsx

import React, { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  Grid,
  Image,
  Heading,
  useToken,
} from '@chakra-ui/react';
import AboutModal from './AboutModal';

const About: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const brandBg = useToken("colors", "brand.300");
  const buttonBorderColor = useToken("colors", "brand.600");
  const buttonTextColor = useToken("colors", "brand.600");
  const buttonHoverBg = useToken("colors", "brand.50");

  return (
    <Box>
      <Box px={5} mx="auto" maxW="1200px">
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={10} alignItems="center">
          
          {/* Logo on Left */}
          <Box textAlign="center">
            <Image
              src="/PFG_LOGO_B2.png"
              alt="PF Geomatics Logo"
              maxH={{ base: '80px', md: '220px' }}
              mx="auto"
            />
          </Box>

          {/* Text and Button on Right */}
          <VStack spacing={6} textAlign="center">
            <Heading size="lg" color="brand.600">
              Who We Are
            </Heading>
            <Button
              size="lg"
              onClick={() => setModalOpen(true)}
              variant="outline"
              borderColor={buttonBorderColor}
              color={buttonTextColor}
              bg={brandBg}
              _hover={{ bg: buttonHoverBg }}
              _active={{ transform: 'scale(0.97)' }}
              transition="all 0.2s ease"
            >
              Learn More
            </Button>
          </VStack>
        </Grid>

        <AboutModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      </Box>
    </Box>
  );
};

export default About;
