// src/components/Services.tsx

import React, { useState, useRef } from 'react';
import {
  Box,
  Heading,
  Image,
  useDisclosure,
  Spinner,
  Center,
  SimpleGrid,
  useBreakpointValue,
  Text,
} from '@chakra-ui/react';
import { servicesData } from '../../../data/servicesData';
import ServiceModal from './ServiceModal';
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import { Carousel, Direction } from '../../ChakraCarousel';
import CarouselCard from '../../ChakraCarousel/CarouselCard';
import { getMediaUrl } from '../../../utils/getMediaUrl';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import SectionHeader from '../../shared/SectionHeader';

interface Service {
  title: string;
  imageFolder: string;
  service: string[];
}

const Services: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [loadingImages, setLoadingImages] = useState<{ [key: string]: boolean }>({});
  const carouselRef = useRef<ResponsiveCarousel>(null);
  const carouselMode = useBreakpointValue({ base: 'mobile', md: 'tablet', lg: 'desktop' }) ?? 'mobile';

  const arrowStyles = {
    color: 'white',
    bg: 'brand.900',
    border: '1px solid',
    borderColor: 'brand.900',
    borderRadius: 'full',
    _hover: { bg: 'accent.100', color: 'brand.900', borderColor: 'accent.100' },
    _active: { transform: 'scale(0.95)' },
  };

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
        maxW="340px"
        mx="auto"
        cursor="pointer"
        onClick={() => handleServiceClick(service)}
        role="group"
      >
        <Box
          borderRadius="28px"
          overflow="hidden"
          transition="all 0.3s ease"
          bg="white"
          border="1px solid"
          borderColor="blackAlpha.100"
          boxShadow="0 18px 55px rgba(6, 24, 36, 0.12)"
          _groupHover={{ transform: 'translateY(-8px)', boxShadow: '0 26px 70px rgba(6, 24, 36, 0.18)' }}
        >
          {loadingImages[service.title] && (
            <Center h="200px">
              <Spinner size="lg" />
            </Center>
          )}
          <Image
            src={imageUrl}
            alt={`${service.title} image`}
            loading="lazy"
            objectFit="cover"
            w="100%"
            h="220px"
            display={loadingImages[service.title] ? 'none' : 'block'}
            onLoad={() => handleImageLoad(service.title)}
          />
          <Box p={5}>
            <Heading size="md" color="brand.900" letterSpacing="-0.03em">
              {service.title}
            </Heading>
            <Text color="gray.600" fontSize="sm" mt={2} lineHeight="1.7">
              {service.service.slice(0, 3).join(' / ')}
            </Text>
          </Box>
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
    <Box py={{ base: 16, md: 24 }} px={{ base: 4, md: 8 }} bg="rgba(255,255,255,0.55)">
      <Box px={5} maxW="1200px" mx="auto">
        <SectionHeader
          eyebrow="Services"
          title="Survey capability built for live construction environments."
          description="From control networks and setting out to monitoring, laser scanning, and as-built reporting, the focus is practical accuracy at site pace."
        />

        {carouselMode === 'desktop' ? (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} justifyContent="center">
            {servicesData.map(renderServiceCard)}
          </SimpleGrid>
        ) : carouselMode === 'tablet' ? (
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
                        borderRadius="28px"
                        overflow="hidden"
                        transition="all 0.3s ease"
                        bg="white"
                        boxShadow="0 18px 55px rgba(6, 24, 36, 0.12)"
                        _hover={{ transform: 'translateY(-6px)', boxShadow: '0 24px 68px rgba(6, 24, 36, 0.18)' }}
                      >
                        {loadingImages[service.title] && (
                          <Center h="200px">
                            <Spinner size="lg" />
                          </Center>
                        )}
                        <Image
                          src={imageUrl}
                          alt={`${service.title} image`}
                          loading="lazy"
                          objectFit="cover"
                          w="100%"
                          h="220px"
                          display={loadingImages[service.title] ? 'none' : 'block'}
                          onLoad={() => handleImageLoad(service.title)}
                        />
                        <Box p={5}>
                          <Heading size="md" color="brand.900" letterSpacing="-0.03em">
                            {service.title}
                          </Heading>
                          <Text color="gray.600" fontSize="sm" mt={2} lineHeight="1.7">
                            {service.service.slice(0, 3).join(' / ')}
                          </Text>
                        </Box>
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
