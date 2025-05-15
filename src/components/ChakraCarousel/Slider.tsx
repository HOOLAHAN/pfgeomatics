// src/components/ChakraCarousel/Slider.tsx

import React, { useLayoutEffect } from "react";
import { useBoundingRect } from "./hooks";
import {
  Box,
  Button,
  Flex,
  Progress,
  useMediaQuery,
  useTheme
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { percentage } from "../../utils";

interface SliderProps {
  setTrackIsActive: (active: boolean) => void;
  initSliderWidth: (width: number) => void;
  setActiveItem: (index: number) => void;
  activeItem: number;
  constraint: number;
  itemWidth: number;
  positions: number[];
  gap: number;
  children: React.ReactNode;
}

const Slider: React.FC<SliderProps> = ({
  setTrackIsActive,
  initSliderWidth,
  setActiveItem,
  activeItem,
  constraint,
  positions,
  children,
  gap
}) => {
  const [ref, bounds] = useBoundingRect();
  const width = bounds?.width ?? 0;
  const { breakpoints } = useTheme();
  const [isLessThanMd] = useMediaQuery(`(max-width: ${breakpoints.md})`);

  useLayoutEffect(() => {
    initSliderWidth(Math.round(width));
  }, [width, initSliderWidth]);

  const handleDecrementClick = () => {
    setTrackIsActive(true);
    if (activeItem > 0) setActiveItem(activeItem - 1);
  };

  const handleIncrementClick = () => {
    setTrackIsActive(true);
    if (activeItem < positions.length - constraint) setActiveItem(activeItem + 1);
  };

  return (
    <Box position="relative" w="100%">
      <Box ref={ref} maxW="1200px" mx="auto" overflow="hidden" px={`${gap / 2}px`}>
        {children}
      </Box>
      <Button
        onClick={handleDecrementClick}
        position="absolute"
        left={isLessThanMd ? "-20px" : "-50px"}
        top="45%"
        transform="translateY(-50%)"
        borderRadius="full"
        bg="white"
        border="1px solid gray.300"
        boxShadow="md"
        aria-label="Previous"
        _hover={{ bg: "gray.300" }}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        onClick={handleIncrementClick}
        position="absolute"
        right={isLessThanMd ? "-20px" : "-50px"}
        top="45%"
        transform="translateY(-50%)"
        borderRadius="full"
        bg="white"
        border="1px solid gray.300"
        boxShadow="md"
        aria-label="Next"
        _hover={{ bg: "gray.300" }}
      >
        <ChevronRightIcon />
      </Button>

      <Flex mt={`${gap / 2}px`} mx="auto">
        <Progress
          value={percentage(activeItem, positions.length - constraint)}
          flex={1}
          h="3px"
          bg="gray.100"
          sx={{ "> div": { backgroundColor: "gray.400" } }}
        />
      </Flex>
    </Box>
  );
};

export default Slider;
