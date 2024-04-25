// src/components/Navbar.js

import { Box, Flex, Spacer } from '@chakra-ui/react';
import { ColorModeSwitcher } from "../ColorModeSwitcher"

const Navbar = () => {

  return (
    <Box px={5} py={4} boxShadow="sm" bg="brand.400" color="white">
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
