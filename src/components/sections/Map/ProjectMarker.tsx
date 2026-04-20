import { Marker } from 'react-map-gl';
import { Box } from '@chakra-ui/react';
import { ProjectWithCoordinates } from './MapComponent';

interface ProjectMarkerProps {
  project: ProjectWithCoordinates;
  onClick: () => void;
}

const ProjectMarker: React.FC<ProjectMarkerProps> = ({ project, onClick }) => (
  <Marker latitude={project.latitude} longitude={project.longitude} anchor="bottom">
    <Box
      as="button"
      type="button"
      aria-label={`Open ${project.name}`}
      title={project.name}
      w="30px"
      h="30px"
      borderRadius="50% 50% 50% 0"
      bg="accent.100"
      border="3px solid"
      borderColor="white"
      boxShadow="0 10px 28px rgba(6, 24, 36, 0.35)"
      cursor="pointer"
      transform="rotate(-45deg)"
      transition="all 0.2s ease"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      _hover={{
        bg: 'brand.900',
        transform: 'rotate(-45deg) scale(1.14)',
      }}
      _after={{
        content: '""',
        position: 'absolute',
        inset: '7px',
        borderRadius: 'full',
        bg: 'brand.900',
        transition: 'background 0.2s ease',
      }}
      sx={{
        '&:hover::after': {
          background: 'var(--chakra-colors-accent-100)',
        },
      }}
    />
  </Marker>
);

export default ProjectMarker;
