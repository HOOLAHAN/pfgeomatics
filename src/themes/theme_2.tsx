// src/theme/theme_2.ts

import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const theme_2 = extendTheme({
  config,
  colors: {
    brand: {
      50: "#fefefe",      // white variant
      100: "#ffefd6",     // pale warm tone
      200: "#ffb100",     // golden accent
      300: "#ffd280",     // lighter gold
      400: "#c88e00",     // darker gold
      500: "#015e7b",     // deep blue-green
      600: "#01475e",     // darker teal
      700: "#42373a",     // deep brown
      800: "#2e2628",     // near-black brown
    },
    gray: {
      50: "#f9f9f9",
      100: "#e5e5e5",
      200: "#cfcfcf",
      300: "#b1b1b1",
      400: "#949494",
      500: "#7a7a7a",
      600: "#5f5f5f",
      700: "#444444",
      800: "#2b2b2b",
      900: "#1a1a1a",
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
        bgImage: "url('/background_theme_2.svg')",
        bgSize: "cover",
        bgRepeat: "no-repeat",
        bgPosition: "center",
      },
    },
  },
});

export default theme_2;
