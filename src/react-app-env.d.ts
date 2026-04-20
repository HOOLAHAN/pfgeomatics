/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly REACT_APP_CLOUDFRONT_BASE_URL?: string;
  readonly REACT_APP_FETCH_COORDINATES_ENDPOINT?: string;
  readonly REACT_APP_MAPBOX_TOKEN?: string;
  readonly REACT_APP_PROJECT_IMAGES_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
