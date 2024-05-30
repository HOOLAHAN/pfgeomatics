// src/utils/checkImageExists.ts

const checkImageExists = (baseFolder: string, folder: string): string[] => {
  const extensions = ['jpg', 'jpeg', 'png'];
  const images = [];
  for (let i = 1; ; i++) {
    let found = false;
    for (const ext of extensions) {
      try {
        const imagePath = require(`../media/${baseFolder}/${folder}/${i}.${ext}`);
        images.push(imagePath);
        found = true;
        break;
      } catch (err) {
        // Continue to next extension
      }
    }
    if (!found) {
      break;
    }
  }
  return images;
};

export const getFirstImage = (baseFolder: string, folder: string): string => {
  const images = checkImageExists(baseFolder, folder);
  return images.length > 0 ? images[0] : '';
};

export default checkImageExists;
