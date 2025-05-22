// src/utils/fetchImageUrls.ts
export const fetchImageUrls = async (folder: string, subfolder: string): Promise<string[]> => {
  try {
    const url = `https://3q7vxypn08.execute-api.eu-west-2.amazonaws.com/project-images?folder=${folder}&subfolder=${subfolder}`;
    console.log(url)
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    return data.imageUrls || [];
  } catch (error) {
    console.error('Failed to fetch image URLs', error);
    return [];
  }
};
