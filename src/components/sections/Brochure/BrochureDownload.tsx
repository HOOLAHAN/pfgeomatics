// src/components/BrochureDownload.tsx

import React from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  useToken,
} from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';

const BrochureDownload: React.FC = () => {
  const brandBg = useToken("colors", "brand.600");
  const brandText = useToken("colors", "brand.50");
  const buttonBackgroundColor = useToken("colors", "brand.50");
  const buttonBorderColor = useToken("colors", "brand.600");
  const buttonTextColor = useToken("colors", "brand.800");
  const buttonHoverBg = useToken("colors", "brand.300");

  return (
    <Box p={5} textAlign="center" bg={brandBg} boxShadow="md">
      <Heading as="h3" size="lg" mb={4} color={brandText}>
        Download Our Brochure
      </Heading>
      <Text mb={6} color={brandText}>
        Learn more about our services and expertise by downloading our brochure.
      </Text>
      <Button
        as="a"
        href="/PF_Geomatics_Brochure.pdf"
        target="_blank"
        leftIcon={<DownloadIcon />}
        size="lg"
        variant="outline"
        borderColor={buttonBorderColor}
        color={buttonTextColor}
        bg={buttonBackgroundColor}
        _hover={{ bg: buttonHoverBg }}
        _active={{ transform: 'scale(0.97)' }}
        transition="all 0.2s ease"
      >
        Open Brochure
      </Button>
    </Box>
  );
};

export default BrochureDownload;
