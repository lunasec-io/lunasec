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
// This code has been copied and converted from https://github.com/felixge/node-stack-trace/blob/master/index.js
// because there was something wrong with that module

export function get(belowFn: (...args: unknown[]) => unknown): NodeJS.CallSite[] {
  const oldLimit = Error.stackTraceLimit;
  Error.stackTraceLimit = Infinity;

  const dummyObject = {};

  const v8Handler = Error.prepareStackTrace;
  Error.prepareStackTrace = function replacementFunction(dummyObject, v8StackTrace) {
    return v8StackTrace;
  };
  Error.captureStackTrace(dummyObject, belowFn || get);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const v8StackTrace = dummyObject.stack as NodeJS.CallSite[];
  Error.prepareStackTrace = v8Handler;
  Error.stackTraceLimit = oldLimit;

  return v8StackTrace;
}
