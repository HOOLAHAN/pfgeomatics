// src/components/Services.tsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Image,
  useDisclosure,
  Spinner,
  Center,
  SimpleGrid,
} from '@chakra-ui/react';
import { servicesData } from '../../../data/servicesData';
import ServiceModal from './ServiceModal';
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import { Carousel, Direction } from '../../ChakraCarousel';
import CarouselCard from '../../ChakraCarousel/CarouselCard';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface Service {
  title: string;
  imageFolder: string;
  service: string[];
}

const Services: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [loadingImages, setLoadingImages] = useState<{ [key: string]: boolean }>({});
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = width >= 950;
  const isTablet = width >= 720 && width < 950;

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    onOpen();
  };

  const handleImageLoad = (title: string) => {
    setLoadingImages(prev => ({ ...prev, [title]: false }));
  };

  const renderServiceCard = (service: Service) => (
    <Box
      key={service.title}
      minW="300px"
      maxW="300px"
      mx="auto"
      cursor="pointer"
      onClick={() => handleServiceClick(service)}
      borderRadius="md"
      overflow="hidden"
      transition="all 0.3s ease"
      _hover={{ transform: 'scale(1.03)', boxShadow: 'lg' }}
    >
      {loadingImages[service.title] && (
        <Center h="200px">
          <Spinner size="lg" />
        </Center>
      )}
      <Image
        src={require(`../../../media/serviceImages/${service.imageFolder}/1.png`)}
        alt={`${service.title} image`}
        objectFit="cover"
        w="100%"
        h="200px"
        boxShadow="md"
        borderRadius="md"
        display={loadingImages[service.title] ? 'none' : 'block'}
        onLoad={() => handleImageLoad(service.title)}
      />
      <Box p="4" textAlign="center">
        <Heading size="md" mb="1" color="brand.800">
          {service.title}
        </Heading>
      </Box>
    </Box>
  );

  const carouselItems = servicesData.map((service) => ({
    title: service.title,
    image: { imageUrl: require(`../../../media/serviceImages/${service.imageFolder}/1.png`) },
    onClick: () => handleServiceClick(service),
  }));

  return (
    <Box py={10}>
      <Box px={5} maxW="1200px" mx="auto">
        <Heading as="h2" size="xl" mb={6} textAlign="center" color="brand.800">
          Our Services
        </Heading>

        {isDesktop ? (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} justifyContent="center">
            {servicesData.map(renderServiceCard)}
          </SimpleGrid>
        ) : isTablet ? (
          <Carousel
            id="services-carousel"
            interval={4000}
            direction={Direction.RIGHT}
            repetitions={1}
            items={carouselItems}
          >
            <CarouselCard
              key="carousel-service"
              title=""
              image={{ imageUrl: '' }}
              onClick={() => {}}
              id=""
              index={0}
              slides={carouselItems.length}
            />
          </Carousel>
        ) : (
          <ResponsiveCarousel
            showThumbs={false}
            infiniteLoop
            autoPlay
            interval={4000}
            showStatus={false}
            showIndicators={false}
            emulateTouch
          >
            {servicesData.map((service) => (
              <Box key={service.title} px={6} py={2}>
                {renderServiceCard(service)}
              </Box>
            ))}
          </ResponsiveCarousel>
        )}
      </Box>

      <ServiceModal
        isOpen={isOpen}
        onClose={onClose}
        selectedService={selectedService}
      />
    </Box>
  );
};

export default Services;
