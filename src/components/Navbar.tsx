// src/components/Navbar.tsx

import { useState } from 'react';
import { Box, Flex, IconButton, useColorModeValue, useBreakpointValue, Stack, Collapse, Text } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { Link } from 'react-scroll';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const brandColour = useColorModeValue('lightBrand.400', 'darkBrand.1000');

  // Use Chakra UI's useBreakpointValue to handle responsive offsets
  const baseOffset = isOpen ? -296 : -56;
  const offset = useBreakpointValue({ base: baseOffset, md: -56 });

  const toggleMenu = () => setIsOpen(!isOpen);

  const linkStyles = {
    px: 2,
    cursor: 'pointer',
    _hover: { textDecoration: 'underline', color: 'gray.300' },
    _active: { color: 'gray.500' }
  };

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
        <Flex display={{ base: "none", md: "flex" }}>
          <Link to="cover-video" smooth={true} duration={500} offset={offset}>
            <Text as="span" {...linkStyles}>Home</Text>
          </Link>
          <Link to="about" smooth={true} duration={500} offset={offset}>
            <Text as="span" {...linkStyles}>About</Text>
          </Link>
          <Link to="projects" smooth={true} duration={500} offset={offset}>
            <Text as="span" {...linkStyles}>Projects</Text>
          </Link>
          <Link to="map" smooth={true} duration={500} offset={offset}>
            <Text as="span" {...linkStyles}>Map</Text>
          </Link>
          <Link to="services" smooth={true} duration={500} offset={offset}>
            <Text as="span" {...linkStyles}>Services</Text>
          </Link>
          <Link to="clients" smooth={true} duration={500} offset={offset}>
            <Text as="span" {...linkStyles}>Clients</Text>
          </Link>
          <Link to="contact-form" smooth={true} duration={500} offset={offset}>
            <Text as="span" {...linkStyles}>Contact</Text>
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
              <Text as="span" {...linkStyles}>Home</Text>
            </Link>
            <Link to="about" smooth={true} duration={500} offset={offset} onClick={toggleMenu}>
              <Text as="span" {...linkStyles}>About</Text>
            </Link>
            <Link to="projects" smooth={true} duration={500} offset={offset} onClick={toggleMenu}>
              <Text as="span" {...linkStyles}>Projects</Text>
            </Link>
            <Link to="map" smooth={true} duration={500} offset={offset} onClick={toggleMenu}>
              <Text as="span" {...linkStyles}>Map</Text>
            </Link>
            <Link to="services" smooth={true} duration={500} offset={offset} onClick={toggleMenu}>
              <Text as="span" {...linkStyles}>Services</Text>
            </Link>
            <Link to="contact-form" smooth={true} duration={500} offset={offset} onClick={toggleMenu}>
              <Text as="span" {...linkStyles}>Contact</Text>
            </Link>
            <Link to="clients" smooth={true} duration={500} offset={offset} onClick={toggleMenu}>
              <Text as="span" {...linkStyles}>Clients</Text>
            </Link>
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
}

export default Navbar;
