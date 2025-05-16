// src/components/Home.tsx

import { Box } from '@chakra-ui/react';
import CoverVideo from './CoverVideo';
import About from './About';
import Clients from './Clients';
import Projects from './Projects';
import MapComponent from './MapComponent';
import Services from './Services';
import ContactForm from './ContactForm';
import Footer from './Footer';
import BrochureDownload from './BrochureDownload';
import AnimatedSection from './AnimatedSection';

const Home: React.FC = () => {
  return (
    <Box
      bgImage="url('/contour_background.svg')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      minH="100vh"
    >
      <Box id="cover-video">
        <CoverVideo src={require(`../media/pfg.mp4`)} />
      </Box>

      <AnimatedSection id="about">
        <About />
      </AnimatedSection>

      <AnimatedSection id="services">
        <Services />
      </AnimatedSection>

      <AnimatedSection id="projects">
        <Projects />
      </AnimatedSection>

      <AnimatedSection id="map">
        <MapComponent />
      </AnimatedSection>

      <AnimatedSection id="clients">
        <Clients />
      </AnimatedSection>

      <AnimatedSection id="brochure-download" mt={10}>
        <BrochureDownload />
      </AnimatedSection>

      <AnimatedSection id="contact-form">
        <ContactForm />
      </AnimatedSection>

      <Footer />
    </Box>
  );
};

export default Home;
