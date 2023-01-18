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
import { AssetImageProps } from 'aws-cdk-lib/aws-ecs';

export const commonBuildProps: AssetImageProps = {
  invalidation: {
    buildArgs: false,
  },
  // TODO (cthompson) for some reason, if we don't invalidate the docker cache every deploy otherwise old containers will be used...
  extraHash: (Math.random() + 1).toString(36).substring(7),
};

// All other environment configs should inherit from this shared one
export const baseEnvironmentVars = {
  LUNATRACE_ENVIRONMENT: 'production',
};
