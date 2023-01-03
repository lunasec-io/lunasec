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

import { GetVulnerableReleasesFromBuildQuery } from '../../../../../api/generated';

export type VulnerablePackage = NonNullable<
  NonNullable<GetVulnerableReleasesFromBuildQuery>['vulnerableReleasesFromBuild']
>[number];

export type Chain = NonNullable<
  NonNullable<GetVulnerableReleasesFromBuildQuery>['vulnerableReleasesFromBuild']
>[number]['chains'][number];

export type Guide = VulnerablePackage['guides'][number];

export type VulnMeta = VulnerablePackage['affected_by'][number];

export type ChainDepType = NonNullable<
  NonNullable<GetVulnerableReleasesFromBuildQuery>['vulnerableReleasesFromBuild']
>[number]['chains'][number][number];
