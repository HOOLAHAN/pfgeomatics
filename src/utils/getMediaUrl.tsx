// src/utils/getMediaUrl.ts
const CLOUDFRONT_BASE_URL = process.env.REACT_APP_CLOUDFRONT_BASE_URL

export const getMediaUrl = (folder: string, filename: string) =>
  `${CLOUDFRONT_BASE_URL}/${folder}/${filename}`;
