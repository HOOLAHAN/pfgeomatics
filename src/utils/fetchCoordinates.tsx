// src/utils/fetchCoordinates.tsx
import { env } from '../config/env';

interface Coordinate {
  postcode: string;
  latitude: number;
  longitude: number;
}

export const fetchCoordinates = async (postcodes: string[]): Promise<Coordinate[]> => {
  try {
    if (!env.fetchCoordinatesEndpoint) {
      throw new Error('Missing fetch coordinates endpoint');
    }

    const response = await fetch(env.fetchCoordinatesEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ postcodes })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    
    if (!Array.isArray(data)) {
      throw new Error('Invalid data format returned from API');
    }

    return data as Coordinate[];
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    throw error;
  }
};
