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

import { JsonTransport, LunaLogger } from '@lunatrace/logger';

const isProd = process.env.NODE_ENV === 'production';

export const log = new LunaLogger({}, { loggerName: 'default-backend' });

log.addTransport(
  new JsonTransport({
    colors: true,
    minLevel: isProd ? 'info' : 'debug',
    pretty: !isProd,
  })
);
