// src/components/ChakraCarousel/CarouselCard.tsx

import { Box, Image, Heading, Center } from '@chakra-ui/react';
import { CarouselItemProps } from './Carousel';

const CarouselCard: React.FC<CarouselItemProps> = ({
  title,
  image,
  onClick,
}) => (
  <Box
    minW="300px"
    maxW="300px"
    mx="2"
    my="4"
    cursor="pointer"
    onClick={onClick}
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
        <Heading size="md" color="brand.800">
          {title}
        </Heading>
      </Center>
    </Box>
  </Box>
);

export default CarouselCard;
