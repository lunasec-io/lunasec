/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
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
import { DbType } from '../database/db';

import { DocumentMethods } from './documents';
import { UserMethods } from './user';

export type { UserModel, UserWithPasswordHash } from './user';

export interface Models {
  user: UserMethods;
  documents: DocumentMethods;
}

export function createModels(db: DbType): Models {
  return {
    user: new UserMethods(db),
    documents: new DocumentMethods(db),
  };
}
