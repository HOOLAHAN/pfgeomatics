// src/components/ContactForm.tsx

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
  Link
} from '@chakra-ui/react';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { useColorModeValue } from '@chakra-ui/react';

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  // const brandColour = 'brand.400';
  const buttonBorderColor = useColorModeValue('black', 'white');
  const buttonTextColor = useColorModeValue('black', 'white');
  const buttonHoverBg = useColorModeValue('gray.200', 'whiteAlpha.300');

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>();
  const toast = useToast();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await fetch(process.env.REACT_APP_SEND_EMAIL_ENDPOINT!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
    <Box 
    // bg={brandColour} 
    m="auto" p={{ base: 3, md: 5 }}>
      <Heading size="lg" textAlign="center" mb={6}>Contact Us</Heading>
      <Text fontSize="lg" textAlign="center">
        For enquiries reach out to us via email or find us on{' '}
        <Link href="https://www.linkedin.com/company/pf-geomatics/" isExternal>
          <Button
            leftIcon={<Icon as={FaLinkedin} />}
            variant="outline"
            borderColor={buttonBorderColor}
            color={buttonTextColor}
            _hover={{ bg: buttonHoverBg }}
            _active={{ bg: buttonHoverBg, transform: 'scale(0.95)' }}
            transition="all 0.2s ease-in-out"
            size="m"
            p={2}
          >
            LinkedIn
          </Button>
        </Link>
        {' '}for more updates.
      </Text>
      <Box maxW={{ base: "90%", md: "800px" }} p={5} shadow="md" borderWidth="1px" borderColor={buttonBorderColor} m="auto" borderRadius={5} mt={3}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <FormControl isInvalid={Boolean(errors.name) } borderColor={buttonBorderColor} >
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input id="name" type="text" {...register("name", { required: "This is required", maxLength: 80 })} />
            </FormControl>
            <FormControl isInvalid={Boolean(errors.email)} borderColor={buttonBorderColor} >
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input 
                id="email" 
                type="email" 
                {...register("email", { 
                  required: "This is required", 
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                    message: "Invalid email address"
                  }
                })} 
              />
            </FormControl>
            <FormControl isInvalid={Boolean(errors.message)} borderColor={buttonBorderColor} >
              <FormLabel htmlFor="message">Message</FormLabel>
              <Textarea 
                id="message" 
                {...register("message", { required: "This is required", maxLength: 2000 })} 
              />
            </FormControl>
            <Button 
              mt={4} 
              isLoading={isSubmitting} 
              type="submit"
              leftIcon={<Icon as={FaEnvelope} />}
              variant="outline"
              borderColor={buttonBorderColor}
              color={buttonTextColor}
              _hover={{ bg: buttonHoverBg }}
              _active={{ bg: buttonHoverBg, transform: 'scale(0.95)' }}
              transition="all 0.2s ease-in-out"
              size="lg"
            >
              Send Message
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default ContactForm;
