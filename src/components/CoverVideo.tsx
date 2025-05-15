// src/components/CoverVideo.tsx

import React, { useState } from 'react';
import { Box, VStack, useBreakpointValue, Spinner, Center, Heading, Text } from '@chakra-ui/react';

const CoverVideo: React.FC<{ src: string }> = ({ src }) => {
  const height = useBreakpointValue({ base: '45vh', md: '75vh' });
  const [loading, setLoading] = useState(true);

  const handleVideoLoad = () => setLoading(false);

  return (
    <Box
      position="relative"
      width="100%"
      height={height}
      padding={10}
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
          onCanPlay={handleVideoLoad}
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
          <Heading fontSize={{ base: '2xl', md: '4xl' }} fontWeight="bold">
            PF Geomatics
          </Heading>
          <Text fontSize={{ base: 'md', md: 'lg' }}>
            Precision Engineering & Surveying Services
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default CoverVideo;
