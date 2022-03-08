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
if (!process.env.S3_SBOM_BUCKET && process.env.NODE_ENV === 'production') {
  throw new Error('Missing S3_SBOM_BUCKET env var');
}

export const sbomBucket = process.env.S3_SBOM_BUCKET || 'sbom-test-bucket';

if (!process.env.S3_MANIFEST_BUCKET && process.env.NODE_ENV === 'production') {
  throw new Error('Missing S3_MANIFEST_BUCKET env var');
}

export const manifestBucket = process.env.S3_MANIFEST_BUCKET || 'test-manifest-bucket-one';
