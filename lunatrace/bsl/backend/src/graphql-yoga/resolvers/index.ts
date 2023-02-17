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
import { GraphQLJSON, GraphQLUUID } from 'graphql-scalars';

import { Resolvers } from '../generated-resolver-types';

import { authenticatedRepoCloneUrlResolver } from './authenticated-repo-clone-url';
import { availableOrgsWithReposResolver } from './available-repos';
import { createPullRequestForVulnerabilityResolver } from './create-pull-request-for-vulnerability';
import { installSelectedReposResolver } from './install-selected-repos';
import { presignManifestUploadResolver } from './presign-manifest-upload';
import { presignSbomUploadResolver } from './presign-sbom-upload';
import { sbomUrlResolver } from './sbom-url';
import { vulnerableReleasesFromBuildResolver } from './vulnerable-releases-from-build';

export const resolvers: Resolvers = {
  Query: {
    presignSbomUpload: presignSbomUploadResolver,
    authenticatedRepoCloneUrl: authenticatedRepoCloneUrlResolver,
    sbomUrl: sbomUrlResolver,
    availableOrgsWithRepos: availableOrgsWithReposResolver,
    vulnerableReleasesFromBuild: vulnerableReleasesFromBuildResolver,
  },
  Mutation: {
    presignManifestUpload: presignManifestUploadResolver,
    installSelectedRepos: installSelectedReposResolver,
    createPullRequestForVulnerability: createPullRequestForVulnerabilityResolver,
  },
  uuid: GraphQLUUID,
  jsonb: GraphQLJSON,
};
