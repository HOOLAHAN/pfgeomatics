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
import { env } from '../../../config/env';
import SectionHeader from '../../shared/SectionHeader';

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

type Coordinate = {
  postcode: string;
  latitude: number;
  longitude: number;
};

const fallbackCoordinates: Coordinate[] = [
  { postcode: 'RH6 0RD', latitude: 51.181274, longitude: -0.20856 },
  { postcode: 'WD17 1LA', latitude: 51.660986, longitude: -0.397445 },
  { postcode: 'N1C 4AG', latitude: 51.533479, longitude: -0.125068 },
  { postcode: 'NW10 6NF', latitude: 51.527647, longitude: -0.255345 },
  { postcode: 'SW1E 6RA', latitude: 51.496908, longitude: -0.137576 },
  { postcode: 'SL6 1EH', latitude: 51.519727, longitude: -0.722544 },
  { postcode: 'SE10 0FR', latitude: 51.49977, longitude: 0.008305 },
  { postcode: 'EC3A 4AF', latitude: 51.513609, longitude: -0.080789 },
  { postcode: 'W1D 7ET', latitude: 51.510286, longitude: -0.134581 },
  { postcode: 'SW1H 0ET', latitude: 51.498772, longitude: -0.130974 },
  { postcode: 'SW1E 6PR', latitude: 51.498679, longitude: -0.139276 },
  { postcode: 'W2 6LG', latitude: 51.516752, longitude: -0.179228 },
  { postcode: 'EC3N 4DX', latitude: 51.509939, longitude: -0.073608 },
  { postcode: 'SW1Y 5AT', latitude: 51.507366, longitude: -0.130219 },
  { postcode: 'GU1 4UT', latitude: 51.236833, longitude: -0.580386 },
  { postcode: 'W1J 0DA', latitude: 51.510275, longitude: -0.13389 },
  { postcode: 'SW1Y 4RX', latitude: 51.5071, longitude: -0.1344 },
];

const MapComponent: React.FC = () => {
  const height = useBreakpointValue({ base: '45vh', md: '45vh' });
  const [isDarkMode, setIsDarkMode] = useState(false);

  const mapStyle = isDarkMode
    ? 'mapbox://styles/mapbox/dark-v11'
    : 'mapbox://styles/mapbox/streets-v12';

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
  const [isProjectModalOpen, setProjectModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchAndSetCoordinates = async () => {
      try {
        const postcodes = projectsData.map(p => p.postcode);
        const cacheKey = `pfg:coordinates:${postcodes.join('|')}`;
        const cached = sessionStorage.getItem(cacheKey);
        const coordinates: Coordinate[] = cached
          ? JSON.parse(cached)
          : await fetchCoordinates(postcodes).catch(() => fallbackCoordinates);

        if (!cached) {
          sessionStorage.setItem(cacheKey, JSON.stringify(coordinates));
        }

        const updatedProjects = buildProjectsWithCoordinates(coordinates);

        if (cancelled) return;
        setProjects(updatedProjects);
        fitBounds(updatedProjects);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching coordinates:', error);
        if (cancelled) return;

        const fallbackProjects = buildProjectsWithCoordinates(fallbackCoordinates);
        setProjects(fallbackProjects);
        fitBounds(fallbackProjects);
        setLoading(false);
      }
    };

    fetchAndSetCoordinates();
    return () => {
      cancelled = true;
    };
  }, []);

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

  const buildProjectsWithCoordinates = (coordinates: Coordinate[]): ProjectWithCoordinates[] =>
    projectsData.map((project) => {
      const coordinate = coordinates.find(c => c.postcode === project.postcode);
      const thumbnail = getMediaUrl('projectImages', `${project.imageFolder}/1.png`);

      return {
        ...project,
        latitude: coordinate ? coordinate.latitude : 0,
        longitude: coordinate ? coordinate.longitude : 0,
        thumbnail
      };
    });

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
    <Box px={{ base: 4, md: 8 }} py={{ base: 16, md: 22 }}>
      <SectionHeader
        eyebrow="Project Map"
        title="A geographic view of recent and landmark work."
        description="Explore selected project locations and open the markers for project context, images, and client details."
      />
      <Box
        width="100%"
        maxW="1200px"
        mx="auto"
        position="relative"
        borderRadius="32px"
        overflow="hidden"
        boxShadow="0 24px 80px rgba(6, 24, 36, 0.16)"
        ref={mapContainerRef}
        bg="white"
        border="1px solid"
        borderColor="blackAlpha.100"
      >
        {loading && (
          <Center>
            <Spinner size="xl" position="absolute" top="50%" transform="translate(-50%, -50%)" zIndex="10" />
          </Center>
        )}
        <Box width="calc(100% - 16px)" height={height} m="8px" borderRadius="24px" overflow="hidden">
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
            mapboxAccessToken={env.mapboxToken}
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
            bg="brand.900"
            color="white"
            border="1px solid"
            borderColor="brand.900"
            _hover={{ bg: "accent.100", color: "brand.900", borderColor: "accent.100" }}
            _active={{ transform: 'scale(0.95)' }}
            rounded="full"
            shadow="lg"
            size="sm"
          >
            <FontAwesomeIcon icon={faExpand} />
          </Button>

          <Button
            onClick={() => setIsDarkMode(prev => !prev)}
            bg="brand.900"
            color="white"
            border="1px solid"
            borderColor="brand.900"
            _hover={{ bg: "accent.100", color: "brand.900", borderColor: "accent.100" }}
            _active={{ transform: 'scale(0.95)' }}
            rounded="full"
            shadow="lg"
            size="sm"
          >
            {isDarkMode ? "Light Map" : "Dark Map"}
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
