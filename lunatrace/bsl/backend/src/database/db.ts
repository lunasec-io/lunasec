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
import config from 'config';
// import * as pgPromise from 'pg-promise';
import pgPromise from 'pg-promise';

import { log } from '../utils/log';

const dbConfig = config.get('db');

const conf = {
  ...(dbConfig as Record<string, any>),
};

export const pgp = pgPromise({
  /* initialization options */
  capSQL: true, // capitalize all generated SQL
  query: (e) => {
    log.debug('DB QUERY', {
      query: e.query,
    });
  },
});

export const db = pgp(process.env.DATABASE_CONNECTION_URL || conf);
log.info('postgres DB initialized');

// export function closeDb(_req: Request, _res: Response, next: () => {}) {
//   db.$pool.end();
//   next();
// }
