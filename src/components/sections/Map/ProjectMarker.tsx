// scr/components/sections/Map/ProjectMarker.tsx

import React, { useState } from 'react';
import { Marker } from 'react-map-gl';
import { Box, Image } from '@chakra-ui/react';
import { ProjectWithCoordinates } from './MapComponent';

interface ProjectMarkerProps {
  project: ProjectWithCoordinates;
  onClick: () => void;
}

const ProjectMarker: React.FC<ProjectMarkerProps> = ({ project, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Marker latitude={project.latitude} longitude={project.longitude}>
      <Box
        bg="brand.600"
        p={1}
        border="1px solid"
        borderColor="brand.600"
        rounded="full"
        shadow="md"
        cursor="pointer"
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        _hover={{ transform: 'scale(1.05)', bg: 'brand.50' }}
        transition="transform 0.2s ease"
      >
        <Image
          src={isHovered ? "/EDM_B.png" : "/EDM_W.png"}
          alt="Project marker"
          boxSize="20px"
          objectFit="contain"
          draggable={false}
        />
      </Box>
    </Marker>
  );
};

export default ProjectMarker;