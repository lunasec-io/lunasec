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

import {logger} from "./logger";

export function logError(error: Error): void {
  logger.error(error.message);
  logger.error(error.stack);
}

export function errorResponse(msg: string) {
  return {
    error: true,
    message: msg,
  };
}
