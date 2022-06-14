/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { Tokenizer } from './tokenizer';

// todo: figure out why typedoc for this interface isn't being generated
export interface SimpleTokenizerClientConfig {
  /** The address of the tokenizer backend */
  host: string;
  /** The base route of the tokenizer backend where routes have been added to your server, defaults to `/.lunasec` which is the default SimpleTokenizerBackend base route */
  baseRoute?: string;
  metaEncoding?: 'base64';
}
// strips down the methods of the tokenizer client to just the ones supported by the "simple" npm module
/**
 * Simple Tokenizer client for calling the Simple Tokenizer Backend running in your express app.  Does not interoperate with the rest of LunaSec's modules, just
 * a bare bones implementation of tokenization.
 */
export class SimpleTokenizer {
  private readonly tokenizer: Tokenizer;
  /**
   * @param config A configuration object.  You most likely only want to use the `host` parameter to point to your express backend.
   */
  constructor(config: SimpleTokenizerClientConfig) {
    if (!config.baseRoute) {
      config.baseRoute = '/.lunasec';
    }
    const url = new URL(config.baseRoute, config.host);
    this.tokenizer = new Tokenizer({ url: url.toString(), metaEncoding: config.metaEncoding });
  }

  tokenize(input: string | Buffer) {
    return this.tokenizer.tokenize(input, { dataType: 'string' });
  }

  detokenize(tokenId: string) {
    return this.tokenizer.detokenize(tokenId);
  }
}
