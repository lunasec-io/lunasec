/*
 * Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import config from 'config';
import pgp from 'pg-promise';

const dbConfig = config.get('db');

const conf = { ...(dbConfig as Record<string, any>) };
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const db = pgp(conf);

// export function closeDb(_req: Request, _res: Response, next: () => {}) {
//   db.$pool.end();
//   next();
// }
