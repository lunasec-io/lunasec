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
import { GetBuildDetailsQuery } from '../../../api/generated';
import { DependencyTree } from '../../../dependency-tree/builds-dependency-tree';
import { DependencyChain } from '../../../dependency-tree/types';

export type BuildDetailInfo = NonNullable<GetBuildDetailsQuery['builds_by_pk']>;
export type DependencyRelationshipInfo = NonNullable<BuildDetailInfo['flat_dependencies']>[number];

export interface QuickViewProps {
  setVulnQuickViewId: (vulnId: string) => void;
  vulnQuickViewId: string | null;
}

export type DepTree = DependencyTree<DependencyRelationshipInfo>;
export type DepChains = DependencyChain<DependencyRelationshipInfo>[];
