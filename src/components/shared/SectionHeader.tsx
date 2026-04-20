import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  inverse?: boolean;
}

const SectionHeader: FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  align = 'center',
  inverse = false,
}) => (
  <VStack
    align={align === 'left' ? 'flex-start' : 'center'}
    spacing={3}
    textAlign={align}
    maxW="780px"
    mx={align === 'center' ? 'auto' : undefined}
    mb={{ base: 8, md: 12 }}
  >
    <Text
      color={inverse ? 'accent.100' : 'accent.300'}
      fontSize="xs"
      fontWeight="800"
      letterSpacing="0.22em"
      textTransform="uppercase"
    >
      {eyebrow}
    </Text>
    <Heading
      as="h2"
      color={inverse ? 'white' : 'brand.900'}
      fontSize={{ base: '3xl', md: '5xl' }}
      lineHeight="1"
      letterSpacing="-0.055em"
      fontWeight="900"
    >
      {title}
    </Heading>
    {description && (
      <Box
        w="72px"
        h="2px"
        bg={inverse ? 'accent.100' : 'accent.300'}
        opacity={0.9}
      />
    )}
    {description && (
      <Text
        color={inverse ? 'whiteAlpha.800' : 'gray.600'}
        fontSize={{ base: 'md', md: 'lg' }}
        lineHeight="1.8"
      >
        {description}
      </Text>
    )}
  </VStack>
);

export default SectionHeader;
