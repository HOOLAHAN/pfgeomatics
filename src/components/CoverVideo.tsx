// src/components/CoverVideo.tsx

import React, { useState } from 'react';
import { Box, VStack, Image, useBreakpointValue, Spinner, Center } from '@chakra-ui/react';

const CoverVideo: React.FC<{ src: string }> = ({ src }) => {
  const height = useBreakpointValue({ base: '45vh', md: '75vh' });
  const [loading, setLoading] = useState(true);

  const handleVideoLoad = () => {
    setLoading(false);
  };

  return (
    <Box position="relative" width="100%" height={height} overflow="hidden" m={0} mt={-1}>
      {loading && (
        <Center><Spinner
          size="xl"
          position="absolute"
          top="65%"
          transform="translate(-50%, -50%)"
          zIndex="20"
        /></Center>
      )}
      <video
        src={src}
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          display: loading ? 'none' : 'block' 
        }}
        autoPlay
        loop
        muted
        playsInline
        onCanPlay={handleVideoLoad}
      />
      <VStack
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        color="white"
        textAlign="center"
        spacing={2}
        p={2}
        borderRadius="md"
        zIndex="10"
      >
        <Box
          backgroundColor="rgba(0, 0, 0, 0.2)"
          padding="10px"
          borderRadius="md"
        >
          <Image
            src="/PFG_LOGO_W2.png"
            alt="PF Geomatics Logo"
            maxH={{ base: '100px', md: '150px' }}
          />
        </Box>
      </VStack>
    </Box>
  );
};

export default CoverVideo;
