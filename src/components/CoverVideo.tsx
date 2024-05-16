import React from 'react';
import { Box, Text, VStack, useMediaQuery } from '@chakra-ui/react';

const CoverVideo: React.FC<{ src: string }> = ({ src }) => {
  const [isSmallScreenWidth] = useMediaQuery('(max-width: 600px)');
  const [isSmallScreenHeight] = useMediaQuery('(max-height: 500px)');
  
  const fontSizeForTitle = isSmallScreenWidth || isSmallScreenHeight ? '2xl' : '6xl';
  const fontSizeForSubtitle = isSmallScreenWidth || isSmallScreenHeight ? '2xl' : '3xl';

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
        <Text fontSize={fontSizeForTitle} fontWeight="bold">PF Geomatics</Text>
        <Text fontSize={fontSizeForSubtitle}>Site Engineering Surveyors</Text>
      </VStack>
    </Box>
  );
};

export default CoverVideo;
