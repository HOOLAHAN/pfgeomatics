// src/components/ChakraCarousel/CarouselCard.tsx

import { Box, Image, Heading, Center, Text } from '@chakra-ui/react';
import { CarouselItemProps } from './Carousel';

interface ProjectCardProps extends CarouselItemProps {
  isMobile?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  image,
  onClick,
  isMobile = false,
}) => (
  <Box
    cursor="pointer"
    onClick={onClick}
    w="100%"
    minW={isMobile ? undefined : '300px'}
    maxW={isMobile ? '360px' : '300px'}
    mx={isMobile ? 'auto' : 2}
    my={4}
    role="group"
  >
    <Box
      borderRadius="28px"
      overflow="hidden"
      transition="all 0.3s ease"
      bg="white"
      border="1px solid"
      borderColor="blackAlpha.100"
      boxShadow="0 18px 55px rgba(6, 24, 36, 0.12)"
      _groupHover={{ transform: 'translateY(-8px)', boxShadow: '0 26px 70px rgba(6, 24, 36, 0.18)' }}
    >
      <Box position="relative" overflow="hidden">
        {image?.imageUrl && (
          <Image
            src={image.imageUrl}
            alt={title}
            loading="lazy"
            objectFit="cover"
            w="100%"
            h="220px"
            transition="transform 0.35s ease"
            _groupHover={{ transform: 'scale(1.06)' }}
          />
        )}
        <Box
          position="absolute"
          inset={0}
          bgGradient="linear(to-t, rgba(6,24,36,0.88), rgba(6,24,36,0.08))"
          opacity={{ base: 1, md: 0 }}
          transition="opacity 0.25s ease"
          _groupHover={{ opacity: 1 }}
        />
        <Text
          position="absolute"
          left={5}
          right={5}
          bottom={5}
          color="white"
          fontWeight="900"
          fontSize="lg"
          lineHeight="1.1"
          letterSpacing="-0.04em"
          opacity={{ base: 1, md: 0 }}
          transform={{ base: 'translateY(0)', md: 'translateY(10px)' }}
          transition="all 0.25s ease"
          _groupHover={{ opacity: 1, transform: 'translateY(0)' }}
        >
          {title}
        </Text>
      </Box>
      <Box h="4px" bgGradient="linear(to-r, accent.100, brand.500)" />
    </Box>
    <Box mt={3}>
      <Center>
        <Heading size="md" color="brand.900" textAlign="center" letterSpacing="-0.03em">
          {title}
        </Heading>
      </Center>
    </Box>
  </Box>
);

export default ProjectCard;
