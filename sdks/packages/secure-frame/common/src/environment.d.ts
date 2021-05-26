declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECURE_FRAME_URL: string;
      REACT_APP_SECURE_FRAME_URL: string;
    }
  }
}

export {}
