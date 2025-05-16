// src/components/AnimatedSection.tsx

import { BoxProps, chakra, shouldForwardProp } from '@chakra-ui/react';
import { isValidMotionProp, motion, useAnimation, useInView } from 'framer-motion';
import { FC, PropsWithChildren, useEffect, useRef } from 'react';

// Create Chakra-aware motion div
const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

type MotionBoxProps = Omit<BoxProps, 'transition'>;

const AnimatedSection: FC<PropsWithChildren<MotionBoxProps>> = ({ children, ...props }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 20 });
    }
  }, [inView, controls]);

  return (
    <MotionBox
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ type: 'spring', stiffness: 80, damping: 18 } as any}
      {...props}
    >
      {children}
    </MotionBox>
  );
};

export default AnimatedSection;
