const readEnv = (key: keyof ImportMetaEnv) => import.meta.env[key] || '';

export const env = {
  cloudFrontBaseUrl: readEnv('REACT_APP_CLOUDFRONT_BASE_URL'),
  fetchCoordinatesEndpoint: readEnv('REACT_APP_FETCH_COORDINATES_ENDPOINT'),
  mapboxToken: readEnv('REACT_APP_MAPBOX_TOKEN'),
  projectImagesEndpoint: readEnv('REACT_APP_PROJECT_IMAGES_ENDPOINT'),
  sendEmailEndpoint: readEnv('REACT_APP_SEND_EMAIL_ENDPOINT'),
};
