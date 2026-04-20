// src/components/BrochureDownload.tsx

import React from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  HStack,
} from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';

const BrochureDownload: React.FC = () => {
  return (
    <Box px={{ base: 4, md: 8 }}>
      <HStack
        maxW="1120px"
        mx="auto"
        p={{ base: 7, md: 10 }}
        textAlign={{ base: 'center', md: 'left' }}
        bg="brand.900"
        color="white"
        boxShadow="0 24px 80px rgba(6, 24, 36, 0.20)"
        borderRadius="32px"
        border="1px solid"
        borderColor="whiteAlpha.200"
        justify="space-between"
        align={{ base: 'center', md: 'center' }}
        flexDirection={{ base: 'column', md: 'row' }}
        spacing={6}
      >
        <Box>
          <Text color="accent.100" fontSize="xs" fontWeight="900" letterSpacing="0.2em" textTransform="uppercase" mb={2}>
            Capability Overview
          </Text>
          <Heading as="h3" size="lg" mb={3} color="white" letterSpacing="-0.04em">
            Download the PF Geomatics brochure.
          </Heading>
          <Text color="whiteAlpha.700" maxW="620px">
            A concise overview of our survey services, project experience, and construction support capability.
          </Text>
        </Box>
      <Button
        as="a"
        href="/PF_Geomatics_Brochure.pdf"
        target="_blank"
        leftIcon={<DownloadIcon />}
        size="lg"
        color="brand.900"
        bg="accent.100"
        _hover={{ bg: 'accent.200', transform: 'translateY(-2px)' }}
        _active={{ transform: 'scale(0.97)' }}
        transition="all 0.2s ease"
      >
        Open Brochure
      </Button>
      </HStack>
    </Box>
  );
};

export default BrochureDownload;
