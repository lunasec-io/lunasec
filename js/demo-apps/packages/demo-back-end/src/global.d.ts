// import { Database } from 'sqlite';
// import sqlite3 from 'sqlite3';

import { UserModel } from './types';

declare global {
  namespace Express {
    type User = UserModel;
    interface Request {
      user: User;
      // db: Database<sqlite3.Database, sqlite3.Statement>;
    }
  }
}
