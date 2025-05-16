import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

export const theme_3 = extendTheme({
  config,
  colors: {
    brand: {
      50: '#f3faff',
      100: '#d4eafd',
      200: '#a4d3fa',
      300: '#73bcf7',
      400: '#42a5f5',
      500: '#1f88e0',       // Primary Blue
      600: '#176bb3',
      700: '#0f4f86',
      800: '#083359',
      900: '#02162e',       // Near-black blue
    },
    gray: {
      50: '#f9f9f9',
      100: '#ededed',
      200: '#d3d3d3',
      300: '#b9b9b9',
      400: '#9f9f9f',
      500: '#858585',
      600: '#6b6b6b',
      700: '#515151',
      800: '#373737',
      900: '#1d1d1d',
    },
    accent: {
      100: '#ffb74d', // orange highlight
      200: '#ffa000',
    },
  },
  fonts: {
    heading: 'Poppins, sans-serif',
    body: 'Poppins, sans-serif',
    mono: 'Menlo, monospace',
  },
  styles: {
    global: {
      body: {
        bg: 'brand.50',
        color: 'gray.800',
      },
    },
  },
  semanticTokens: {
    colors: {
      backgroundImage: {
        default: "url('/background_theme_3.svg')",
      },
    },
  },
});

export default theme_3;
