// src/components/Home.tsx

import { lazy, Suspense } from 'react';
import { Box, Center, Spinner } from '@chakra-ui/react';
import CoverVideo from './layout/CoverVideo';
import About from './sections/About/About';
import Footer from './layout/Footer';
import AnimatedSection from './shared/AnimatedSection';
import DeferredSection from './shared/DeferredSection';
import { env } from '../config/env';

const Services = lazy(() => import('./sections/Services/Services'));
const Projects = lazy(() => import('./sections/Projects/Projects'));
const MapComponent = lazy(() => import('./sections/Map/MapComponent'));
const Clients = lazy(() => import('./sections/Clients/Clients'));
const BrochureDownload = lazy(() => import('./sections/Brochure/BrochureDownload'));
const ContactForm = lazy(() => import('./sections/Contact/ContactForm'));

const sectionFallback = (
  <Center minH="220px">
    <Spinner color="brand.600" />
  </Center>
);

const Home: React.FC = () => {
  const videoSrc = `${env.cloudFrontBaseUrl}/pfg720.mp4`;

  return (
      <Box minH="100vh">

      <AnimatedSection id="video">
        <Box id="cover-video">
          <CoverVideo src={videoSrc} />
        </Box>
      </AnimatedSection>

      <AnimatedSection id="about">
        <About />
      </AnimatedSection>

      <DeferredSection id="services" minH="440px">
        <Suspense fallback={sectionFallback}>
          <Services />
        </Suspense>
      </DeferredSection>

      <DeferredSection id="projects" minH="420px">
        <Suspense fallback={sectionFallback}>
          <Projects />
        </Suspense>
      </DeferredSection>

      <DeferredSection id="map" minH="420px">
        <Suspense fallback={sectionFallback}>
          <MapComponent />
        </Suspense>
      </DeferredSection>

      <DeferredSection id="clients" minH="360px">
        <Suspense fallback={sectionFallback}>
          <Clients />
        </Suspense>
      </DeferredSection>

      <DeferredSection id="brochure-download" mt={10} minH="220px">
        <Suspense fallback={sectionFallback}>
          <BrochureDownload />
        </Suspense>
      </DeferredSection>

      <DeferredSection id="contact-form" minH="520px">
        <Suspense fallback={sectionFallback}>
          <ContactForm />
        </Suspense>
      </DeferredSection>

      <Footer />
    </Box>
  );
};

export default Home;
