import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

// Lock to light mode
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// Logo-inspired earthy color scheme
const colors = {
  brand: {
    50: "#f8f7f3",  // soft background
    100: "#d9d6ce", // warm neutral
    200: "#aaaaa0", // muted green-gray (logo tone)
    300: "#dbdcd6",
    400: "#7c7a6e", // mid tone
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
};

const fonts = {
  heading: "Inter, sans-serif",
  body: "Inter, sans-serif",
  mono: "Menlo, monospace",
};

const theme = extendTheme({ config, colors, fonts });

const App = () => (
  <ChakraProvider theme={theme}>
    <Navbar />
    <Home />
  </ChakraProvider>
);

export default App;
