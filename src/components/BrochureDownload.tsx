// src/components/BrochureDownload.tsx

import React from 'react';
import { Box, Button, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';

const BrochureDownload: React.FC = () => {
  const brandColour = useColorModeValue('lightBrand.400', 'darkBrand.1000');

  return (
    <Box bg={brandColour} p={5} textAlign="center" borderRadius="md" shadow="md">
      <Heading as="h3" size="lg" mb={4} color="white">
        Download Our Brochure
      </Heading>
      <Text mb={6} color="white">
        Learn more about our services and expertise by downloading our brochure.
      </Text>
      <Button
        as="a"
        href="/PF_Geomatics_Brochure.pdf"
        target="_blank"
        colorScheme="teal"
        leftIcon={<DownloadIcon />}
      >
        Open Brochure
      </Button>
    </Box>
  );
};

export default BrochureDownload;
