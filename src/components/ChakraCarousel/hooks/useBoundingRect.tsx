// src/components/ChakraCarousel/hooks/useBoundingRect.tsx

import { useState, useCallback, useLayoutEffect, RefCallback } from "react";

type Bounds = {
  width: number;
  height: number;
  top: number;
  left: number;
  x: number;
  y: number;
  right: number;
  bottom: number;
};

const debounce = (limit: number, callback: () => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, limit);
  };
};

function getDimensionObject(node: HTMLElement): Bounds {
  const rect = node.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    left: rect.left,
    x: rect.x,
    y: rect.y,
    right: rect.right,
    bottom: rect.bottom,
  };
}

export default function useBoundingRect(
  limit = 100
): [RefCallback<HTMLElement>, Bounds | null, HTMLElement | null] {
  const [dimensions, setDimensions] = useState<Bounds | null>(null);
  const [node, setNode] = useState<HTMLElement | null>(null);

  const ref: RefCallback<HTMLElement> = useCallback((node) => {
    if (node) setNode(node);
  }, []);

  useLayoutEffect(() => {
    if (typeof window !== "undefined" && node) {
      const measure = () =>
        window.requestAnimationFrame(() =>
          setDimensions(getDimensionObject(node))
        );

      measure();

      const listener = debounce(limit, measure);
      window.addEventListener("resize", listener);
      window.addEventListener("scroll", listener);

      return () => {
        window.removeEventListener("resize", listener);
        window.removeEventListener("scroll", listener);
      };
    }
  }, [node, limit]);

  return [ref, dimensions, node];
}
