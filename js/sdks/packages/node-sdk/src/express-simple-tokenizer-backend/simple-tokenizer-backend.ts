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
import { Hash } from '@aws-sdk/hash-node';
import { HttpRequest } from '@aws-sdk/protocol-http';
import { S3RequestPresigner, S3RequestPresignerOptions } from '@aws-sdk/s3-request-presigner';
import { parseUrl } from '@aws-sdk/url-parser';
import { formatUrl } from '@aws-sdk/util-format-url';
import { isToken } from '@lunasec/tokenizer-sdk';
import { Application } from 'express';

import { registerExpressMiddleware } from './express-middleware';

// TODO: (forrest) Unsure the purpose of this credential type since we do not use it and unwrap a type out of s3 instead
export interface AwsCredentials {
  accessKeyId: string;
  secretAccessKey: string;
}

export interface SimpleTokenizerBackendConfig {
  /** The bucket name where ciphertext(encrypted secure data) will be store.  We recommend encrypting this bucket in your s3 settings */
  s3Bucket: string;
  /** The region of the above bucket */
  awsRegion: string;
  /** Provide Aws credentials. Expects an AWS Credentials object */
  awsCredentials: S3RequestPresignerOptions['credentials'];
  /** Override the production AWS URL with a localstack url on port 4566, useful for development */
  useLocalStack?: boolean;
}

/**
 * The Simple Tokenizer backend.  Does not interoperate with the rest of LunaSec's modules except the SimpleTokenizer.  A simple, paired down version of tokenization that is hosted
 * right on your existing express server.
 */
export class SimpleTokenizerBackend {
  constructor(readonly config: SimpleTokenizerBackendConfig) {}

  private generateAWSBaseUrl() {
    if (this.config.useLocalStack) {
      return `http://localhost:4566/${this.config.s3Bucket}`;
    }

    return `https://${this.config.s3Bucket}.s3.${this.config.awsRegion}.amazonaws.com`;
  }
  private async generatePresignedS3Url(tokenId: string, method: 'PUT' | 'GET') {
    if (!isToken(tokenId)) {
      throw new Error('Invalid token passed to simple express tokenizer backend');
    }

    const credentials = this.config.awsCredentials;

    const signer = new S3RequestPresigner({
      region: this.config.awsRegion,
      credentials: credentials,
      sha256: Hash.bind(null, 'sha256'), // In Node.js
    });
    const baseUrl = this.generateAWSBaseUrl();
    const url = parseUrl(`${baseUrl}/${tokenId}`);

    const signedUrl = await signer.presign(
      new HttpRequest({
        ...url,
        method: method,
      })
    );

    return {
      url: formatUrl(signedUrl),
      headers: signedUrl.headers,
    };
  }

  getTokenPresignedUrl(tokenId: string) {
    return this.generatePresignedS3Url(tokenId, 'GET');
  }

  createTokenPresignedUrl(tokenId: string) {
    return this.generatePresignedS3Url(tokenId, 'PUT');
  }

  register(app: Application) {
    if (!this.config) {
      throw new Error('You must configure SimpleTokenizerBackend');
    }

    registerExpressMiddleware(app, this); // This pattern works but it would probably make more sense to have this class beneath the middleware instead of on top
  }
}
