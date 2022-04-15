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
import {AsyncLocalStorage} from 'async_hooks'

import {JsonTransport, LunaLogger} from "@lunatrace/lunatrace-common";

const isProd = process.env.NODE_ENV === 'production'

export const defaultLogger = new LunaLogger({}, {loggerName: 'default-backend'})

defaultLogger.addTransport(new JsonTransport({
    colors: true, minLevel: isProd ? 'info' : 'debug', pretty: !isProd
}))


export const asyncLocalStorage = new AsyncLocalStorage();

export function getLogger(): LunaLogger {
    const {logger} = asyncLocalStorage.getStore() as {logger: LunaLogger|undefined};
    if (logger) {
        return logger;
    }
    return defaultLogger.child({loggerName: 'WARNING CONTEXT LOST: async-fallback-logger'})
}
