/*
 * Copyright by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Business Source License v1.1
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { Readable } from 'stream';

import { GetObjectCommand, GetObjectCommandOutput, S3Client } from '@aws-sdk/client-s3';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { Hash } from '@aws-sdk/hash-node';
import { HttpRequest } from '@aws-sdk/protocol-http';
import { S3RequestPresigner, S3RequestPresignerOptions } from '@aws-sdk/s3-request-presigner';
import { HeaderBag } from '@aws-sdk/types';
import { parseUrl } from '@aws-sdk/url-parser';
import { formatUrl } from '@aws-sdk/util-format-url';
export interface AwsCredentials {
  accessKeyId: string;
  secretAccessKey: string;
}

export interface PreSignedUrlGeneratorConfig {
  /** The bucket name where ciphertext(encrypted secure data) will be store.  We recommend encrypting this bucket in your s3 settings */
  /** The region of the above bucket */
  awsRegion: string;
  /** Provide Aws credentials. Expects an AWS Credentials object */
  awsCredentials: S3RequestPresignerOptions['credentials'];
  /** Override the production AWS URL with a localstack url on port 4566, useful for development */
  useLocalStack?: boolean;
  redirectToLocalhost?: boolean;
}

if (process.env.NODE_ENV === 'production' && !process.env.AWS_DEFAULT_REGION) {
  throw new Error('Must set AWS_DEFAULT_REGION in production');
}

const awsRegion = process.env.AWS_DEFAULT_REGION || 'us-west-2';

export class AwsUtils {
  constructor(readonly config: PreSignedUrlGeneratorConfig) {}

  private generateAWSBaseUrl(bucket: string) {
    if (this.config.useLocalStack) {
      if (this.config.redirectToLocalhost) {
        return `http://localhost:4566/${bucket}`;
      }
      return `http://localstack:4566/${bucket}`;
    }

    return `https://${bucket}.s3.${this.config.awsRegion}.amazonaws.com`;
  }

  public async streamToString(stream: GetObjectCommandOutput['Body']): Promise<string> {
    if (!(stream instanceof Readable)) {
      throw new Error('S3 load stream is of wrong type');
    }
    const chunks: Buffer[] = [];
    return new Promise((resolve, reject) => {
      stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
      stream.on('error', (err) => reject(err));
      stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });
  }

  public async getFileFromS3(key: string, bucket: string): Promise<GetObjectCommandOutput['Body']> {
    const s3Client = new S3Client({ region: this.config.awsRegion, credentials: this.config.awsCredentials });
    const { Body } = await s3Client.send(new GetObjectCommand({ Key: key, Bucket: bucket })); // gosh what a bad API
    // const fileString = await this.streamToString(Body);
    return Body;
  }

  async generatePresignedS3Url(
    bucket: string,
    id: string,
    method: 'PUT' | 'GET'
  ): Promise<{ url: string; headers: HeaderBag }> {
    const credentials = this.config.awsCredentials;

    const signer = new S3RequestPresigner({
      region: this.config.awsRegion,
      credentials: credentials,
      sha256: Hash.bind(null, 'sha256'), // In Node.js
    });
    const baseUrl = this.generateAWSBaseUrl(bucket);

    const url = parseUrl(`${baseUrl}/${id}`);

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
}

// Just preconfigure things so we dont have to do this everywhere
export const aws = new AwsUtils({
  awsCredentials: defaultProvider(),
  awsRegion,
});
