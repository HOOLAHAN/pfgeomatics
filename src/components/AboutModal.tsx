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
  useColorModeValue,
} from '@chakra-ui/react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const buttonBorderColor = useColorModeValue('black', 'white');
  const buttonTextColor = useColorModeValue('black', 'white');
  const buttonHoverBg = useColorModeValue('gray.200', 'whiteAlpha.300');

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent m={3}>
        <ModalHeader>About Us</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <Box overflow="hidden">
              <Image
                src={require(`../media/serviceImages/about/1.png`)}
                alt="About Us"
                width="100%"
                maxH="400px"
                objectFit="cover"
                px={2}
              />
            </Box>
            <Box>
              <Text fontSize="lg" mb={3}>
                Our team of qualified surveyors cover projects throughout London and the surrounding area.
              </Text>
              <Text fontSize="lg" mb={3}>
                We pride ourselves in providing our clients with tailored engineering survey solutions using leading-edge survey technology.
              </Text>
              <Text fontSize="lg" mb={3}>
                Our “Right First Time” approach which is underpinned by robust quality assurance processes will ensure a high standard of deliverables and value for money. With over 30 years combined experience in the construction industry, we are confident of meeting the engineering survey needs of your project, regardless of scale or complexity.
              </Text>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            size="sm"
            variant="outline"
            borderColor={buttonBorderColor}
            color={buttonTextColor}
            _hover={{ bg: buttonHoverBg }}
            _active={{ bg: buttonHoverBg, transform: 'scale(0.95)' }}
            transition="all 0.2s ease-in-out"
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
