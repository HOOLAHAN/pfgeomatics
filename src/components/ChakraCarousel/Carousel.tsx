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
  const [currentSlides, setCurrentSlides] = useState<number[]>([]);
  const brandBg = useToken('colors', 'brand.300');

  useEffect(() => {
    const extendedItems = [...(inputItems || []), ...(inputItems || [])];
    setItems(extendedItems);
    setCurrentSlides(Array.from({ length: repetitions }, (_, index) => index));
  }, [inputItems, repetitions]);

  const prevSlide = useCallback(() => {
    setCurrentSlides((prev) =>
      prev.map((val) => (val - 1 + items.length) % items.length)
    );
  }, [items.length]);

  const nextSlide = useCallback(() => {
    setCurrentSlides((prev) =>
      prev.map((val) => (val + 1) % items.length)
    );
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

  const carouselStyle = (index: number) => ({
    transition: 'all 1s ease-in-out',
    ml: `-${currentSlides[index]! * 100}%`,
    minWidth: `${items.length * 100}%`,
    display: 'flex',
  });

  return (
    <Box w="full" px={4} {...handlers}>
      <Flex justifyContent="center">
        {[...Array(repetitions)].map((_, index) => (
          <Flex
            key={`${id}-${index}`}
            overflowX="hidden"
            overflowY="visible"
            width="100%"
          >
            <Flex {...carouselStyle(index)}>
              {items.map((item, innerIndex) => {
                const req: CarouselItemProps = {
                  id,
                  index: innerIndex,
                  slides: items.length,
                  ...item,
                };
                return React.cloneElement(children, {
                  key: `${id}-${index}-${item.title}`,
                  ...req,
                });
              })}
            </Flex>
          </Flex>
        ))}
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
