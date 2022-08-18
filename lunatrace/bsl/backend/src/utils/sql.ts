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
type QueryReducerArray = [string, any[], number];

export function convertNamedInsertValues(parameterizedSql: string, params: Record<string, any>) {
  const [text, values] = Object.entries(params).reduce(
    ([sql, array, index], [key, value]) =>
      [sql.replace(`:${key}`, `$${index}`), [...array, value], index + 1] as QueryReducerArray,
    [parameterizedSql, [], 1] as QueryReducerArray
  );
  return { text, values };
}
