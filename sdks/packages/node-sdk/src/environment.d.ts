declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECURE_RESOLVER_URL: string;
    }
  }
}

export {}
