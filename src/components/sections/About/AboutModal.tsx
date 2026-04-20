// src/components/AboutModal.tsx

import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Box,
  VStack,
  Image,
  Heading,
  SimpleGrid,
  Badge,
} from '@chakra-ui/react';

import { getMediaUrl } from '../../../utils/getMediaUrl';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
return (
  <Modal isOpen={isOpen} onClose={onClose} size="5xl" isCentered>
    <ModalOverlay bg="rgba(6, 24, 36, 0.76)" backdropFilter="blur(8px)" />
    <ModalContent
      mx={4}
      my={{ base: 3, md: 4 }}
      borderRadius={{ base: '24px', md: '32px' }}
      boxShadow="0 30px 100px rgba(6, 24, 36, 0.35)"
      bg="brand.50"
      maxH="92vh"
      overflowY="auto"
    >
      <ModalCloseButton top={4} right={4} bg="whiteAlpha.900" borderRadius="full" zIndex={2} _hover={{ bg: 'white' }} />
      <ModalBody p={{ base: 4, md: 5 }}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 4, md: 5 }} alignItems="stretch">
          <Box position="relative" overflow="hidden" borderRadius="24px" minH={{ base: '220px', md: '300px', xl: '360px' }}>
            <Image
              src={getMediaUrl('serviceImages/about', '2.png')}
              alt="Surveyor at work"
              width="100%"
              height="100%"
              objectFit="cover"
              position="absolute"
              inset={0}
            />
            <Box position="absolute" inset={0} bgGradient="linear(to-t, rgba(6,24,36,0.86), transparent 52%)" />
            <VStack position="absolute" left={{ base: 4, md: 5 }} right={{ base: 4, md: 5 }} bottom={{ base: 4, md: 5 }} align="start" spacing={2}>
              <Badge bg="accent.100" color="brand.900" borderRadius="full" px={3} py={1}>
                About PF Geomatics
              </Badge>
              <Heading color="white" fontSize={{ base: '2xl', md: '3xl', xl: '4xl' }} letterSpacing="-0.055em">
                Right first time survey support.
              </Heading>
            </VStack>
          </Box>

          <VStack spacing={{ base: 4, md: 4 }} align="stretch">
            <Box>
              <Text color="accent.300" fontSize="xs" fontWeight="900" letterSpacing="0.2em" textTransform="uppercase" mb={3}>
                What We Do
              </Text>
              <Heading color="brand.900" fontSize={{ base: '2xl', md: '3xl', xl: '4xl' }} lineHeight="1" letterSpacing="-0.06em">
                Accurate survey information for confident construction decisions.
              </Heading>
            </Box>
            <Box p={{ base: 4, md: 5 }} bg="white" borderRadius="2xl" border="1px solid" borderColor="blackAlpha.100">
              <Text color="gray.700" lineHeight="1.65" mb={3}>
              Our team of qualified surveyors covers projects throughout London and the surrounding area.
            </Text>
              <Text color="gray.700" lineHeight="1.65" mb={3}>
              We provide tailored engineering survey solutions using advanced technologies, ensuring precision and clarity at every stage.
            </Text>
              <Text color="gray.700" lineHeight="1.65">
              Our “Right First Time” ethos is supported by robust QA processes, helping us deliver accurate results, cost-effectively — backed by over 30 years of experience.
            </Text>
            </Box>
            <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={3}>
              {[
                ['30+', 'years combined experience'],
                ['QA', 'process-led delivery'],
                ['CAD', 'clear survey outputs'],
              ].map(([value, label]) => (
                <Box key={value} p={{ base: 3, md: 4 }} bg="brand.900" color="white" borderRadius="2xl">
                  <Text color="accent.100" fontSize={{ base: 'xl', md: '2xl' }} fontWeight="900">{value}</Text>
                  <Text color="whiteAlpha.700" fontSize="xs" textTransform="uppercase" letterSpacing="0.08em">{label}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </SimpleGrid>
      </ModalBody>
      <ModalFooter px={{ base: 4, md: 5 }} pb={{ base: 4, md: 5 }} pt={0}>
        <Button
          bg="brand.900"
          color="white"
          _hover={{ bg: 'brand.700' }}
          _active={{ transform: 'scale(0.97)' }}
          onClick={onClose}
        >
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

};

export default AboutModal;
