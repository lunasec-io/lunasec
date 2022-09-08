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
import { log } from '../../utils/log';
import { hasura } from '../index';

// insertBuildLog inserts a build log asynchronously, without waiting for a response.
export function updateBuildStatus(
  buildId: string,
  message: string,
  options?: { type: 'info' | 'warn' | 'error'; context?: any }
) {
  if (options) {
    if (options.type === 'info') {
      log.info(message, options.context);
    } else if (options.type === 'warn') {
      log.warn(message, options.context);
    } else {
      log.error(message, options.context);
    }
  }
  void hasura.InsertBuildLog({
    build_log: {
      build_id: buildId,
      message,
    },
  });
}
