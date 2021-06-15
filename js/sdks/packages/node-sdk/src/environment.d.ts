declare global {
  namespace NodeJS {
    interface ProcessEnv {
      LUNASEC_DEPLOYMENT_SERVER_URL: string;
      LUNASEC_DEPLOYMENT_SECRET: string;
      LUNASEC_CONTAINER_SECRET: string;
      LUNASEC_SIGNING_KEY: string;
    }
  }
}

export {}
