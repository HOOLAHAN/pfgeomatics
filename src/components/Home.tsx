// src/components/Home.tsx
import { Box } from '@chakra-ui/react';
import Clients from './Clients';
import About from './About';
import Projects from './Projects';

const Home: React.FC = () => {
  return (
    <Box>
      <About />
      <Projects />
      {/* <Services /> */}
      {/* <Contact /> */}
      <Clients />
    </Box>
  );
}

export default Home;

