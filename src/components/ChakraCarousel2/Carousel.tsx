// src/components/ChakraCarousel2/Carousel.tsx

import type { SystemStyleObject } from '@chakra-ui/react';
import {
  Flex,
  Text,
  useColorModeValue,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { SwipeEventData, useSwipeable } from 'react-swipeable';

export enum Direction {
  LEFT,
  RIGHT,
}

let arrowStyles: SystemStyleObject = {
  cursor: 'pointer',
  mt: '-22px',
  p: '16px',
  fontWeight: 'bold',
  fontSize: '18px',
  transition: '0.6s ease',
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
    setItems(inputItems || []);
    setCurrentSlides(Array.from({ length: repetitions }, (_, index) => index));
  }, [inputItems, repetitions]);

  const prevSlide = useCallback(() => {
    const slides: number[] = currentSlides.map((value) => {
      return value === 0 ? items.length - 1 : value - 1;
    });
    setCurrentSlides(slides);
  }, [currentSlides, items.length]);

  const nextSlide = useCallback(() => {
    const slides: number[] = currentSlides.map((value) => {
      return value === items.length - 1 ? 0 : value + 1;
    });
    setCurrentSlides(slides);
  }, [currentSlides, items.length]);

  const handlers = useSwipeable({
    onSwipedLeft: (eventData: SwipeEventData) => nextSlide(),
    onSwipedRight: (eventData: SwipeEventData) => prevSlide(),
  });

  useEffect(() => {
    const automatedSlide = setInterval(() => {
      if (direction === Direction.LEFT) {
        prevSlide();
      } else if (direction === Direction.RIGHT) {
        nextSlide();
      }
    }, interval);

    return () => clearInterval(automatedSlide);
  }, [currentSlides, direction, interval, nextSlide, prevSlide]);

  const carouselStyle = (index: number) => {
    return {
      transition: 'all 1s ease-in-out',
      ml: `-${currentSlides[index]! * 100}%`,
    };
  };

  const getArrowStyles = (arrowDirection: Direction) => {
    let { borderRadius } = arrowStyles;
    if (arrowDirection === Direction.LEFT)
      borderRadius = `${borderRadius} 0 0 ${borderRadius}`;
    else if (arrowDirection === Direction.RIGHT)
      borderRadius = `0 ${borderRadius} ${borderRadius} 0`;
    return { ...arrowStyles, borderRadius };
  };

  return (
    <Flex w="full" p={4} alignItems="center" justifyContent="center" { ...handlers }>
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
      {[...Array(repetitions)].map((repetition, index) => (
        <Flex key={`${id}-${repetition}`} overflow="hidden">
          <Flex pos="relative" w="full" {...carouselStyle(index)}>
            {items.map((item, innerIndex) => {
              const req: CarouselItemProps = {
                id,
                index: innerIndex,
                slides: items.length,
                ...item,
              };
              return React.cloneElement(children, {
                key: `${id}-${repetition}-${item.title}`,

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