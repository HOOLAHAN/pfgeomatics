// src/utils/fetchImageUrls.ts
import { env } from '../config/env';

export const fetchImageUrls = async (folder: string, subfolder: string): Promise<string[]> => {
  try {
    if (!env.projectImagesEndpoint) {
      throw new Error('Missing project images endpoint');
    }

    const params = new URLSearchParams({ folder, subfolder });
    const url = `${env.projectImagesEndpoint}?${params.toString()}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.imageUrls || [];
  } catch (error) {
    console.error('Failed to fetch image URLs', error);
    return [];
  }
};
