import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, ViewStateChangeEvent } from 'react-map-gl';
import { Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure, useColorModeValue } from '@chakra-ui/react';
import { fetchCoordinates } from '../utils/fetchCoordinates';
import { projectsData } from '../data/projectsData';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../css/MapComponent.css';
import { LngLatBounds } from 'mapbox-gl';

interface Project {
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
}

type ProjectWithCoordinates = Project & {
  latitude: number;
  longitude: number;
};

const MapComponent: React.FC = () => {
  const buttonBorderColor = useColorModeValue('black', 'white');
  const buttonTextColor = useColorModeValue('black', 'white');
  const buttonHoverBg = useColorModeValue('gray.200', 'whiteAlpha.300');

  const [viewport, setViewport] = useState({
    latitude: 51.5074, // Default to London
    longitude: -0.1278,
    zoom: 10,
    width: '100vw',
    height: '100vh'
  });
  const [projects, setProjects] = useState<ProjectWithCoordinates[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectWithCoordinates | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchAndSetCoordinates = async () => {
      try {
        const postcodes = projectsData.map(p => p.postcode);
        const coordinates = await fetchCoordinates(postcodes);

        const updatedProjects: ProjectWithCoordinates[] = projectsData.map((project) => {
          const coordinate = coordinates.find(c => c.postcode === project.postcode);
          if (coordinate) {
            return {
              ...project,
              latitude: coordinate.latitude,
              longitude: coordinate.longitude
            };
          } else {
            console.warn(`No coordinates found for postcode: ${project.postcode}`);
            return {
              ...project,
              latitude: 0,
              longitude: 0
            };
          }
        });

        setProjects(updatedProjects);

        if (initialLoad) {
          // Calculate bounds
          const bounds = new LngLatBounds();
          updatedProjects.forEach(project => {
            if (project.latitude && project.longitude) {
              bounds.extend([project.longitude, project.latitude]);
            }
          });

          if (!bounds.isEmpty()) {
            // Fit the map to the bounds initially
            const { _ne: ne, _sw: sw } = bounds;
            const center = [(ne.lng + sw.lng) / 2, (ne.lat + sw.lat) / 2];
            const zoom = Math.min(14, Math.log2(360 / (ne.lng - sw.lng)) - 1);

            setViewport(prevViewport => ({
              ...prevViewport,
              latitude: center[1],
              longitude: center[0],
              zoom
            }));
            setInitialLoad(false);
          }
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    };

    fetchAndSetCoordinates();
  }, [initialLoad]);

  const handleMarkerClick = (project: ProjectWithCoordinates) => {
    setSelectedProject(project);
    onOpen();
  };

  return (
    <Box width="100%" height="65vh" maxW="1200px" mx="auto" position="relative" p={5} borderRadius="lg" overflow="hidden">
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
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
                <img src="/A1.png" alt="Project Pin" />
              </button>
            </Marker>
          ) : null
        ))}
      </ReactMapGL>

      {selectedProject && (
        <Modal isOpen={isOpen} onClose={onClose} size="sm">
          <ModalOverlay />
          <ModalContent m={3}>
            <ModalHeader>{selectedProject.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p><strong>Client:</strong> {selectedProject.client}</p>
              <p><strong>Duration:</strong> {selectedProject.dateStarted} - {selectedProject.dateEnded}</p>
            </ModalBody>
            <ModalFooter>
            <Button
              size="sm"
              variant="outline"
              borderColor={buttonBorderColor}
              color={buttonTextColor}
              _hover={{ bg: buttonHoverBg }}
              _active={{ bg: buttonHoverBg, transform: 'scale(0.95)' }}
              transition="all 0.2s ease-in-out"
              onClick={onClose}
          >
            Close
          </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default MapComponent;
