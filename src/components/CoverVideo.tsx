import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';

const CoverVideo: React.FC<{ src: string }> = ({ src }) => {
  return (
    <Box position="relative" width="100%" height="40vh" overflow="hidden">
      <video
        src={src}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        autoPlay
        loop
        muted
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
      >
        <Text fontSize="6xl" fontWeight="bold">PF Geomatics</Text>
        <Text fontSize="3xl">Site Engineering Surveyors</Text>
      </VStack>
    </Box>
  );
};

export default CoverVideo;
