import React, { useEffect, useState, useRef } from 'react';
import ReactMapGL, { Marker, ViewStateChangeEvent } from 'react-map-gl';
import { Box, Button, useDisclosure, useColorModeValue, useBreakpointValue, Spinner, Center } from '@chakra-ui/react';
import { fetchCoordinates } from '../utils/fetchCoordinates';
import { projectsData } from '../data/projectsData';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../css/MapComponent.css';
import { LngLatBounds } from 'mapbox-gl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faSearchMinus } from '@fortawesome/free-solid-svg-icons';
import ProjectModal from './ProjectModal';
import checkImageExists from '../utils/checkImageExists';
import MapModal from './MapModal';

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
  const height = useBreakpointValue({ base: '45vh', md: '75vh' });
  const brandColour = 'brand.400';
  const mapStyle = useColorModeValue('mapbox://styles/mapbox/streets-v11', 'mapbox://styles/mapbox/dark-v10');

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null); // To hold the map instance

  const [viewport, setViewport] = useState({
    latitude: 51.5074, // Default to London
    longitude: -0.1278,
    zoom: 10,
    width: '100%',
    height: '100%'
  });
  const [projects, setProjects] = useState<ProjectWithCoordinates[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectWithCoordinates | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const [isProjectModalOpen, setProjectModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchAndSetCoordinates = async () => {
      try {
        const postcodes = projectsData.map(p => p.postcode);
        const coordinates = await fetchCoordinates(postcodes);

        const updatedProjects: ProjectWithCoordinates[] = await Promise.all(
          projectsData.map(async (project) => {
            const coordinate = coordinates.find(c => c.postcode === project.postcode);
            const imageUrls = checkImageExists('projectImages', project.imageFolder);
            const thumbnail = imageUrls.length > 0 ? imageUrls[0] : undefined;

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
        setLoading(false); // Set loading to false after data has been fetched and set
      } catch (error) {
        console.error('Error fetching coordinates:', error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchAndSetCoordinates();
  }, [initialLoad]);

  // Ensure the map resizes correctly after the initial render
  useEffect(() => {
    if (mapContainerRef.current) {
      setViewport(prevViewport => ({
        ...prevViewport,
        height: `${mapContainerRef.current!.clientHeight}px`
      }));
      if (mapRef.current) {
        mapRef.current.resize();
      }
    }
  }, [height]);

  const handleMarkerClick = (project: ProjectWithCoordinates) => {
    setSelectedProject(project);
    onOpen();
  };

  const handleMoreInfoClick = () => {
    onClose();
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
      const zoom = Math.min(14, Math.log2(360 / (ne.lng - sw.lng)) - 1); // Slightly zoom out

      setViewport(prevViewport => ({
        ...prevViewport,
        latitude: center[1],
        longitude: center[0],
        zoom
      }));
    }
  };

  return (
    <Box width="100%" maxW="1200px" mx="auto" position="relative" p={5} borderRadius="lg" overflow="hidden" ref={mapContainerRef}>
      {loading && (
        <Center><Spinner
          size="xl"
          position="absolute"
          top="50%"
          transform="translate(-50%, -50%)"
          zIndex="10"
        /></Center>
      )}
      <Box width="calc(100% - 10px)" height={height} m="5px" position="relative" borderRadius="lg" overflow="hidden">
        <ReactMapGL
          ref={mapRef}
          {...viewport}
          mapStyle={mapStyle}
          onMove={(evt: ViewStateChangeEvent) => 
            setViewport((prevViewport) => ({
              ...prevViewport,
              ...evt.viewState
            }))
          }
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        >
          {projects.map((project, index) => (
            project.latitude !== 0 && project.longitude !== 0 ? (
              <Marker
                key={index}
                latitude={project.latitude}
                longitude={project.longitude}
              >
                <button
                  className="marker-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    handleMarkerClick(project);
                  }}
                >
                  <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" color={brandColour} />
                </button>
              </Marker>
            ) : null
          ))}
        </ReactMapGL>
      </Box>

      <Button
        position="absolute"
        top="40px"
        right="40px"
        onClick={() => fitBounds(projects)}
        bg="white"
        color="black"
        _hover={{ bg: "gray.100" }}
      >
        <FontAwesomeIcon icon={faSearchMinus} />
      </Button>

      <MapModal
        project={selectedProject}
        isOpen={isOpen}
        onClose={onClose}
        onMoreInfoClick={handleMoreInfoClick}
      />

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={isProjectModalOpen}
          onClose={() => setProjectModalOpen(false)}
        />
      )}
    </Box>
  );
};

export default MapComponent;
