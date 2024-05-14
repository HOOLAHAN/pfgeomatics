import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const colors = {
  lightBrand: {
    // 900: '#bcd4de',
    // 800: '#A5CCD1',
    // 700: '#A0B9BF',
    // 600: '#9DACB2',
    // 500: '#949BA0',
    400: '#005E7C',
    // 300: '#e2e8f0',
  },
  darkBrand: {
    1000: '#1a202c',
    // 900: '#252525',
    // 800: '#333333',
    // 700: '#414141',
    // 600: '#525252',
    // 500: '#636363',
    // 400: '#747474',
    // 300: '#858585',
  }
};

const fonts = {
  heading: "Calibri, sans-serif",
  body: "Calibri, sans-serif",
  mono: "Menlo, monospace"  
};

const theme = extendTheme({ config, colors, fonts });

const App = () => (
  <ChakraProvider theme={theme}>
    <Navbar />
    <Home />
  </ChakraProvider>
);

export default App;
