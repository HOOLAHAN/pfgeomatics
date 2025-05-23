// src/components/layout/Navbar.tsx

import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Button,
  Image,
  Collapse,
  HStack,
  SimpleGrid,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-scroll';

const navLinks = [
  { label: 'About', to: 'about' },
  { label: 'Services', to: 'services' },
  { label: 'Projects', to: 'projects' },
  { label: 'Map', to: 'map' },
  { label: 'Clients', to: 'clients' },
  { label: 'Contact', to: 'contact-form' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);
  const [isTiny, setIsTiny] = useState(false);

  const brandBg = 'brand.600';
  const brandText = 'brand.50';

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 1100);
      setIsNarrow(width >= 1100 && width < 1450);
      setIsTiny(width < 500);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const buttonStyles = {
    variant: 'ghost',
    size: isNarrow ? 'sm' : 'md',
    fontWeight: 500,
    fontSize: isNarrow ? 'sm' : 'md',
    color: brandText,
    px: isNarrow ? 2 : 4,
    _hover: { bg: 'brand.50', color: 'brand.600' },
    _active: { bg: 'brand.50', transform: 'scale(0.95)' },
  };

  const offset = isMobile ? -250 : -80;

  return (
    <Box
      bg={brandBg}
      px={5}
      py={2}
      position="sticky"
      top={0}
      zIndex={11}
      w="100%"
      boxShadow="lg"
    >
      <Flex align="center" justify="space-between" position="relative">
        {/* Logo now links to Home */}
        <Link to="cover-video" smooth duration={500} offset={offset}>
          <Box
            bg="brand.100"
            borderRadius="md"
            p={1}
            zIndex={1}
            cursor="pointer"
          >
            <Image
              src="/PFG_LOGO_B4.png"
              alt="PF Geomatics"
              h={isTiny ? '28px' : isNarrow ? '32px' : '40px'}
              transition="all 0.2s ease"
            />
          </Box>
        </Link>

        {/* Centered Nav Links (desktop) */}
        {!isMobile && (
          <HStack
            spacing={4}
            position="absolute"
            left="50%"
            transform="translateX(-50%)"
            zIndex={0}
          >
            {navLinks.map(({ label, to }) => (
              <Link key={to} to={to} smooth duration={500} offset={offset}>
                <Button {...buttonStyles}>{label}</Button>
              </Link>
            ))}
          </HStack>
        )}

        {/* Right-side controls */}
        <HStack spacing={2}>
          {isMobile && (
            <IconButton
              onClick={toggleMenu}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              variant="ghost"
              aria-label="Toggle Navigation"
              color="white"
            />
          )}
        </HStack>
      </Flex>

      {/* Mobile menu */}
      {isMobile && (
        <Collapse in={isOpen} animateOpacity>
          <SimpleGrid columns={2} spacing={3} mt={3} px={4}>
            {navLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                smooth
                duration={500}
                offset={offset}
                onClick={toggleMenu}
              >
                <Button {...buttonStyles} w="100%">
                  {label}
                </Button>
              </Link>
            ))}
          </SimpleGrid>
        </Collapse>
      )}
    </Box>
  );
};

export default Navbar;
