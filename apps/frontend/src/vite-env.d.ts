interface ImportMetaEnv {
  readonly VITE_WHITEBOARD_BACKEND_BASE_URL: string;
  readonly VITE_REPO_VULGARITY_ANALYSIS_BACKEND_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
