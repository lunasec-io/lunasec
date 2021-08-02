import { Tokenizer } from './tokenizer';
import { MetaData, TokenizerClientConfig } from './types';

// strips down the methods of the tokenizer client to just the ones supported by the "simple" npm module
export class SimpleTokenizer {
  private readonly tokenizer: Tokenizer;
  constructor(config?: Partial<TokenizerClientConfig>) {
    if (!config) {
      config = {};
    }
    if (!config.baseRoute) {
      config.baseRoute = '.lunasec';
    }
    this.tokenizer = new Tokenizer(config);
  }

  tokenize(input: string | Buffer) {
    return this.tokenizer.tokenize(input, { dataType: 'string' });
  }
  detokenize(tokenId: string) {
    return this.tokenizer.detokenize(tokenId);
  }
  //  consider supporting this if it isn't too hard to get working
  // getMetadata(tokenId: string) {
  //   return this.tokenizer.getMetadata(tokenId);
  // }
}
