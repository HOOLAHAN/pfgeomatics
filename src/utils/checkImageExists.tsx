// src/utils/checkImageExists.ts

const checkImageExists = (folder: string): string => {
  const extensions = ['jpg', 'jpeg', 'png'];
  for (const ext of extensions) {
    try {
      const imagePath = require(`../media/projectImages/${folder}/1.${ext}`);
      return imagePath;
    } catch (err) {
    }
  }
  return '';
};

export default checkImageExists;
