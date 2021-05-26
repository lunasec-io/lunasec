
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKENIZER_URL: string;
      CLIENT_SECRET: string;
    }
  }
}

export {}
