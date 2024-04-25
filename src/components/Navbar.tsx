// src/components/Navbar.js

import { Box, Flex, Spacer } from '@chakra-ui/react';
import { ColorModeSwitcher } from "../ColorModeSwitcher"

const Navbar = () => {
  return (
    <Box px={5} py={4} boxShadow="sm" bg="brand.400" color="white">
      <Flex align="center" justify="space-between">
        <Box fontWeight="bold" fontSize="lg">PFGeomatics</Box>
        <Spacer />
        <Box>
          <ColorModeSwitcher justifySelf="flex-end" />
        </Box>
      </Flex>
    </Box>
  );
}

export default Navbar;
