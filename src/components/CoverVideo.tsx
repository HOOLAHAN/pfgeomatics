import React from 'react';
import { Box, Text, VStack, useMediaQuery } from '@chakra-ui/react';

const CoverVideo: React.FC<{ src: string }> = ({ src }) => {
  const [isSmallScreen] = useMediaQuery('(max-width: 600px)');

  return (
    <Box position="relative" width="100%" height="40vh" overflow="hidden" m={0} mt={-1}>
      <video
        src={src}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        autoPlay
        loop
        muted
        playsInline
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
        <Text fontSize={isSmallScreen ? '2xl' : '6xl'} fontWeight="bold">PF Geomatics</Text>
        <Text fontSize={isSmallScreen ? 'l' : '3xl'}>Site Engineering Surveyors</Text>
      </VStack>
    </Box>
  );
};

export default CoverVideo;
