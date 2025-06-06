// src/components/MapComponent.tsx

import React, { useEffect, useState, useRef } from 'react';
import ReactMapGL, { ViewStateChangeEvent } from 'react-map-gl';
import {
  Box,
  Button,
  useBreakpointValue,
  Spinner,
  Center,
  HStack,
} from '@chakra-ui/react';
import { fetchCoordinates } from '../../../utils/fetchCoordinates';
import { projectsData } from '../../../data/projectsData';
import 'mapbox-gl/dist/mapbox-gl.css';
import { LngLatBounds } from 'mapbox-gl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import ProjectModal from '../Projects/ProjectModal';
import { getMediaUrl } from '../../../utils/getMediaUrl';
import ProjectMarker from './ProjectMarker';

export interface Project {
  name: string;
  location: string;
  postcode: string;
  client: string;
  dateStarted: string;
  dateEnded: string;
  imageFolder: string;
  description: string;
  linkedIn: string;
  latitude?: number;
  longitude?: number;
  thumbnail?: string;
}

export type ProjectWithCoordinates = Project & {
  latitude: number;
  longitude: number;
};

const MapComponent: React.FC = () => {
  const height = useBreakpointValue({ base: '45vh', md: '45vh' });
  const [isDarkMode, setIsDarkMode] = useState(true);

  const mapStyle = isDarkMode
    ? 'mapbox://styles/mapbox/streets-v11'
    : 'mapbox://styles/mapbox/dark-v10';

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  const [viewport, setViewport] = useState({
    latitude: 51.5074,
    longitude: -0.1278,
    zoom: 10,
    width: '100%',
    height: '100%',
  });

  const [projects, setProjects] = useState<ProjectWithCoordinates[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectWithCoordinates | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const [isProjectModalOpen, setProjectModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndSetCoordinates = async () => {
      try {
        const postcodes = projectsData.map(p => p.postcode);
        const coordinates = await fetchCoordinates(postcodes);

        const updatedProjects: ProjectWithCoordinates[] = await Promise.all(
          projectsData.map(async (project) => {
            const coordinate = coordinates.find(c => c.postcode === project.postcode);
            const thumbnail = getMediaUrl('projectImages', `${project.imageFolder}/1.png`);

            return {
              ...project,
              latitude: coordinate ? coordinate.latitude : 0,
              longitude: coordinate ? coordinate.longitude : 0,
              thumbnail
            };
          })
        );

        setProjects(updatedProjects);

        if (initialLoad) {
          fitBounds(updatedProjects);
          setInitialLoad(false);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching coordinates:', error);
        setLoading(false);
      }
    };

    fetchAndSetCoordinates();
  }, [initialLoad]);

  useEffect(() => {
    if (mapContainerRef.current) {
      setViewport(prev => ({
        ...prev,
        height: `${mapContainerRef.current!.clientHeight}px`
      }));
      if (mapRef.current) {
        mapRef.current.resize();
      }
    }
  }, [height]);

  const handleMarkerClick = (project: ProjectWithCoordinates) => {
    setSelectedProject(project);
    setProjectModalOpen(true);
  };

  const fitBounds = (projects: ProjectWithCoordinates[]) => {
    const bounds = new LngLatBounds();
    projects.forEach(project => {
      if (project.latitude && project.longitude) {
        bounds.extend([project.longitude, project.latitude]);
      }
    });

    if (!bounds.isEmpty()) {
      const { _ne: ne, _sw: sw } = bounds;
      const center = [(ne.lng + sw.lng) / 2, (ne.lat + sw.lat) / 2];
      const zoom = Math.min(14, Math.log2(360 / (ne.lng - sw.lng)) - 1);

      setViewport(prev => ({
        ...prev,
        latitude: center[1],
        longitude: center[0],
        zoom
      }));
    }
  };

  return (
    <Box px={{ base: 3, md: 0 }} py={3}>
      <Box
        width="100%"
        maxW="1200px"
        mx="auto"
        position="relative"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="xl"
        ref={mapContainerRef}
        bg="white"
      >
        {loading && (
          <Center>
            <Spinner size="xl" position="absolute" top="50%" transform="translate(-50%, -50%)" zIndex="10" />
          </Center>
        )}
        <Box width="calc(100% - 10px)" height={height} m="5px" borderRadius="lg" overflow="hidden" boxShadow="lg">
          <ReactMapGL
            ref={mapRef}
            {...viewport}
            mapStyle={mapStyle}
            onMove={(evt: ViewStateChangeEvent) =>
              setViewport(prev => ({
                ...prev,
                ...evt.viewState
              }))
            }
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          >
            {projects.map((project, index) =>
              project.latitude !== 0 && project.longitude !== 0 ? (
                <ProjectMarker
                  key={index}
                  project={project}
                  onClick={() => handleMarkerClick(project)}
                />
              ) : null
            )}
          </ReactMapGL>
        </Box>
        <HStack spacing={2} position="absolute" top="20px" right="20px" zIndex={2}>
          <Button
            onClick={() => fitBounds(projects)}
            bg="brand.600"
            color="white"
            border="1px solid"
            borderColor="brand.600"
            _hover={{ bg: "brand.50", color: "brand.600" }}
            _active={{ bg: "brand.50", transform: 'scale(0.95)' }}
            rounded="full"
            shadow="lg"
            size="sm"
          >
            <FontAwesomeIcon icon={faExpand} />
          </Button>

          <Button
            onClick={() => setIsDarkMode(prev => !prev)}
            bg="brand.600"
            color="white"
            border="1px solid"
            borderColor="brand.600"
            _hover={{ bg: "brand.50", color: "brand.600" }}
            _active={{ bg: "brand.50", transform: 'scale(0.95)' }}
            rounded="full"
            shadow="lg"
            size="sm"
          >
            {isDarkMode ? "Dark Map" : "Light Map"}
          </Button>
        </HStack>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            isOpen={isProjectModalOpen}
            onClose={() => setProjectModalOpen(false)}
          />
        )}
      </Box>
    </Box>
  );
};

export default MapComponent;
