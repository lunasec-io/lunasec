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
/**
 * forked from https://github.com/rawberg/connect-sqlite3
 * and also forked from https://github.com/tnantoka/connect-sqlite
 * both of which are MIT licensed.
 */
/// <reference types="node" />
/// <reference types="./vendor-typings/sqlite3" />
/**
 * Module dependencies.
 */
import events from 'events';
import * as session from 'express-session';
import { SessionData } from 'express-session';
import sqlite3 from 'sqlite3';
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
export declare class SQLiteStore extends session.Store {
    readonly table: string;
    readonly client: events.EventEmitter;
    readonly db: sqlite3.Database;
    readonly dbUri: string;
    constructor(options: ConnectSqliteOptions);
    /**
     * Remove expired sessions from database.
     * @api     private
     */
    dbCleanup(): Promise<unknown>;
    /**
     * Attempt to fetch session by the given sid.
     *
     * @param   {String}    sid
     * @param fn
     * @api     public
     */
    get(sid: string, fn: (err: unknown, row?: SessionData | null | undefined) => void): void;
    /**
     * Commit the given `sess` object associated with the given `sid`.
     *
     * @param   {String}    sid
     * @param   {Session}   sess
     * @param fn
     * @api     public
     */
    set(sid: string, sess: session.Session, fn: (err?: Error) => void): void;
    /**
     * Destroy the session associated with the given `sid`.
     *
     * @param   {String}    sid
     * @param fn
     * @api     public
     */
    destroy(sid: string, fn: (err?: Error) => void): void;
    /**
     * Fetch number of sessions.
     *
     * @api     public
     */
    length(fn: (err: Error | undefined, length: number) => void): void;
    /**
     * Clear all sessions.
     *
     * @api     public
     */
    clear(fn: (err?: Error) => void): void;
    /**
     * Touch the given session object associated with the given session ID.
     *
     * @param   {string}    sid
     * @param   {object}    session
     * @param fn
     * @public
     */
    touch(sid: string, session: session.Session, fn: (err?: Error, touched?: boolean) => void): void;
}
//# sourceMappingURL=sessions.d.ts.map