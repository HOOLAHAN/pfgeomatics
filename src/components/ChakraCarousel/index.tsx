// src/components/ChakraCarousel/index.tsx

import { useState, useEffect, useMemo, useCallback } from "react";
import { useTheme, useMediaQuery } from "@chakra-ui/react";
import { isValidElement, cloneElement, ReactElement } from "react";
import Slider from "./Slider";
import Track from "./Track";

interface ChakraCarouselProps {
  children: React.ReactNode[];
  gap: number; // gap in pixels
}

const ChakraCarousel: React.FC<ChakraCarouselProps> = ({ children, gap }) => {
  const [trackIsActive, setTrackIsActive] = useState(false);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [activeItem, setActiveItem] = useState(0);
  const [constraint, setConstraint] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [itemWidth, setItemWidth] = useState(0);
  
  const initSliderWidth = useCallback((width: number) => {
    setSliderWidth(width);
  }, []);

  const positions = useMemo(
    () => children.map((_, index) => -Math.abs((itemWidth + gap) * index)),
    [children, itemWidth, gap]
  );

  const { breakpoints } = useTheme();
  const [isSm] = useMediaQuery(`(max-width: ${breakpoints.md})`);
  const [isMd] = useMediaQuery(`(min-width: ${breakpoints.md}) and (max-width: ${breakpoints.xl})`);
  const [isLg] = useMediaQuery(`(min-width: ${breakpoints.xl})`);



  useEffect(() => {
    if (sliderWidth === 0) return;

    if (isSm) setItemsPerView(1);
    else if (isMd) setItemsPerView(2);
    else setItemsPerView(3);
  }, [sliderWidth, isSm, isMd, isLg]);

  useEffect(() => {
    if (sliderWidth > 0 && itemsPerView > 0) {
      const totalGap = gap * (itemsPerView - 1);
      const availableWidth = sliderWidth - totalGap;
      const calculatedItemWidth = availableWidth / itemsPerView;
      setItemWidth(calculatedItemWidth);
      setConstraint(itemsPerView);
    }
  }, [sliderWidth, itemsPerView, gap]);

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
        multiplier={0.35}
        itemWidth={itemWidth}
        positions={positions}
        gap={gap}
        itemsPerView={itemsPerView}
      >
        {children.map((child, index) =>
          isValidElement(child)
            ? cloneElement(child as ReactElement<any>, {
                key: index,
              })
            : child
        )}
      </Track>
    </Slider>
  );
};

export default ChakraCarousel;
