/// <reference types="./vendor-typings/sqlite3" />
import { Database } from 'sqlite';
import sqlite3 from 'sqlite3';
export declare function getDb(): Promise<Database<sqlite3.Database, sqlite3.Statement>>;
//# sourceMappingURL=db.d.ts.map