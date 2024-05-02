// src/components/Navbar.js

import { Box, Flex, Image, useColorModeValue } from '@chakra-ui/react';
import { ColorModeSwitcher } from "../ColorModeSwitcher";

const Navbar = () => {
  const brandColour = useColorModeValue('lightBrand.400', 'darkBrand.800');

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
        <ColorModeSwitcher justifySelf="flex-end" />
      </Flex>
    </Box>
  );
}

export default Navbar;
