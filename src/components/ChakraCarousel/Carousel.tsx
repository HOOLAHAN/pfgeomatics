// src/components/ChakraCarousel/Carousel.tsx

import type { SystemStyleObject } from '@chakra-ui/react';
import {
  Flex,
  Text,
  useColorModeValue,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

export enum Direction {
  LEFT,
  RIGHT,
}

let arrowStyles: SystemStyleObject = {
  cursor: 'pointer',
  mt: '-22px',
  p: '6px',
  fontWeight: 'bold',
  fontSize: '18px',
  transition: '0.2s ease',
  borderRadius: '3px',
  _hover: {
    opacity: 0.8,
    bg: 'black',
  },
};

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

const CARD_WIDTH = 300;

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
  const carouselStyles: Record<string, SystemStyleObject> =
    useMultiStyleConfig('Carousel');
  arrowStyles = { ...arrowStyles, ...carouselStyles.arrows };
  const arrowColor = useColorModeValue('black', 'white');

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

  const carouselStyle = (index: number) => {
    return {
      transition: 'all 1s ease-in-out',
      ml: `-${currentSlides[index]! * CARD_WIDTH}px`,
    };
  };

  const getArrowStyles = (arrowDirection: Direction) => {
    let { borderRadius } = arrowStyles;
    return {
      ...arrowStyles,
      borderRadius:
        arrowDirection === Direction.LEFT
          ? `${borderRadius} 0 0 ${borderRadius}`
          : `0 ${borderRadius} ${borderRadius} 0`,
    };
  };

  return (
    <Flex w="full" p={4} alignItems="center" justifyContent="center" {...handlers}>
      <Text
        pos="relative"
        userSelect="none"
        sx={getArrowStyles(Direction.LEFT)}
        color={arrowColor}
        left="0"
        onMouseDown={prevSlide}
      >
        &#10094;
      </Text>
        {[...Array(repetitions)].map((_, index) => (
          <Flex key={`${id}-${index}`} overflowX="hidden" overflowY="visible">
            <Flex pos="relative" w="full" {...carouselStyle(index)}>
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
      <Text
        pos="relative"
        userSelect="none"
        sx={getArrowStyles(Direction.RIGHT)}
        right="0"
        onMouseDown={nextSlide}
      >
        &#10095;
      </Text>
    </Flex>
  );
};
