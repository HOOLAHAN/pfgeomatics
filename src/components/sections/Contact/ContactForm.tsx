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
  useToken,
} from '@chakra-ui/react';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const brandBg = useToken("colors", "brand.600");
  const brandText = useToken("colors", "brand.50");
  const buttonBackgroundColor = useToken("colors", "brand.50");
  const formInputColor = useToken("colors", "brand.50");
  const buttonBorderColor = useToken("colors", "brand.800");
  const buttonTextColor = useToken("colors", "brand.800");
  const buttonHoverBg = useToken("colors", "brand.300");

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>();
  const toast = useToast();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await fetch(process.env.REACT_APP_SEND_EMAIL_ENDPOINT!, {
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
    <Box py={10} >
      <Box px={5} maxW="1200px" mx="auto" >
        <Heading size="lg" textAlign="center" mb={6} color={"brand.800"}>
          Contact Us
        </Heading>
        <Box
          maxW={{ base: "90%", md: "700px" }}
          p={6}
          shadow="md"
          borderWidth="1px"
          borderColor={buttonBorderColor}
          borderRadius="md"
          bg={brandBg}
          mx="auto"
          color={brandText}
        >
        <Text fontSize="lg" textAlign="center" color="white" mb={6} maxW="700px" mx="auto">
          For enquiries, please complete the form below and we'll get back to you. You can also find us on{" "}
          <Link href="https://www.linkedin.com/company/pf-geomatics/" isExternal>
            <Button
              leftIcon={<Icon as={FaLinkedin} />}
              variant="outline"
              borderColor={buttonBorderColor}
              color={buttonTextColor}
              bg={buttonBackgroundColor}
              _hover={{ bg: buttonHoverBg }}
              _active={{ bg: buttonHoverBg, transform: 'scale(0.97)' }}
              transition="all 0.2s ease"
              size="sm"
              ml={2}
            >
              LinkedIn
            </Button>
          </Link>
        </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4}>
              <FormControl isInvalid={Boolean(errors.name)}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  type="text"
                  border="1px"
                  borderColor={buttonBorderColor}
                  bg={formInputColor}
                  color={'black'}
                  {...register("name", { required: "This is required", maxLength: 80 })}
                />
              </FormControl>
              <FormControl isInvalid={Boolean(errors.email)}>
                <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    border="1px"
                    borderColor={buttonBorderColor}
                    bg={formInputColor}
                    color={'black'}
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
                  borderColor={buttonBorderColor}
                  bg={formInputColor}
                  {...register("message", { required: "This is required", maxLength: 2000 })}
                  rows={6}
                  color={'black'}
                />
              </FormControl>
              <Button
                mt={4}
                isLoading={isSubmitting}
                type="submit"
                border="1px"
                bg={buttonBackgroundColor}
                borderColor={buttonBorderColor}
                leftIcon={<Icon as={FaEnvelope} />}
                variant="outline"
                color={buttonTextColor}
                _hover={{ bg: buttonHoverBg }}
                _active={{ bg: buttonHoverBg, transform: 'scale(0.97)' }}
                transition="all 0.2s ease"
                size="lg"
              >
                Send Message
              </Button>
            </VStack>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactForm;
