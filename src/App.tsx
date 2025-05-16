// src/App.tsx
import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import { theme_1 } from "./themes/theme_1";
import { theme_2 } from "./themes/theme_2";
import { theme_3 } from "./themes/theme_3";
import Navbar from "./components/layout/Navbar";
import Home from "./components/Home";

const themes = [theme_1, theme_2, theme_3];
const themeNames = ["Theme 1", "Theme 2", "Theme 3"];

const App = () => {
  const [themeIndex, setThemeIndex] = useState(0);

  const cycleTheme = () => {
    setThemeIndex((prev) => (prev + 1) % themes.length);
  };

  return (
    <ChakraProvider theme={themes[themeIndex]}>
      <Navbar onCycleTheme={cycleTheme} currentTheme={themeNames[themeIndex]} />
      <Home />
    </ChakraProvider>
  );
};

export default App;
