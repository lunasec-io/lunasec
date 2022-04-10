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
// Believe me, using this module without types is far less hacky than the alternative of doing this ourselves
// this seems pretty temperamental, may need more messing with if we really care about it. For now it seems to mostly work
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Stackman from 'stackman';

const stackman = Stackman();
export function getCallSite(): Promise<null | { funcName: string; fileLink: string }> {
  const e = new Error();
  return new Promise((resolve, reject) => {
    stackman.callsites(e, { sourcemap: true }, (err: Error, callsites: NodeJS.CallSite[]) => {
      if (err) {
        return reject(err);
      }
      const caller = callsites[2]; // get up out of the logging library
      const filename = caller.getFileName();
      const line = caller.getLineNumber();
      const column = caller.getColumnNumber();
      const funcName = caller.getFunctionName();
      if (!filename || !line || !column || !funcName) {
        return resolve(null);
      }
      const fileLink = `file://${filename}:${line}:${column}`;
      return resolve({ fileLink, funcName });
    });
  });
}
