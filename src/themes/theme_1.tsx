import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

export const theme_1 = extendTheme({
  config,
  colors: {
    brand: {
      50: '#f5f8fb',
      100: '#d9e5ef',
      200: '#aec6d8',
      300: '#7fa4bd',
      400: '#4e819f',
      500: '#276887',
      600: '#174a63',
      700: '#10384d',
      800: '#0a2738',
      900: '#061824',
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
      100: '#f8d58a',
      200: '#e9b949',
      300: '#c58a23',
    },
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
    mono: 'Menlo, monospace',
  },
  styles: {
    global: {
      'html, body, #root': {
        minH: '100%',
      },
      body: {
        bg: 'brand.50',
        bgImage:
          'radial-gradient(circle at 12% 8%, rgba(39, 104, 135, 0.18), transparent 30%), linear-gradient(180deg, #f8fbfd 0%, #eef5f8 45%, #f8fbfd 100%)',
        color: 'gray.800',
      },
      '::selection': {
        bg: 'accent.100',
        color: 'brand.900',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'full',
        fontWeight: 800,
        letterSpacing: '-0.01em',
      },
    },
  },
});

export default theme_1;
