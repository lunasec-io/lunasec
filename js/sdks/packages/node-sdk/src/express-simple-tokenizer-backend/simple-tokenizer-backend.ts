import { Hash } from '@aws-sdk/hash-node';
import { HttpRequest } from '@aws-sdk/protocol-http';
import { S3RequestPresigner, S3RequestPresignerOptions } from '@aws-sdk/s3-request-presigner';
import { parseUrl } from '@aws-sdk/url-parser';
import { formatUrl } from '@aws-sdk/util-format-url';
import { isToken } from '@lunasec/tokenizer-sdk';
import { Application } from 'express';

import { registerExpressMiddleware } from './express-middleware';

export interface AwsCredentials {
  accessKeyId: string;
  secretAccessKey: string;
}

export interface SimpleTokenizerBackendConfig {
  s3Bucket: string;
  awsRegion: string;
  awsCredentials?: S3RequestPresignerOptions['credentials'];
  getAwsCredentials?: () => Promise<S3RequestPresignerOptions['credentials']>;
}

export class SimpleTokenizerBackend {
  // config is optional and we throw and run-time if someone tries to register this part of lunasec without configuring it in the main options
  readonly config?: SimpleTokenizerBackendConfig;
  constructor(config?: SimpleTokenizerBackendConfig) {
    this.config = config;
  }

  async getAwsCredentials() {
    if (!this.config) {
      throw new Error('Simple tokenizer backend is not configured');
    }
    if (this.config.awsCredentials) {
      return this.config.awsCredentials;
    }

    if (!this.config.getAwsCredentials) {
      throw new Error('Unable to call get AWS Credentials');
    }

    const credentials = await this.config.getAwsCredentials();

    if (!credentials) {
      throw new Error('Missing AWS credentials');
    }

    this.config.awsCredentials = credentials;

    return credentials;
  }

  async generatePresignedS3Url(tokenId: string, method: 'PUT' | 'GET') {
    if (!this.config) {
      throw new Error('Simple tokenizer backend is not configured');
    }
    if (!isToken(tokenId)) {
      throw new Error('Invalid token passed to simple express tokenizer backend');
    }

    const credentials = await this.getAwsCredentials();

    const signer = new S3RequestPresigner({
      region: this.config.awsRegion,
      credentials: credentials,
      sha256: Hash.bind(null, 'sha256'), // In Node.js
    });

    const url = parseUrl(`https://${this.config.s3Bucket}.s3.${this.config.awsRegion}.amazonaws.com/${tokenId}`);

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
      throw new Error(
        'You must set simpleTokenizerBackendConfig in your lunasec configuration if you want to register the SimpleTokenizerBackend on your express app'
      );
    }

    if (this.config.awsCredentials && this.config.getAwsCredentials) {
      throw new Error('Cannot set both credentials and getCredentials');
    }

    if (!this.config.awsCredentials && !this.config.getAwsCredentials) {
      throw new Error('Must set credentials or getAwsCredentials');
    }
    registerExpressMiddleware(app, this); // This pattern works but it would probably make more sense to have this class beneath the middleware instead of on top
  }
}
