// src/components/ChakraCarousel/CarouselCard.tsx

import { Box, Image, Heading, Center } from '@chakra-ui/react';
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
      {image?.imageUrl && (
        <Image
          src={image.imageUrl}
          alt={title}
          loading="lazy"
          objectFit="cover"
          w="100%"
          h="220px"
        />
      )}
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
