// src/components/ChakraCarousel/index.tsx

import { useState, useEffect, useMemo, useCallback } from "react";
import { useMediaQuery, useTheme } from "@chakra-ui/react";
import Slider from "./Slider";
import Track from "./Track";
import Item from "./Item";

interface ChakraCarouselProps {
  children: React.ReactNode[];
  gap: number;
}

const ChakraCarousel: React.FC<ChakraCarouselProps> = ({ children, gap }) => {
  const [trackIsActive, setTrackIsActive] = useState(false);
  const [multiplier, setMultiplier] = useState(0.35);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [activeItem, setActiveItem] = useState(0);
  const [constraint, setConstraint] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);

  const initSliderWidth = useCallback((width: number) => setSliderWidth(width), []);

  const positions = useMemo(
    () => children.map((_, index) => -Math.abs((itemWidth + gap) * index)),
    [children, itemWidth, gap]
  );

  const { breakpoints } = useTheme();
  const [isLessThanMd] = useMediaQuery(`(max-width: ${breakpoints.md})`);
  const [isBetweenMdAndXl] = useMediaQuery(`(min-width: ${breakpoints.md}) and (max-width: ${breakpoints.xl})`);
  const [isGreaterThanXL] = useMediaQuery(`(min-width: ${breakpoints.xl})`);

  useEffect(() => {
    if (isLessThanMd) {
      setItemWidth(sliderWidth - gap);
      setMultiplier(0.65);
      setConstraint(1);
    } else if (isBetweenMdAndXl) {
      setItemWidth(sliderWidth / 2 - gap);
      setMultiplier(0.5);
      setConstraint(2);
    } else if (isGreaterThanXL) {
      setItemWidth(sliderWidth / 3 - gap);
      setMultiplier(0.35);
      setConstraint(3);
    }
  }, [isLessThanMd, isBetweenMdAndXl, isGreaterThanXL, sliderWidth, gap]);

  return (
    <Slider
      setTrackIsActive={setTrackIsActive}
      initSliderWidth={initSliderWidth}
      setActiveItem={setActiveItem}
      activeItem={activeItem}
      constraint={constraint}
      itemWidth={itemWidth}
      positions={positions}
      gap={gap}
    >
      <Track
        setTrackIsActive={setTrackIsActive}
        trackIsActive={trackIsActive}
        setActiveItem={setActiveItem}
        sliderWidth={sliderWidth}
        activeItem={activeItem}
        constraint={constraint}
        multiplier={multiplier}
        itemWidth={itemWidth}
        positions={positions}
        gap={gap}
      >
        {children.map((child, index) => (
          <Item
            key={index}
            setTrackIsActive={setTrackIsActive}
            setActiveItem={setActiveItem}
            activeItem={activeItem}
            constraint={constraint}
            itemWidth={itemWidth}
            positions={positions}
            index={index}
            gap={gap}
          >
            {child}
          </Item>
        ))}
      </Track>
    </Slider>
  );
};

export default ChakraCarousel;
