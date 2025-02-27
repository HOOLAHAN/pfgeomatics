// src/components/CoverVideo.tsx

import React, { useState } from 'react';
import { Box, VStack, useBreakpointValue, Spinner, Center } from '@chakra-ui/react';

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
      </VStack>
    </Box>
  );
};

export default CoverVideo;
