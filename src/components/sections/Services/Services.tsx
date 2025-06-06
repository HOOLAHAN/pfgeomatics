// src/components/Services.tsx

import React, { useState, useEffect, useRef } from 'react';
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
import { getMediaUrl } from '../../../utils/getMediaUrl';
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
  const carouselRef = useRef<ResponsiveCarousel>(null);

  const arrowStyles = {
    color: 'white',
    bg: 'brand.600',
    border: '1px solid',
    borderColor: 'brand.600',
    borderRadius: 'full',
    _hover: { bg: 'brand.50', color: 'brand.600' },
    _active: { bg: 'brand.50', transform: 'scale(0.95)' },
  };

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = width >= 1000;
  const isTablet = width >= 720 && width < 1000;

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    onOpen();
  };

  const handleImageLoad = (title: string) => {
    setLoadingImages(prev => ({ ...prev, [title]: false }));
  };

  const renderServiceCard = (service: Service) => {
    const imageUrl = getMediaUrl('serviceImages', `${service.imageFolder}/1.png`);
    return (
      <Box
        key={service.title}
        minW="300px"
        maxW="300px"
        mx="auto"
        cursor="pointer"
        onClick={() => handleServiceClick(service)}
      >
        <Box
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
            src={imageUrl}
            alt={`${service.title} image`}
            objectFit="cover"
            w="100%"
            h="200px"
            borderRadius="md"
            boxShadow="md"
            display={loadingImages[service.title] ? 'none' : 'block'}
            onLoad={() => handleImageLoad(service.title)}
          />
        </Box>
        <Box mt={3} textAlign="center">
          <Heading size="md" color="brand.800">
            {service.title}
          </Heading>
        </Box>
      </Box>
    );
  };

  const carouselItems = servicesData.map((service) => ({
    title: service.title,
    image: { imageUrl: getMediaUrl('serviceImages', `${service.imageFolder}/1.png`) },
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
            interval={5000}
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
          <>
            <ResponsiveCarousel
              ref={carouselRef}
              showThumbs={false}
              infiniteLoop
              autoPlay
              interval={5000}
              showStatus={false}
              showIndicators={false}
              emulateTouch
              showArrows={true}
              renderArrowPrev={() => null}
              renderArrowNext={() => null}
            >
              {servicesData.map((service, index) => {
                const imageUrl = getMediaUrl('serviceImages', `${service.imageFolder}/1.png`);
                return (
                  <Center key={index} py={2}>
                    <Box
                      minW="300px"
                      maxW="360px"
                      mx="auto"
                      cursor="pointer"
                      onClick={() => handleServiceClick(service)}
                    >
                      <Box
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
                          src={imageUrl}
                          alt={`${service.title} image`}
                          objectFit="cover"
                          w="100%"
                          h="200px"
                          borderRadius="md"
                          boxShadow="md"
                          display={loadingImages[service.title] ? 'none' : 'block'}
                          onLoad={() => handleImageLoad(service.title)}
                        />
                      </Box>
                      <Box mt={3} textAlign="center">
                        <Heading size="md" color="brand.800">
                          {service.title}
                        </Heading>
                      </Box>
                    </Box>
                  </Center>
                );
              })}
            </ResponsiveCarousel>

            {/* Custom Arrow Controls Below */}
            <Box mt={4}>
              <Center>
                <Box display="flex" gap={12} px={4}>
                  <Box
                    as="button"
                    onClick={() =>
                      carouselRef.current?.moveTo(carouselRef.current.state.selectedItem - 1)
                    }
                    p={2}
                    px={4}
                    fontSize="24px"
                    aria-label="Previous slide"
                    {...arrowStyles}
                  >
                    &#10094;
                  </Box>
                  <Box
                    as="button"
                    onClick={() =>
                      carouselRef.current?.moveTo(carouselRef.current.state.selectedItem + 1)
                    }
                    p={2}
                    px={4}
                    fontSize="24px"
                    aria-label="Next slide"
                    {...arrowStyles}
                  >
                    &#10095;
                  </Box>
                </Box>
              </Center>
            </Box>
          </>
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
