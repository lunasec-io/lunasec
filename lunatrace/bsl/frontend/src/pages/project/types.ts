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
import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods';

import { GetBuildLogsQuery, GetProjectQuery } from '../../api/generated';

type MaybeProjectInfo = GetProjectQuery['projects_by_pk'];
export type ProjectInfo = NonNullable<MaybeProjectInfo>;

export type BuildInfo = ProjectInfo['builds'][number];
export type BuildLogs = GetBuildLogsQuery['build_log'];

export type TabName = 'builds' | 'secrets' | 'dashboard' | 'settings' | 'trace';
export type SetActiveTab = (tabName: TabName) => void;

export type GithubTraits =
  RestEndpointMethodTypes['apps']['listReposAccessibleToInstallation']['response']['data']['repositories'][number];
