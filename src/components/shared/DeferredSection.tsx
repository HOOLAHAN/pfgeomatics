import { Box, BoxProps } from '@chakra-ui/react';
import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import AnimatedSection from './AnimatedSection';

type DeferredSectionProps = PropsWithChildren<BoxProps & {
  minH?: BoxProps['minH'];
}>;

const DeferredSection: FC<DeferredSectionProps> = ({ children, minH, ...props }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: '500px 0px' },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <Box ref={ref} minH={shouldRender ? undefined : minH} scrollMarginTop="96px" {...props}>
      {shouldRender && (
        <AnimatedSection>
          {children}
        </AnimatedSection>
      )}
    </Box>
  );
};

export default DeferredSection;
