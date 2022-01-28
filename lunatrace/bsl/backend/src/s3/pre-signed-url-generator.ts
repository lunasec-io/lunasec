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
  s3Bucket: string;
  /** The region of the above bucket */
  awsRegion: string;
  /** Provide Aws credentials. Expects an AWS Credentials object */
  awsCredentials: S3RequestPresignerOptions['credentials'];
  /** Override the production AWS URL with a localstack url on port 4566, useful for development */
  useLocalStack?: boolean;
  redirectToLocalhost?: boolean;
}

export class PreSignedUrlGenerator {
  constructor(readonly config: PreSignedUrlGeneratorConfig) {}

  private generateAWSBaseUrl() {
    if (this.config.useLocalStack) {
      if (this.config.redirectToLocalhost) {
        return `http://localhost:4566/${this.config.s3Bucket}`;
      }
      return `http://localstack:4566/${this.config.s3Bucket}`;
    }

    return `https://${this.config.s3Bucket}.s3.${this.config.awsRegion}.amazonaws.com`;
  }

  async generatePresignedS3Url(id: string, method: 'PUT' | 'GET'): Promise<{ url: string; headers: HeaderBag }> {
    const credentials = this.config.awsCredentials;

    const signer = new S3RequestPresigner({
      region: this.config.awsRegion,
      credentials: credentials,
      sha256: Hash.bind(null, 'sha256'), // In Node.js
    });
    const baseUrl = this.generateAWSBaseUrl();

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
