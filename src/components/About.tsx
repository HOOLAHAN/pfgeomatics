// src/components/About.tsx

import React, { useState } from 'react';
import { Box, Heading, useColorModeValue, Button, VStack, useMediaQuery, Grid, Image, Flex } from '@chakra-ui/react';
import AboutModal from './AboutModal';

// Import an image for the About section
import aboutImage from '../media/serviceImages/about/1.png';

const About: React.FC = () => {
  const brandColour = useColorModeValue('lightBrand.800', 'darkBrand.800');
  const buttonBorderColor = useColorModeValue('black', 'white');
  const buttonTextColor = useColorModeValue('black', 'white');
  const buttonHoverBg = useColorModeValue('gray.200', 'whiteAlpha.300');
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSmallScreen] = useMediaQuery('(max-width: 600px)');

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <Box bg={brandColour}>
      <Box p={5} mx="auto" maxW="1200px">
        <Grid
          templateColumns={{ base: '1fr', md: '1fr 1fr' }}
          gap={6}
          alignItems="center"
        >
          <Flex
            justifyContent="center"
            alignItems="center"
            height={{ base: 'auto', md: '100%' }}
            width={{ base: '100%', md: 'auto' }}
          >
            <Image
              src={aboutImage}
              alt="About us"
              borderRadius="sm"
              objectFit="cover"
              boxSize={{ base: '300px', md: '500px' }} 
            />
          </Flex>
          <Box px={10} textAlign="center">
            <Heading as="h1" size="xl" mb={4}>
              We are a site engineering and surveying company based in London
            </Heading>
            <VStack spacing={4} align="center">
              <Button
                size={isSmallScreen ? 'md' : 'lg'}
                onClick={openModal}
                variant="outline"
                borderColor={buttonBorderColor}
                color={buttonTextColor}
                _hover={{
                  bg: buttonHoverBg,
                }}
                _active={{
                  bg: buttonHoverBg,
                  transform: 'scale(0.95)',
                }}
                transition="all 0.2s ease-in-out"
              >
                About
              </Button>
            </VStack>
            <AboutModal isOpen={isModalOpen} onClose={closeModal} />
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default About;
