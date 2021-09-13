import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';
sqlite3.verbose();

async function initDb() {
  const db = await open({
    filename: `db.${process.env.REACT_APP_DEMO_NAME || 'demo'}.sqlite3`,
    driver: sqlite3.Database,
  });
  await db.migrate({
    force: false, // force remigrate if true.  You should usually just delete the db file instead to wipe db
    migrationsPath: __dirname + '/migrations',
  });
  return db;
}

let DBPromise: Promise<Database<sqlite3.Database, sqlite3.Statement>>;
export function getDb() {
  if (typeof DBPromise === 'undefined') {
    DBPromise = initDb();
  }
  return DBPromise;
}
