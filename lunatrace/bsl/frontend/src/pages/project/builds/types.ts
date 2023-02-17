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
import { GetBuildDetailsQuery, GetCweDetailsQuery, GetCweDetailsQueryVariables } from '../../../api/generated';

export type BuildDetailInfo = NonNullable<GetBuildDetailsQuery['builds_by_pk']>;

export interface QuickViewVulnerability {
  type: 'vulnerability';
  id: string;
}

export interface QuickViewCwe {
  type: 'cwe';
  id: number;
}

export type QuickViewState = QuickViewVulnerability | QuickViewCwe;

export interface QuickViewProps {
  setQuickViewState: (state: QuickViewState | null) => void;
  quickViewState: QuickViewState | null;
}

export type CweInfoDetails = NonNullable<GetCweDetailsQuery['vulnerability_cwe_by_pk']>;
