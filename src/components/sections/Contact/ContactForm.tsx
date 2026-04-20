import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  VStack,
  Heading,
  Icon,
  Text,
  Link,
  SimpleGrid,
} from '@chakra-ui/react';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { env } from '../../../config/env';
import SectionHeader from '../../shared/SectionHeader';

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>();
  const toast = useToast();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      if (!env.sendEmailEndpoint) {
        throw new Error('Contact form endpoint is not configured');
      }

      const response = await fetch(env.sendEmailEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Your message has been sent successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        reset();
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred, please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box py={{ base: 16, md: 24 }} px={{ base: 4, md: 8 }}>
      <Box maxW="1120px" mx="auto">
        <SectionHeader
          eyebrow="Contact"
          title="Need reliable survey support on site?"
          description="Send the project details and the team will come back to you with the right next step."
        />
        <Box
          maxW="980px"
          p={{ base: 5, md: 8 }}
          shadow="0 24px 80px rgba(6, 24, 36, 0.16)"
          borderWidth="1px"
          borderColor="blackAlpha.100"
          borderRadius="32px"
          bg="white"
          mx="auto"
        >
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} alignItems="start">
          <Box
            bg="brand.900"
            color="white"
            borderRadius="24px"
            p={{ base: 6, md: 8 }}
            minH="100%"
            bgImage="linear-gradient(145deg, rgba(248,213,138,0.18), transparent 42%)"
          >
            <Heading size="lg" letterSpacing="-0.04em" mb={4}>
              Tell us what needs setting out, checking, scanning, or monitoring.
            </Heading>
            <Text color="whiteAlpha.700" lineHeight="1.8" mb={6}>
              Include the site location, programme pressure, discipline, and any drawings or tolerance concerns. We will help identify the most practical survey support.
            </Text>
            <Link href="https://www.linkedin.com/company/pf-geomatics/" isExternal>
              <Button
                leftIcon={<Icon as={FaLinkedin} />}
                variant="outline"
                borderColor="whiteAlpha.500"
                color="white"
                _hover={{ bg: 'whiteAlpha.200' }}
                _active={{ transform: 'scale(0.97)' }}
                transition="all 0.2s ease"
              >
                Find us on LinkedIn
              </Button>
            </Link>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4}>
              <FormControl isInvalid={Boolean(errors.name)}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  type="text"
                  border="1px"
                  borderColor="blackAlpha.200"
                  bg="brand.50"
                  color={'black'}
                  borderRadius="xl"
                  {...register("name", { required: "This is required", maxLength: 80 })}
                />
              </FormControl>
              <FormControl isInvalid={Boolean(errors.email)}>
                <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    border="1px"
                    borderColor="blackAlpha.200"
                    bg="brand.50"
                    color={'black'}
                    borderRadius="xl"
                    {...register("email", {
                      required: "This is required",
                      pattern: {
                        value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                        message: "Invalid email address"
                      }
                    })}
                  />
              </FormControl>
              <FormControl isInvalid={Boolean(errors.message)}>
                <FormLabel htmlFor="message">Message</FormLabel>
                <Textarea
                  id="message"
                  border="1px"
                  borderColor="blackAlpha.200"
                  bg="brand.50"
                  {...register("message", { required: "This is required", maxLength: 2000 })}
                  rows={6}
                  color={'black'}
                  borderRadius="xl"
                />
              </FormControl>
              <Button
                mt={4}
                isLoading={isSubmitting}
                type="submit"
                bg="brand.900"
                leftIcon={<Icon as={FaEnvelope} />}
                color="white"
                _hover={{ bg: 'brand.700', transform: 'translateY(-2px)' }}
                _active={{ transform: 'scale(0.97)' }}
                transition="all 0.2s ease"
                size="lg"
                w="100%"
              >
                Send Message
              </Button>
            </VStack>
          </form>
        </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactForm;
