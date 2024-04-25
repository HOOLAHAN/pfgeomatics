// src/components/Navbar.js

import { useState } from 'react';
import { Box, Flex, Spacer, Button } from '@chakra-ui/react';
import { ColorModeSwitcher } from "../ColorModeSwitcher"
import AboutModal from './AboutModal';

const Navbar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <Box px={5} py={4} boxShadow="sm" bg="brand.400" color="white">
      <Flex align="center" justify="space-between">
        <Box fontWeight="bold" fontSize="lg">PF Geomatics</Box>
        <Spacer />
        <Flex align="center">
          <Button onClick={openModal} colorScheme="blue" mr={3}>About</Button>
          <ColorModeSwitcher justifySelf="flex-end" />
        </Flex>
      </Flex>
      <AboutModal isOpen={isModalOpen} onClose={closeModal} />
    </Box>
  );
}

export default Navbar;
