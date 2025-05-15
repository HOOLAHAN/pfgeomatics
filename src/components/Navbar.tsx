// src/components/Navbar.tsx

import { useState } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Button,
  Image,
  Collapse,
  useBreakpointValue,
  HStack,
  VStack
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-scroll';

const navLinks = [
  { label: 'Home', to: 'cover-video' },
  { label: 'About', to: 'about' },
  { label: 'Projects', to: 'projects' },
  { label: 'Map', to: 'map' },
  { label: 'Services', to: 'services' },
  { label: 'Clients', to: 'clients' },
  { label: 'Contact', to: 'contact-form' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const brandColour = 'brand.100';
  const offset = useBreakpointValue({ base: -224, md: -56 });

  const toggleMenu = () => setIsOpen(!isOpen);

  const buttonStyles = {
    variant: "ghost",
    size: "sm",
    fontWeight: 500,
    _hover: { bg: "brand.200", color: "gray.800" },
    _active: { bg: "brand.300" },
  };

  return (
    <Box
      bg={brandColour}
      borderBottom="1px solid"
      borderColor="gray.200"
      px={5}
      py={2}
      position="sticky"
      top={0}
      zIndex={11}
      w="100%"
    >
      <Flex align="center" justify="space-between">
        {/* Logo */}
        <Image src="/PFG_LOGO_B3.png" alt="PF Geomatics" h="40px" />

        {/* Desktop Nav */}
        <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
          {navLinks.map(({ label, to }) => (
            <Link key={to} to={to} smooth duration={500} offset={offset || -56}>
              <Button {...buttonStyles}>{label}</Button>
            </Link>
          ))}
        </HStack>

        {/* Hamburger Icon */}
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={toggleMenu}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          variant="ghost"
          aria-label="Toggle Navigation"
        />
      </Flex>

      {/* Mobile Menu */}
      <Collapse in={isOpen} animateOpacity>
        <VStack
          spacing={3}
          mt={3}
          align="start"
          display={{ md: 'none' }}
        >
          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              smooth
              duration={500}
              offset={offset || -224}
              onClick={toggleMenu}
            >
              <Button {...buttonStyles} w="100%">
                {label}
              </Button>
            </Link>
          ))}
        </VStack>
      </Collapse>
    </Box>
  );
};

export default Navbar;
