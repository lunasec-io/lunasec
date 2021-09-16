import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';
sqlite3.verbose();

export type DbType = Database<sqlite3.Database, sqlite3.Statement>;

export async function initDb(dbName: string): Promise<DbType> {
  const db = await open({
    filename: `db.${dbName}.sqlite3`,
    driver: sqlite3.Database,
  });
  await db.migrate({
    force: false, // force remigrate if true.  You should usually just delete the db file instead to wipe db
    migrationsPath: __dirname + '/migrations',
  });
  return db;
}
