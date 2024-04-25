import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

const colors = {
  brand: {
    900: '#bcd4de',
    800: '#A5CCD1',
    700: '#A0B9BF',
    600: '#9DACB2',
    500: '#949BA0',
    400: '#005E7C',
  },
};

const fonts = {
  heading: "Calibri, sans-serif",
  body: "Calibri, sans-serif",
  mono: "Menlo, monospace"  
};

const theme = extendTheme({ colors, fonts });

const App = () => (
  <ChakraProvider theme={theme}>
    <Navbar />
    <Home />
  </ChakraProvider>
);

export default App;
