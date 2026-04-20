// src/components/CoverVideo.tsx

import React, { useState } from 'react';
import { Box, Button, HStack, VStack, useBreakpointValue, Spinner, Center, Heading, Text, SimpleGrid } from '@chakra-ui/react';
import { Link as ScrollLink } from 'react-scroll';

const CoverVideo: React.FC<{ src: string }> = ({ src }) => {
  const height = useBreakpointValue({ base: '74vh', md: '82vh' });
  const [loading, setLoading] = useState(true);

  const handleVideoLoad = () => setLoading(false);

  return (
    <Box
      position="relative"
      width="100%"
      height={height}
      px={{ base: 4, md: 8, xl: 10 }}
      py={{ base: 5, md: 8 }}
    >
      <Box
        bg="black"
        borderRadius={{ base: '2xl', md: '32px' }}
        overflow="hidden"
        width="100%"
        height="100%"
        position="relative"
        boxShadow="0 30px 90px rgba(6, 24, 36, 0.35)"
        border="1px solid"
        borderColor="whiteAlpha.300"
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
          bgGradient="linear(110deg, rgba(6,24,36,0.92) 0%, rgba(6,24,36,0.72) 42%, rgba(6,24,36,0.18) 100%)"
          pointerEvents="none"
        />
        <Box
          position="absolute"
          inset={0}
          bgImage="linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)"
          bgSize="64px 64px"
          opacity={0.28}
          pointerEvents="none"
        />

        <VStack
          position="absolute"
          top="50%"
          left={{ base: '50%', md: '8%' }}
          transform={{ base: 'translate(-50%, -50%)', md: 'translateY(-50%)' }}
          color="white"
          textAlign={{ base: 'center', md: 'left' }}
          align={{ base: 'center', md: 'flex-start' }}
          spacing={5}
          px={{ base: 4, md: 0 }}
          zIndex={10}
          maxW={{ base: '92%', md: '680px' }}
        >
          <Text
            color="accent.100"
            fontSize="xs"
            fontWeight="900"
            letterSpacing="0.26em"
            textTransform="uppercase"
          >
            Engineering Surveyors
          </Text>
          <Heading
            fontSize={{ base: '4xl', sm: '5xl', md: '7xl' }}
            fontWeight="900"
            lineHeight="0.95"
            letterSpacing="-0.07em"
          >
            Precision that keeps complex sites moving.
          </Heading>
          <Text
            fontSize={{ base: 'md', md: 'xl' }}
            lineHeight="1.7"
            color="whiteAlpha.800"
            maxW="610px"
          >
            Site engineering, setting out, monitoring, and measured surveys for structural steel, rail, refurbishment, and high-rise construction.
          </Text>
          <HStack spacing={3} pt={2} flexWrap="wrap" justify={{ base: 'center', md: 'flex-start' }}>
            <ScrollLink to="projects" smooth duration={500} offset={-90}>
              <Button
                size={{ base: 'md', md: 'lg' }}
                bg="accent.100"
                color="brand.900"
                px={7}
                boxShadow="0 12px 34px rgba(233, 185, 73, 0.28)"
                _hover={{ bg: 'accent.200', transform: 'translateY(-2px)' }}
              >
                View Projects
              </Button>
            </ScrollLink>
            <ScrollLink to="contact-form" smooth duration={500} offset={-90}>
              <Button
                size={{ base: 'md', md: 'lg' }}
                variant="outline"
                borderColor="whiteAlpha.600"
                color="white"
                px={7}
                _hover={{ bg: 'whiteAlpha.200', borderColor: 'white' }}
              >
                Request a Quote
              </Button>
            </ScrollLink>
          </HStack>
          <SimpleGrid columns={3} spacing={{ base: 3, md: 6 }} pt={{ base: 4, md: 8 }} w="100%" maxW="560px">
            {[
              ['15+', 'major project references'],
              ['24/7', 'site-responsive support'],
              ['3D', 'survey and as-built output'],
            ].map(([value, label]) => (
              <Box
                key={value}
                p={{ base: 3, md: 4 }}
                bg="rgba(255, 255, 255, 0.12)"
                border="1px solid"
                borderColor="rgba(255, 255, 255, 0.25)"
                borderRadius="xl"
              >
                <Text color="accent.100" fontSize={{ base: 'xl', md: '2xl' }} fontWeight="900">
                  {value}
                </Text>
                <Text color="whiteAlpha.700" fontSize="xs" textTransform="uppercase" letterSpacing="0.08em">
                  {label}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Box>
    </Box>
  );
};

export default CoverVideo;
