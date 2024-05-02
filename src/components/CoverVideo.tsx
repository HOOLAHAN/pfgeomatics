import React, { useState } from 'react';
import { Box, Button, Text, VStack, useMediaQuery } from '@chakra-ui/react';
import AboutModal from './AboutModal';

const CoverVideo: React.FC<{ src: string }> = ({ src }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSmallScreen] = useMediaQuery('(max-width: 600px)');

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

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
        <Button size={isSmallScreen ? 'md' : 'lg'} onClick={openModal} colorScheme="blue" mt={7} >About</Button>
      </VStack>
      <AboutModal isOpen={isModalOpen} onClose={closeModal} />
    </Box>
  );
};

export default CoverVideo;
