// src/components/Home.tsx

import { Box } from '@chakra-ui/react';
import About from './About';
import Clients from './Clients';
import Projects from './Projects';
import Services from './Services';
import Contact from './Contact';
import Footer from './Footer';

const Home: React.FC = () => {
  return (
    <Box>
      <About />
      <Projects />
      <Services />
      <Contact />
      <Clients />
      <Footer />
    </Box>
  );
}

export default Home;

