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

import { get } from './stack-trace';

import { LunaLogger } from './index';

export function getCallSite(): { stack: string[] } {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const callsites = get(LunaLogger.prototype.dolog).slice(1); // get up out of the logging library with slice
  const prettyStack = callsites.map((site) => {
    const filename = site.getFileName();
    const line = site.getLineNumber();
    const column = site.getColumnNumber();
    const fileLink = `file://${filename}:${line}:${column}`;

    const funcName = site.getFunctionName() || 'anonymous function';
    return `at ${funcName} in ${fileLink}`;
  });
  // This is kind of weak because the first few lines will be the logger, would be better to rebuild the stack manually without those
  return { stack: prettyStack };
}
