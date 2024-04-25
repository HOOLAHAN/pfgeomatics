// src/components/Home.tsx

import { Box } from '@chakra-ui/react';
import CoverVideo from './CoverVideo';
import Clients from './Clients';
import Projects from './Projects';
import Services from './Services';
import Contact from './Contact';
import Footer from './Footer';

const Home: React.FC = () => {
  return (
    <Box>
      <CoverVideo src={require(`../media/pfg.mp4`)}/>
      <Projects />
      <Services />
      <Contact />
      <Clients />
      <Footer />
    </Box>
  );
}

export default Home;

