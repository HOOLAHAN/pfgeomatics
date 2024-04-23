import {
  ChakraProvider,
  extendTheme,
  // theme,
  Box,
} from "@chakra-ui/react"

// import { Logo } from "./Logo"
import Navbar from "./components/Navbar"

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

export const App = () => (
  <ChakraProvider theme={theme}>
    <Navbar />
    <Box textAlign="center" fontSize="xl">
    </Box>
  </ChakraProvider>
)
