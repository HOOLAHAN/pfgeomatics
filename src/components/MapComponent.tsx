// src/components/MapComponent.tsx

import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup, ViewStateChangeEvent } from 'react-map-gl';
import { Box } from '@chakra-ui/react';
import { fetchCoordinates } from '../utils/fetchCoordinates';
import { projectsData } from '../data/projectsData';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../css/MapComponent.css';

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

const MapComponent: React.FC = () => {
  const [viewport, setViewport] = useState({
    latitude: 51.5074, // Default to London
    longitude: -0.1278,
    zoom: 10,
    width: '100vw',
    height: '100vh'
  });
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchAndSetCoordinates = async () => {
      try {
        const postcodes = projectsData.map(p => p.postcode);
        const coordinates = await fetchCoordinates(postcodes);

        const updatedProjects = projectsData.map((project) => {
          const coordinate = coordinates.find(c => c.postcode === project.postcode);
          if (coordinate) {
            return {
              ...project,
              latitude: coordinate.latitude,
              longitude: coordinate.longitude
            };
          } else {
            console.warn(`No coordinates found for postcode: ${project.postcode}`);
            return project;
          }
        });

        setProjects(updatedProjects);
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    };

    fetchAndSetCoordinates();
  }, []);

  return (
    <Box width="100%" height="40vh" maxW="1200px" mx="auto" position="relative">
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
        {projects.map((project, index) =>
          project.latitude !== undefined && project.longitude !== undefined ? (
            <Marker
              key={index}
              latitude={project.latitude}
              longitude={project.longitude}
            >
              <button
                className="marker-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedProject(project);
                }}
              >
                <img src="/A1.png" alt="Project Pin" />
              </button>
            </Marker>
          ) : null
        )}

        {selectedProject && (
          <Popup
            latitude={selectedProject.latitude!}
            longitude={selectedProject.longitude!}
            onClose={() => setSelectedProject(null)}
          >
            <div>
              <h2>{selectedProject.name}</h2>
              <p>{selectedProject.description}</p>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </Box>
  );
};

export default MapComponent;
