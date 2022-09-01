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

import { ErrorResult, ValueResult } from '../types/util';

import { log } from './log';

export function newError(msg: string, err?: Error): ErrorResult {
  return {
    error: true,
    msg,
    rawError: err,
  };
}

export function newResult<T = undefined>(res: T): ValueResult<T> {
  return {
    error: false,
    res,
  };
}

export function logError(error: Error): void {
  log.error(error);
}

export function errorResponse(msg: string): { error: true; message: string } {
  return {
    error: true,
    message: msg,
  };
}
