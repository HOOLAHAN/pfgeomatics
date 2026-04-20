// src/components/layout/Navbar.tsx

import { useState } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Button,
  Image,
  Collapse,
  HStack,
  SimpleGrid,
  useBreakpointValue,
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
  const isMobile = useBreakpointValue({ base: true, xl: false }) ?? true;
  const isNarrow = useBreakpointValue({ base: false, xl: true, '2xl': false }) ?? false;
  const logoHeight = useBreakpointValue({ base: '28px', sm: '40px', xl: isNarrow ? '32px' : '40px' });

  const toggleMenu = () => setIsOpen(!isOpen);

  const buttonStyles = {
    variant: 'ghost',
    size: isNarrow ? 'sm' : 'md',
    fontWeight: 800,
    fontSize: isNarrow ? 'xs' : 'sm',
    color: 'whiteAlpha.900',
    px: isNarrow ? 2 : 4,
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    _hover: { bg: 'whiteAlpha.200', color: 'accent.100' },
    _active: { bg: 'whiteAlpha.200', transform: 'scale(0.97)' },
  };

  const offset = isMobile ? -180 : -88;

  return (
    <Box
      bg="rgba(6, 24, 36, 0.92)"
      backdropFilter="blur(18px)"
      borderBottom="1px solid"
      borderColor="whiteAlpha.200"
      px={{ base: 4, md: 8 }}
      py={3}
      position="sticky"
      top={0}
      zIndex={11}
      w="100%"
      boxShadow="0 18px 60px rgba(6, 24, 36, 0.22)"
    >
      <Flex align="center" justify="space-between" position="relative">
        {/* Logo now links to Home */}
        <Link to="cover-video" smooth duration={500} offset={offset}>
          <Box
            bg="white"
            borderRadius="xl"
            p={1.5}
            zIndex={1}
            cursor="pointer"
            boxShadow="0 10px 30px rgba(0, 0, 0, 0.18)"
          >
            <Image
              src="/PFG_LOGO_B4.png"
              alt="PF Geomatics"
              h={logoHeight}
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
              _hover={{ bg: 'whiteAlpha.200' }}
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
