// src/components/BrochureDownload.tsx

import React from 'react';
import { Box, Button, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';

const BrochureDownload: React.FC = () => {
  // const brandColour = 'brand.400';
  const buttonBorderColor = useColorModeValue('white', 'white');
  const buttonTextColor = useColorModeValue('white', 'white');
  const buttonHoverBg = useColorModeValue('whiteAlpha.300', 'whiteAlpha.300');

  return (
    <Box 
    // bg={brandColour} 
    p={5} textAlign="center" shadow="md">
      <Heading as="h3" size="lg" mb={4} 
      // color="white"
      >
        Download Our Brochure
      </Heading>
      <Text mb={6} 
      // color="white"
      >
        Learn more about our services and expertise by downloading our brochure.
      </Text>
      <Button
        as="a"
        href="/PF_Geomatics_Brochure.pdf"
        target="_blank"
        leftIcon={<DownloadIcon />}
        variant="outline"
        borderColor={buttonBorderColor}
        color={buttonTextColor}
        _hover={{ bg: buttonHoverBg }}
        _active={{ bg: buttonHoverBg, transform: 'scale(0.95)' }}
        transition="all 0.2s ease-in-out"
        size="md"
      >
        Open Brochure
      </Button>
    </Box>
  );
};

export default BrochureDownload;
