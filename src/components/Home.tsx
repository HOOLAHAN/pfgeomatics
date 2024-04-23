// src/components/Home.tsx
import { Box } from '@chakra-ui/react';
import Clients from './Clients';
import About from './About';

const Home: React.FC = () => {
  return (
    <Box>
      <About />
      {/* <Projects />
      <Services />
      <Contact /> */}
      <Clients />
    </Box>
  );
}

export default Home;

