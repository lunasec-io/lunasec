declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_SECURE_FRAME_URL: string;
    }
  }
}

export {}
