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
// This handler is currently only triggered when someone drags and drops a file on the frontend
import { hasura } from '../../../hasura-api';
import { createBuildAndGenerateSbom } from '../../../snapshot/generate-snapshot';
import { S3ObjectMetadata } from '../../../types/s3';
import { SbomBucketInfo } from '../../../types/scan';
import { MaybeError } from '../../../types/util';
import { newError, newResult } from '../../../utils/errors';
import { log } from '../../../utils/log';
import { catchError, threwError } from '../../../utils/try';

async function attemptGenerateManifestSbom(bucketInfo: SbomBucketInfo) {
  // let hasura know we are starting the process, so it ends up in the UI.  Also will throw if there is no manifest
  const hasuraRes = await hasura.UpdateManifest({ key_eq: bucketInfo.key, set_status: 'sbom-processing' });
  const manifest = hasuraRes.update_manifests?.returning[0];
  if (!manifest) {
    throw new Error('Failed to find manifest matching SBOM, exiting');
  }

  const buildId = await createBuildAndGenerateSbom(
    manifest.project.organization_id,
    manifest.project_id,
    manifest.filename,
    bucketInfo
  );

  // update the manifest status
  await hasura.UpdateManifest({ key_eq: bucketInfo.key, set_status: 'sbom-generated', build_id: buildId });
}

export async function snapshotManifestActivity(message: S3ObjectMetadata): Promise<MaybeError<undefined>> {
  const { key, bucketName, region } = message;

  const bucketInfo: SbomBucketInfo = {
    key,
    bucketName,
    region,
  };

  return await log.provideFields({ ...bucketInfo }, async () => {
    try {
      await attemptGenerateManifestSbom(bucketInfo);
      return newResult(undefined);
    } catch (e) {
      log.error('Unable to generate SBOM from Manifest', e);
      // last ditch attempt to write an error to show in the UX..may or may not work depending on what the issue is
      const res = await catchError(hasura.UpdateManifest({ key_eq: key, set_status: 'error', message: String(e) }));
      if (threwError(res)) {
        log.error('unable to update manifest to reflect that an error occured', {
          key,
          error: e,
        });
      }

      return newError(threwError(e) ? e.message : String(e));
    }
  });
}
