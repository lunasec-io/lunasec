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
import { createBuildAndGenerateSbomFromManifest } from '../../../snapshot/generate-snapshot';
import { S3ObjectMetadata } from '../../../types/s3';
import { SbomBucketInfo } from '../../../types/scan';
import { MaybeError } from '../../../types/util';
import { newError, newResult } from '../../../utils/errors';
import { log } from '../../../utils/log';
import { catchError, threwError } from '../../../utils/try';

export async function snapshotManifestActivity(message: S3ObjectMetadata): Promise<MaybeError<undefined>> {
  const { key, bucketName, region } = message;

  const bucketInfo: SbomBucketInfo = {
    key,
    bucketName,
    region,
  };

  // let hasura know we are starting the process, so it ends up in the UI.  Also will throw if there is no manifest
  const hasuraRes = await hasura.UpdateManifest({ key_eq: bucketInfo.key, set_status: 'sbom-processing' });
  const manifest = hasuraRes.update_manifests?.returning[0];
  if (!manifest) {
    throw new Error('Failed to find manifest matching SBOM, exiting');
  }

  // Create a new build
  const { insert_builds_one } = await hasura.InsertBuild({
    build: { project_id: manifest.project_id, source_type: 'gui' },
  });
  log.info('hasura returned when inserting build ', insert_builds_one);
  if (!insert_builds_one || !insert_builds_one.id) {
    throw new Error('Failed to insert a new build');
  }
  const buildId = insert_builds_one.id as string;

  return await log.provideFields({ ...bucketInfo, buildId }, async () => {
    try {
      await createBuildAndGenerateSbomFromManifest(
        manifest.project.organization_id,
        buildId,
        manifest.filename,
        bucketInfo
      );
      return newResult(undefined);
    } catch (e) {
      log.error('Unable to generate SBOM from Manifest', {
        error: e,
      });
      // last ditch attempt to write an error to show in the UX..may or may not work depending on what the issue is
      const res = await catchError(hasura.UpdateManifest({ key_eq: key, set_status: 'error', message: String(e) }));
      if (threwError(res)) {
        log.error('unable to update manifest to reflect that an error occured', {
          key,
          error: res.message,
        });
        return newError(res.message);
      }
      return newError(String(e));
    }
  });
}
