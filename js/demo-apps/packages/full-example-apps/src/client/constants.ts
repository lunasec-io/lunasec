// defined in webpack.config.ts
// @ts-ignore
export const tokenizerType = TOKENIZER_TYPE;
// @ts-ignore
export const exampleApplicationName = EXAMPLE_APPLICATION_NAME;

export const tokenizerDescriptionLookup: Record<string, string> = {
  'dedicated-tokenizer': 'With a dedicated tokenizer, the tokenizer runs as a standalone service.',
  'embedded-tokenizer': 'With an embedded tokenizer, the tokenizer runs inside of your existing application.',
};

export const lunaSecDomain = 'http://localhost:37766';
