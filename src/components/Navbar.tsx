// src/components/Navbar.tsx

import { useState } from 'react';
import { Box, Flex, IconButton, Image, Link as ChakraLink, useColorModeValue, useBreakpointValue, Stack, Collapse } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { Link } from 'react-scroll';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const brandColour = useColorModeValue('lightBrand.400', 'darkBrand.800');

  // Use Chakra UI's useBreakpointValue to handle responsive offsets
  const baseOffset = isOpen ? -256 : -56;
  const offset = useBreakpointValue({ base: baseOffset, md: -56 });

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <Box 
      px={5} 
      py={2} 
      boxShadow="sm" 
      bg={brandColour} 
      color="white"
      position="sticky"
      top={0}
      zIndex={11}
      width="100%"
      m={0}
    >
      <Flex align="center" justify="space-between" position="relative">
        <ColorModeSwitcher />
        <Box position="absolute" left="50%" transform="translateX(-50%)">
          <Image
            src="/logo.webp" 
            maxH={{ base: "40px", md: "40px" }}  
          />
        </Box>
        <Flex display={{ base: "none", md: "flex" }}>
          <Link to="cover-video" smooth={true} duration={500} offset={offset}>
            <ChakraLink px={2}>Home</ChakraLink>
          </Link>
          <Link to="projects" smooth={true} duration={500} offset={offset}>
            <ChakraLink px={2}>Projects</ChakraLink>
          </Link>
          <Link to="services" smooth={true} duration={500} offset={offset}>
            <ChakraLink px={2}>Services</ChakraLink>
          </Link>
          <Link to="contact" smooth={true} duration={500} offset={offset}>
            <ChakraLink px={2}>Contact</ChakraLink>
          </Link>
          <Link to="clients" smooth={true} duration={500} offset={offset}>
            <ChakraLink px={2}>Clients</ChakraLink>
          </Link>
        </Flex>
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={toggleMenu}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          variant="ghost"
          aria-label="Toggle Navigation"
          color="white"
        />
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            <Link to="cover-video" smooth={true} duration={500} offset={offset} onClick={toggleMenu}>
              <ChakraLink>Home</ChakraLink>
            </Link>
            <Link to="projects" smooth={true} duration={500} offset={offset} onClick={toggleMenu}>
              <ChakraLink>Projects</ChakraLink>
            </Link>
            <Link to="services" smooth={true} duration={500} offset={offset} onClick={toggleMenu}>
              <ChakraLink>Services</ChakraLink>
            </Link>
            <Link to="contact" smooth={true} duration={500} offset={offset} onClick={toggleMenu}>
              <ChakraLink>Contact</ChakraLink>
            </Link>
            <Link to="clients" smooth={true} duration={500} offset={offset} onClick={toggleMenu}>
              <ChakraLink>Clients</ChakraLink>
            </Link>
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
}

export default Navbar;
