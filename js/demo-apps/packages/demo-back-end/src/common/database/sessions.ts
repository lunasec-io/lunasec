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
/**
 * forked from https://github.com/rawberg/connect-sqlite3
 * and also forked from https://github.com/tnantoka/connect-sqlite
 * both of which are MIT licensed.
 */

/**
 * Module dependencies.
 */
import events from 'events';

import * as session from 'express-session';
import { SessionData } from 'express-session';
import sqlite3 from 'sqlite3';

/**
 * @type {int}  One day in milliseconds.
 */
const oneDay = 86400000;

export interface ConnectSqliteOptions extends session.SessionOptions {
  table: string;
  db: string;
  dir?: string;
  mode?: number;
  concurrentDb?: boolean;
}

/**
 * Return the SQLiteStore extending connect's session Store.
 *
 * @param   {object}    connect
 * @return  {Function}
 * @api     public
 */
export class SQLiteStore extends session.Store {
  readonly table!: string;
  readonly client!: events.EventEmitter;
  readonly db!: sqlite3.Database;
  readonly dbUri!: string;

  constructor(options: ConnectSqliteOptions) {
    options = options || {};

    super();

    this.table = options.table || 'sessions';
    this.dbUri = options.db || this.table;
    let dbPath;

    if (this.dbUri.indexOf(':memory:') > -1 || this.dbUri.indexOf('?mode=memory') > -1) {
      dbPath = this.dbUri;
    } else {
      dbPath = (options.dir || '.') + '/' + this.dbUri;
    }

    this.db = new sqlite3.Database(dbPath, options.mode);
    this.client = new events.EventEmitter();

    const dbMode = options.concurrentDb ? 'PRAGMA journal_mode = wal; ' : '';

    this.db.exec(dbMode + `CREATE TABLE IF NOT EXISTS ${this.table} (sid PRIMARY KEY, expired, sess)`, (err) => {
      if (err) {
        throw err;
      }
      this.client.emit('connect');

      void this.dbCleanup();
      setInterval(() => void this.dbCleanup(), oneDay, this).unref();
    });
  }

  /**
   * Remove expired sessions from database.
   * @api     private
   */
  dbCleanup() {
    const now = new Date().getTime();
    return new Promise((resolve, reject) => {
      this.db.run(`DELETE FROM ${this.table} WHERE ? > expired`, [now], (err) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(undefined);
      });
    });
  }

  /**
   * Attempt to fetch session by the given sid.
   *
   * @param   {String}    sid
   * @param fn
   * @api     public
   */
  get(sid: string, fn: (err: unknown, row?: SessionData | null | undefined) => void) {
    const now = new Date().getTime();
    this.db.get(`SELECT sess FROM ${this.table} WHERE sid = ? AND ? <= expired`, [sid, now], function (err, row) {
      if (err) {
        fn(err);
        return;
      }

      if (!row) {
        fn(undefined, null);
        return;
      }

      fn(undefined, JSON.parse(row.sess));
    });
  }

  /**
   * Commit the given `sess` object associated with the given `sid`.
   *
   * @param   {String}    sid
   * @param   {Session}   sess
   * @param fn
   * @api     public
   */
  set(sid: string, sess: session.Session, fn: (err?: Error) => void): void {
    const maxAge = sess.cookie.maxAge;
    const now = new Date().getTime();
    const expired = maxAge ? now + maxAge : now + oneDay;
    const serializedSess = JSON.stringify(sess);

    this.db.all(`INSERT OR REPLACE INTO ${this.table} VALUES (?, ?, ?)`, [sid, expired, serializedSess], fn);
  }

  /**
   * Destroy the session associated with the given `sid`.
   *
   * @param   {String}    sid
   * @param fn
   * @api     public
   */
  destroy(sid: string, fn: (err?: Error) => void) {
    this.db.run(`DELETE FROM ${this.table} WHERE sid = ?`, [sid], (err) => {
      if (err) {
        fn(err);
        return;
      }

      fn();
    });
  }

  /**
   * Fetch number of sessions.
   *
   * @api     public
   */
  length(fn: (err: Error | undefined, length: number) => void) {
    this.db.all(`SELECT COUNT(*) AS count FROM ${this.table}`, function (err, rows) {
      if (err) {
        fn(err, 0);
        return;
      }

      fn(undefined, rows[0].count);
    });
  }

  /**
   * Clear all sessions.
   *
   * @api     public
   */
  clear(fn: (err?: Error) => void) {
    this.db.exec(`DELETE FROM ${this.table}`, function (err) {
      if (err) {
        fn(err);
        return;
      }
      fn();
    });
  }

  /**
   * Touch the given session object associated with the given session ID.
   *
   * @param   {string}    sid
   * @param   {object}    session
   * @param fn
   * @public
   */
  touch(sid: string, session: session.Session, fn: (err?: Error, touched?: boolean) => void) {
    if (session && session.cookie && session.cookie.expires) {
      const now = new Date().getTime();
      const cookieExpires = new Date(session.cookie.expires).getTime();

      this.db.run(
        `UPDATE ${this.table} SET expired=? WHERE sid = ? AND ? <= expired`,
        [cookieExpires, sid, now],
        function (err) {
          if (err) {
            fn(err);
            return;
          }
          fn(undefined, true);
        }
      );
      return;
    }

    fn(undefined, true);
  }
}
