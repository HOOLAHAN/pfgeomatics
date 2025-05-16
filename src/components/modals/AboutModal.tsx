// src/components/AboutModal.tsx

import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Box,
  VStack,
  Image,
  useToken,
  Heading,
  Divider,
} from '@chakra-ui/react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const buttonBorderColor = useToken("colors", "brand.600");
  const buttonTextColor = useToken("colors", "brand.600");
  const buttonHoverBg = useToken("colors", "brand.50");

return (
  <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
    <ModalOverlay />
    <ModalContent mx={4} borderRadius="xl" boxShadow="lg">
      <ModalHeader>About PF Geomatics</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <VStack spacing={5} align="start">
          <Image
            src={require(`../../media/serviceImages/about/2.JPG`)}
            alt="Surveyor at work"
            width="100%"
            maxH="300px"
            objectFit="cover"
            borderRadius="md"
            shadow="md"
          />
          <Divider />
          <Box>
            <Heading size="sm" mb={2}>What We Do</Heading>
            <Text mb={2}>
              Our team of qualified surveyors covers projects throughout London and the surrounding area.
            </Text>
            <Text mb={2}>
              We provide tailored engineering survey solutions using advanced technologies, ensuring precision and clarity at every stage.
            </Text>
            <Text>
              Our “Right First Time” ethos is supported by robust QA processes, helping us deliver accurate results, cost-effectively — backed by over 30 years of experience.
            </Text>
          </Box>
        </VStack>
      </ModalBody>
      <ModalFooter>
        <Button
          variant="outline"
          size="sm"
          borderColor={buttonBorderColor}
          color={buttonTextColor}
          _hover={{ bg: buttonHoverBg }}
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
