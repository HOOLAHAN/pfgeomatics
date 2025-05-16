// src/components/Home.tsx

import { Box } from '@chakra-ui/react';
import CoverVideo from './layout/CoverVideo';
import About from './sections/About/About';
import Clients from './sections/Clients/Clients';
import Projects from './sections/Projects/Projects';
import MapComponent from './sections/Map/MapComponent';
import Services from './sections/Services/Services';
import ContactForm from './sections/Contact/ContactForm';
import Footer from './layout/Footer';
import BrochureDownload from './sections/Brochure/BrochureDownload';
import AnimatedSection from './shared/AnimatedSection';

const Home: React.FC = () => {
  return (
    <Box
      bgImage="url('/contour_background.svg')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      minH="100vh"
    >
      <AnimatedSection id="video">
        <Box id="cover-video">
          <CoverVideo src={require(`../media/pfg.mp4`)} />
        </Box>
      </AnimatedSection>

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
