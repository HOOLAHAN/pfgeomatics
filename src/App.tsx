// src/App.tsx
import { ChakraProvider } from "@chakra-ui/react";
import { theme_1 } from "./themes/theme_1";
import Navbar from "./components/layout/Navbar";
import Home from "./components/Home";


const App = () => {

  return (
    <ChakraProvider theme={theme_1}>
      <Navbar />
      <Home />
    </ChakraProvider>
  );
};

export default App;