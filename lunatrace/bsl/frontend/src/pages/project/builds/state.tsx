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
import { QuickViewCwe, QuickViewState, QuickViewVulnerability } from './types';

export function vulnerabilityOpenInQuickView(state: QuickViewState | null, vulnId: string): boolean {
  if (state === null) {
    return false;
  }
  return state.type === 'vulnerability' && state.id === vulnId;
}

export function vulnerabilityQuickViewState(id: string): QuickViewVulnerability {
  return {
    type: 'vulnerability',
    id,
  };
}

export function cweQuickViewState(id: number): QuickViewCwe {
  return {
    type: 'cwe',
    id,
  };
}
