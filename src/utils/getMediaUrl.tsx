// src/utils/getMediaUrl.ts
import { env } from '../config/env';

export const getMediaUrl = (folder: string, filename: string) =>
  `${env.cloudFrontBaseUrl}/${folder}/${filename}`;
