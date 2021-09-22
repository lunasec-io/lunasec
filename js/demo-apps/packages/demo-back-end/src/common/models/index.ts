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
