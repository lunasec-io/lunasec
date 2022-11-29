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
import { VulnerablePackage } from '../pages/project/builds/details/vulnerable-packages/types';

export function isDirectDep(pkg: VulnerablePackage): boolean {
  return pkg.chains.length === 1 && pkg.chains[0].length === 1;
}

export function formatPackageName(packageName: string): string {
  const nameOverflow = packageName && packageName.length > 41 ? '...' : '';
  const formattedPackageName = packageName?.substring(0, 40) || '';
  return formattedPackageName + nameOverflow;
}
