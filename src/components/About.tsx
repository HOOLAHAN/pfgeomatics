// src/components/About.tsx
import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const About: React.FC = () => {
  return (
    <Box p={5} maxW="1200px" mx="auto">
      <Heading as="h1" size="xl" mb={4}>
        About Us
      </Heading>
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
  );
};

export default About;
