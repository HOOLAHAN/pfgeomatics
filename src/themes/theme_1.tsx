// src/theme/theme1.tsx
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const theme_1 = extendTheme({
  config,
  colors: {
    brand: {
      50: "#f8f7f3",  // soft background
      100: "#d9d6ce", // warm neutral
      200: "#aaaaa0", // muted green-gray (logo tone)
      300: "#dbdcd6",
      400: "#7c7a6e", // mid tone
      500: "#727D71", // olive gray (logo tone)
      600: "#545145", // charcoal olive (logo base)
      800: "#3b3933", // deep neutral
    },
    gray: {
      50: "#fafafa",
      100: "#f0f0f0",
      200: "#d6d6d6",
      300: "#bcbcbc",
      400: "#a2a2a2",
      500: "#888888",
      600: "#6e6e6e",
      700: "#545454",
      800: "#3a3a3a",
      900: "#202020",
    },
  },
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, sans-serif",
    mono: "Menlo, monospace",
  },
  styles: {
    global: {
      body: {
        bgImage: "url('/background_theme_1.svg')",
        bgSize: "cover",
        bgRepeat: "no-repeat",
        bgPosition: "center",
      },
    },
  },
});

export default theme_1;
