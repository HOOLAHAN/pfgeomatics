// src/components/ChakraCarousel/Track.tsx

import React, { useEffect, useRef, useState } from "react";
import { VStack, Flex } from "@chakra-ui/react";
import { motion, useMotionValue, useAnimation } from "framer-motion";
import { PanInfo } from "framer-motion";

const MotionFlex = motion(Flex);

interface TrackProps {
  setTrackIsActive: (val: boolean) => void;
  trackIsActive: boolean;
  setActiveItem: (i: number) => void;
  sliderWidth: number;
  activeItem: number;
  constraint: number;
  multiplier: number;
  itemWidth: number;
  positions: number[];
  gap: number;
  children: React.ReactNode;
}

// Move this outside the component
const transitionProps = {
  stiffness: 400,
  type: "spring",
  damping: 60,
  mass: 3
};

const Track: React.FC<TrackProps> = ({
  setTrackIsActive,
  trackIsActive,
  setActiveItem,
  activeItem,
  constraint,
  multiplier,
  itemWidth,
  positions,
  children
}) => {
  const [dragStartPosition, setDragStartPosition] = useState(0);
  const controls = useAnimation();
  const x = useMotionValue(0);
  const node = useRef(null);

  const handleDragStart = () => {
    setDragStartPosition(positions[activeItem]);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const distance = info.offset.x;
    const velocity = info.velocity.x * multiplier;
    const direction = velocity < 0 || distance < 0 ? 1 : -1;
    const extrapolatedPosition =
      dragStartPosition +
      (direction === 1
        ? Math.min(velocity, distance)
        : Math.max(velocity, distance));

    const closestPosition = positions.reduce((prev, curr) =>
      Math.abs(curr - extrapolatedPosition) < Math.abs(prev - extrapolatedPosition)
        ? curr
        : prev
    );

    const index = Math.min(
      positions.length - constraint,
      Math.max(0, positions.indexOf(closestPosition))
    );

    setActiveItem(index);
    controls.start({ x: positions[index], transition: { velocity: info.velocity.x, ...transitionProps } });
  };

  useEffect(() => {
    controls.start({ x: positions[activeItem], transition: { ...transitionProps } });
  }, [positions, activeItem, controls]);

  return (
    <VStack ref={node} spacing={5} alignItems="stretch">
      <MotionFlex
        dragConstraints={node}
        drag="x"
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ x }}
        cursor="grab"
        minWidth="min-content"
        flexWrap="nowrap"
      >
        {children}
      </MotionFlex>
    </VStack>
  );
};

export default Track;
