import {
  Box,
  Center,
  Flex,
  useToken,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

export enum Direction {
  LEFT,
  RIGHT,
}

export interface CarouselImage {
  imageUrl: string;
}

export interface CarouselLink {
  title: string;
  imageUrl: string;
  path: string;
}

export interface CarouselItem {
  title: string;
  description: string;
  image: CarouselImage;
  link: CarouselLink;
  onClick: () => void;
}

export interface CarouselProps {
  id: string;
  interval: number;
  direction: Direction;
  repetitions: number;
  items?: Partial<CarouselItem>[];
  children: JSX.Element;
}

export interface CarouselItemProps extends Partial<CarouselItem> {
  id: string;
  index: number;
  slides: number;
}

export const Carousel = ({
  id,
  interval,
  direction,
  repetitions,
  items: inputItems,
  children,
}: CarouselProps) => {
  const [items, setItems] = useState<Partial<CarouselItem>[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const brandBg = useToken('colors', 'brand.300');

  useEffect(() => {
    setItems(inputItems || []);
    setCurrentIndex(0);
  }, [inputItems]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
  });

  useEffect(() => {
    const autoSlide = setInterval(() => {
      direction === Direction.LEFT ? prevSlide() : nextSlide();
    }, interval);
    return () => clearInterval(autoSlide);
  }, [direction, interval, nextSlide, prevSlide]);

  return (
    <Box w="full" px={4} {...handlers}>
      <Flex overflow="hidden" width="100%">
        <Flex
          width={`${items.length * 100}%`}
          transform={`translateX(-${(100 / items.length) * currentIndex}%)`}
          transition="transform 0.5s ease"
        >
          {items.map((item, index) => {
            const props: CarouselItemProps = {
              id,
              index,
              slides: items.length,
              ...item,
            };
            return (
              <Box key={`${id}-${index}`} width={`${100 / items.length}%`}>
                {React.cloneElement(children, props)}
              </Box>
            );
          })}
        </Flex>
      </Flex>

      {/* Arrows below carousel */}
      <Box mt={4}>
        <Center>
          <Box display="flex" gap={4}>
            <Box
              as="button"
              onClick={prevSlide}
              p={2}
              px={4}
              fontSize="24px"
              color="white"
              bg={brandBg}
              borderRadius="full"
              _hover={{ bg: 'brand.200' }}
              _active={{ bg: 'brand.100', transform: 'scale(0.95)' }}
              aria-label="Previous slide"
            >
              &#10094;
            </Box>
            <Box
              as="button"
              onClick={nextSlide}
              p={2}
              px={4}
              fontSize="24px"
              color="white"
              bg={brandBg}
              borderRadius="full"
              _hover={{ bg: 'brand.200' }}
              _active={{ bg: 'brand.100', transform: 'scale(0.95)' }}
              aria-label="Next slide"
            >
              &#10095;
            </Box>
          </Box>
        </Center>
      </Box>
    </Box>
  );
};
