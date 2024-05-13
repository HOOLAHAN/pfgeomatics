// src/components/Navbar.tsx

import { Box, Flex, Image, useColorModeValue, Link as ChakraLink, useBreakpointValue } from '@chakra-ui/react';
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { Link } from 'react-scroll';

const Navbar: React.FC = () => {
  const brandColour = useColorModeValue('lightBrand.400', 'darkBrand.800');

  // Use Chakra UI's useBreakpointValue to handle responsive offsets
  const offset = useBreakpointValue({ base: -56, md: -76 });

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
      <Flex align="center" justify="space-between">
        <Image
          src="/logo.webp" 
          maxH={{ base: "40px", md: "60px" }}  
          marginRight="2" 
        />
        <Flex>
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
        <ColorModeSwitcher justifySelf="flex-end" />
      </Flex>
    </Box>
  );
}

export default Navbar;
