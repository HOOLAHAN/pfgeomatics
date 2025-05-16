// src/components/AnimatedSection.tsx

import { BoxProps, chakra, shouldForwardProp } from '@chakra-ui/react';
import { isValidMotionProp, motion } from 'framer-motion';
import { FC, PropsWithChildren } from 'react';

// Create a Chakra-aware motion div
const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

// Remove Chakra's built-in transition prop from the accepted props
type MotionBoxProps = Omit<BoxProps, 'transition'>;

const AnimatedSection: FC<PropsWithChildren<MotionBoxProps>> = ({ children, ...props }) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 80, damping: 18 } as any }
      viewport={{ once: true, amount: 0.3 }}
      {...props}
    >
      {children}
    </MotionBox>
  );
};

export default AnimatedSection;
