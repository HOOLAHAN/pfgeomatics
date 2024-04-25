// src/components/Navbar.js

import { Box, Flex, Spacer, useColorModeValue } from '@chakra-ui/react';
import { ColorModeSwitcher } from "../ColorModeSwitcher"

const Navbar = () => {
  const brandColour = useColorModeValue('lightBrand.400', 'darkBrand.400');

  return (
    <Box 
      px={5} 
      py={2} 
      boxShadow="sm" 
      bg={brandColour} 
      color="white"
      position="sticky"
      top={0}
      zIndex={1}
      width="100%"
      >
      <Flex align="center" justify="space-between">
        <Box fontWeight="bold" fontSize="lg">PF Geomatics</Box>
        <Spacer />
        <Flex align="center">
          <ColorModeSwitcher justifySelf="flex-end" />
        </Flex>
      </Flex>
    </Box>
  );
}

export default Navbar;
