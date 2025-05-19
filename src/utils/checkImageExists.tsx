// src/utils/checkImageExists.ts

const checkImageExists = (baseFolder: string, folder: string): string[] => {
  const extensions = ['jpg', 'jpeg', 'png'];
  const images = [];

  const maxFiles = 20; // Scan up to image 20
  for (let i = 1; i <= maxFiles; i++) {
    for (const ext of extensions) {
      try {
        const imagePath = require(`../media/${baseFolder}/${folder}/${i}.${ext}`);
        images.push(imagePath);
        break; // Stop checking other extensions if found
      } catch (err) {
        // Continue to next extension
      }
    }
  }

  return images;
};


export const getFirstImage = (baseFolder: string, folder: string): string => {
  const images = checkImageExists(baseFolder, folder);
  return images.length > 0 ? images[0] : '';
};

export default checkImageExists;
