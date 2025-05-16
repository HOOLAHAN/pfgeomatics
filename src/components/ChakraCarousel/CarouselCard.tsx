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
  >
    <Box
      borderRadius="md"
      overflow="hidden"
      transition="all 0.3s ease"
      _hover={{ transform: 'scale(1.03)', boxShadow: 'lg' }}
    >
      {image?.imageUrl && (
        <Image
          src={image.imageUrl}
          alt={title}
          objectFit="cover"
          w="100%"
          h="200px"
          borderRadius="md"
          boxShadow="md"
        />
      )}
    </Box>
    <Box mt={3}>
      <Center>
        <Heading size="md" color="brand.800" textAlign="center">
          {title}
        </Heading>
      </Center>
    </Box>
  </Box>
);

export default ProjectCard;
