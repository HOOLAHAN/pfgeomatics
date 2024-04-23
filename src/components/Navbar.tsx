// src/components/Navbar.js
import React from 'react';
import { Box, Flex, Link, Spacer } from '@chakra-ui/react';
import { ColorModeSwitcher } from "../ColorModeSwitcher"

const Navbar = () => {
  return (
    <Box px={5} py={4} boxShadow="sm" bg="blue.500" color="white">
      <Flex align="center" justify="space-between">
        <Box fontWeight="bold" fontSize="lg">PFGeomatics</Box>
        <Spacer />
        <Box>
          <Link href="#home" px={3}>Home</Link>
          <Link href="#about" px={3}>About</Link>
          <Link href="#projects" px={3}>Projects</Link>
          <Link href="#services" px={3}>Services</Link>
          <Link href="#contact" px={3}>Contact</Link>
          <Link href="#clients" px={3}>Clients</Link>
          <ColorModeSwitcher justifySelf="flex-end" />
        </Box>
      </Flex>
    </Box>
  );
}

export default Navbar;
