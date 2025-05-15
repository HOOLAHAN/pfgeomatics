// src/components/ChakraCarousel/Item.tsx

import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";

interface ItemProps {
  setTrackIsActive: (active: boolean) => void;
  setActiveItem: (index: number) => void;
  activeItem: number;
  constraint: number;
  itemWidth: number;
  positions: number[];
  index: number;
  gap: number;
  children: React.ReactNode;
}

const Item: React.FC<ItemProps> = ({
  setTrackIsActive,
  setActiveItem,
  activeItem,
  constraint,
  itemWidth,
  positions,
  index,
  gap,
  children
}) => {
  const [userDidTab, setUserDidTab] = useState(false);

  const handleFocus = () => setTrackIsActive(true);
  const handleBlur = () => {
    if (userDidTab && index + 1 === positions.length) {
      setTrackIsActive(false);
    }
    setUserDidTab(false);
  };
  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Tab" && activeItem !== positions.length - constraint) {
      setActiveItem(index);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      setUserDidTab(true);
    }
  };

  return (
    <Flex
      w={`${itemWidth}px`}
      mr={index !== positions.length - 1 ? `${gap}px` : 0}
      py="4px"
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyUp={handleKeyUp}
      onKeyDown={handleKeyDown}
    >
      {children}
    </Flex>
  );
};

export default Item;
