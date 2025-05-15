// src/components/About.tsx

import React, { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  useMediaQuery,
  Grid,
  Image,
  Flex,
  Spinner,
  Heading,
  useToken,
} from '@chakra-ui/react';
import AboutModal from './AboutModal';

import aboutImage from '../media/serviceImages/about/1.png';

const About: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSmallScreen] = useMediaQuery('(max-width: 600px)');
  const [loading, setLoading] = useState(true);
  const handleImageLoad = () => setLoading(false);

  const brandBg = useToken("colors", "brand.100");
  const buttonBorderColor = useToken("colors", "brand.600");
  const buttonTextColor = useToken("colors", "brand.600");
  const buttonHoverBg = useToken("colors", "brand.50");

  return (
    <Box bg={brandBg} py={10}>
      <Box px={5} mx="auto" maxW="1200px">
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={10} alignItems="center">
          <Flex justify="center" align="center" position="relative">
            {loading && (
              <Spinner size="xl" position="absolute" top="50%" transform="translateY(-50%)" zIndex="10" />
            )}
            <Image
              src={aboutImage}
              alt="Surveyor working"
              borderRadius="md"
              objectFit="cover"
              boxSize={{ base: '300px', md: '500px' }}
              onLoad={handleImageLoad}
              display={loading ? 'none' : 'block'}
              shadow="lg"
            />
          </Flex>
          <VStack spacing={6} textAlign="center">
            <Image
              src="/PFG_LOGO_B2.png"
              alt="PF Geomatics Logo"
              maxH={{ base: '80px', md: '120px' }}
              mb={2}
            />
            <Heading size="lg" color="brand.600">
              Who We Are
            </Heading>
            <Button
              size={isSmallScreen ? 'md' : 'lg'}
              onClick={() => setModalOpen(true)}
              variant="outline"
              borderColor={buttonBorderColor}
              color={buttonTextColor}
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
