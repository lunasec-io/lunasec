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
interface IdentityTraits {
  name?: string;
  email: string; //lets assume this is always present, I guess
}

export function displayName(traits?: IdentityTraits, fullName = true): string {
  // maybe this will be the case for anonymous sessions someday, put here just in case
  if (!traits) {
    return 'Anonymous';
  }
  if ('name' in traits && traits.name) {
    return traits.name;
  }
  if (!traits.email) {
    return 'Anonymous';
  }
  return traits.email;
}
