// src/components/CoverVideo.tsx

import React, { useState } from 'react';
import { Box, Button, HStack, VStack, useBreakpointValue, Spinner, Center, Heading, Text } from '@chakra-ui/react';
import { Link as ScrollLink } from 'react-scroll';

const CoverVideo: React.FC<{ src: string }> = ({ src }) => {
  const height = useBreakpointValue({ base: '45vh', md: '75vh' });
  const [loading, setLoading] = useState(true);

  const handleVideoLoad = () => setLoading(false);

  return (
    <Box
      position="relative"
      width="100%"
      height={height}
      px={{ base: 4, md: 10 }}
      py={{ base: 6, md: 10 }}
    >
      <Box
        bg="black"
        borderRadius="lg"
        overflow="hidden"
        width="100%"
        height="100%"
        position="relative"
      >
        {loading && (
          <Center h="100%">
            <Spinner size="xl" color="white" />
          </Center>
        )}

        <video
          src={src}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: loading ? 0 : 1,
            transition: 'opacity 0.5s ease-in-out',
          }}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onCanPlay={handleVideoLoad}
        />

        <Box
          position="absolute"
          inset={0}
          bgGradient="linear(to-b, blackAlpha.600, blackAlpha.300, blackAlpha.700)"
          pointerEvents="none"
        />

        {/* Overlay */}
        <VStack
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          color="white"
          textAlign="center"
          spacing={2}
          px={4}
          zIndex={10}
        >
          <Heading fontSize={{ base: 'lg', sm: 'xl', md: '4xl' }} fontWeight="bold">
            PF Geomatics
          </Heading>
          <Text
            fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
            display={{ base: 'none', sm: 'block' }}
          >
            Precision Engineering & Surveying Services
          </Text>
          <HStack spacing={3} pt={3} flexWrap="wrap" justify="center">
            <ScrollLink to="projects" smooth duration={500} offset={-90}>
              <Button bg="accent.100" color="brand.900" _hover={{ bg: 'accent.200' }}>
                View Projects
              </Button>
            </ScrollLink>
            <ScrollLink to="contact-form" smooth duration={500} offset={-90}>
              <Button variant="outline" borderColor="white" color="white" _hover={{ bg: 'whiteAlpha.300' }}>
                Request a Quote
              </Button>
            </ScrollLink>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default CoverVideo;
