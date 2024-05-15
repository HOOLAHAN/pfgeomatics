// src/components/Home.tsx

import { Box } from '@chakra-ui/react';
import CoverVideo from './CoverVideo';
import About from './About';
import Clients from './Clients';
import Projects from './Projects';
import Services from './Services';
import ContactForm from './ContactForm';
import Footer from './Footer';

const Home: React.FC = () => {
  return (
    <Box>
      <Box id="cover-video">
        <CoverVideo src={require(`../media/pfg.mp4`)} />
      </Box>
      <Box id='about'>
        <About />
      </Box>
      <Box id="projects">
        <Projects />
      </Box>
      <Box id="services">
        <Services />
      </Box>
      <Box id="clients">
        <Clients />
      </Box>
      <Box id="contact-form">
        <ContactForm />
      </Box>
      <Footer />
    </Box>
  );
}

export default Home;
