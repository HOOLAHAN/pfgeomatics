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
      <Box id="cover-video">
        <CoverVideo src={require(`../media/pfg.mp4`)} />
      </Box>
      <Box id="projects">
        <Projects />
      </Box>
      <Box id="services">
        <Services />
      </Box>
      <Box id="contact">
        <Contact />
      </Box>
      <Box id="clients">
        <Clients />
      </Box>
      <Footer />
    </Box>
  );
}

export default Home;
