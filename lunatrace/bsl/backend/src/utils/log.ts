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
import { AsyncLocalStorage } from "async_hooks";

import {Logger} from 'tslog';


export const asyncLocalStorage: AsyncLocalStorage<{ requestId: string }> =
  new AsyncLocalStorage();

export const log: Logger = new Logger({
  name: 'lunatrace-backend',
  requestId: (): string => {
    return asyncLocalStorage.getStore()?.requestId as string;
  },
});
