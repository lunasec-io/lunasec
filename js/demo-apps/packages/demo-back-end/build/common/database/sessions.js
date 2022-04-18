"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQLiteStore = void 0;
/**
 * Module dependencies.
 */
const events_1 = __importDefault(require("events"));
const session = __importStar(require("express-session"));
const sqlite3_1 = __importDefault(require("sqlite3"));
/**
 * @type {int}  One day in milliseconds.
 */
const oneDay = 86400000;
/**
 * Return the SQLiteStore extending connect's session Store.
 *
 * @param   {object}    connect
 * @return  {Function}
 * @api     public
 */
class SQLiteStore extends session.Store {
    constructor(options) {
        options = options || {};
        super();
        this.table = options.table || 'sessions';
        this.dbUri = options.db || this.table;
        let dbPath;
        if (this.dbUri.indexOf(':memory:') > -1 || this.dbUri.indexOf('?mode=memory') > -1) {
            dbPath = this.dbUri;
        }
        else {
            dbPath = (options.dir || '.') + '/' + this.dbUri;
        }
        this.db = new sqlite3_1.default.Database(dbPath, options.mode);
        this.client = new events_1.default.EventEmitter();
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
    get(sid, fn) {
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
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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
    set(sid, sess, fn) {
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
    destroy(sid, fn) {
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
    length(fn) {
        this.db.all(`SELECT COUNT(*) AS count FROM ${this.table}`, function (err, rows) {
            if (err) {
                fn(err, 0);
                return;
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            fn(undefined, rows[0].count);
        });
    }
    /**
     * Clear all sessions.
     *
     * @api     public
     */
    clear(fn) {
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
    touch(sid, session, fn) {
        if (session && session.cookie && session.cookie.expires) {
            const now = new Date().getTime();
            const cookieExpires = new Date(session.cookie.expires).getTime();
            this.db.run(`UPDATE ${this.table} SET expired=? WHERE sid = ? AND ? <= expired`, [cookieExpires, sid, now], function (err) {
                if (err) {
                    fn(err);
                    return;
                }
                fn(undefined, true);
            });
            return;
        }
        fn(undefined, true);
    }
}
exports.SQLiteStore = SQLiteStore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbW9uL2RhdGFiYXNlL3Nlc3Npb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSDs7OztHQUlHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUg7O0dBRUc7QUFDSCxvREFBNEI7QUFFNUIseURBQTJDO0FBRTNDLHNEQUE4QjtBQUU5Qjs7R0FFRztBQUNILE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQztBQVV4Qjs7Ozs7O0dBTUc7QUFDSCxNQUFhLFdBQVksU0FBUSxPQUFPLENBQUMsS0FBSztJQU01QyxZQUFZLE9BQTZCO1FBQ3ZDLE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDO1FBRXhCLEtBQUssRUFBRSxDQUFDO1FBRVIsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLFVBQVUsQ0FBQztRQUN6QyxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QyxJQUFJLE1BQU0sQ0FBQztRQUVYLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDbEYsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDckI7YUFBTTtZQUNMLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDbEQ7UUFFRCxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksaUJBQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FB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LEVBQTRDO1FBQ3ZGLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDdkQsTUFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNqQyxNQUFNLGFBQWEsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRWpFLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUNULFVBQVUsSUFBSSxDQUFDLEtBQUssK0NBQStDLEVBQ25FLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFDekIsVUFBVSxHQUFHO2dCQUNYLElBQUksR0FBRyxFQUFFO29CQUNQLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDUixPQUFPO2lCQUNSO2dCQUNELEVBQUUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDdEIsQ0FBQyxDQUNGLENBQUM7WUFDRixPQUFPO1NBQ1I7UUFFRCxFQUFFLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RCLENBQUM7Q0FDRjtBQWhMRCxrQ0FnTEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMjEgYnkgTHVuYVNlYyAob3duZWQgYnkgUmVmaW5lcnkgTGFicywgSW5jKVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuLyoqXG4gKiBmb3JrZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vcmF3YmVyZy9jb25uZWN0LXNxbGl0ZTNcbiAqIGFuZCBhbHNvIGZvcmtlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS90bmFudG9rYS9jb25uZWN0LXNxbGl0ZVxuICogYm90aCBvZiB3aGljaCBhcmUgTUlUIGxpY2Vuc2VkLlxuICovXG5cbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuaW1wb3J0IGV2ZW50cyBmcm9tICdldmVudHMnO1xuXG5pbXBvcnQgKiBhcyBzZXNzaW9uIGZyb20gJ2V4cHJlc3Mtc2Vzc2lvbic7XG5pbXBvcnQgeyBTZXNzaW9uRGF0YSB9IGZyb20gJ2V4cHJlc3Mtc2Vzc2lvbic7XG5pbXBvcnQgc3FsaXRlMyBmcm9tICdzcWxpdGUzJztcblxuLyoqXG4gKiBAdHlwZSB7aW50fSAgT25lIGRheSBpbiBtaWxsaXNlY29uZHMuXG4gKi9cbmNvbnN0IG9uZURheSA9IDg2NDAwMDAwO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbm5lY3RTcWxpdGVPcHRpb25zIGV4dGVuZHMgc2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyB7XG4gIHRhYmxlOiBzdHJpbmc7XG4gIGRiOiBzdHJpbmc7XG4gIGRpcj86IHN0cmluZztcbiAgbW9kZT86IG51bWJlcjtcbiAgY29uY3VycmVudERiPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBSZXR1cm4gdGhlIFNRTGl0ZVN0b3JlIGV4dGVuZGluZyBjb25uZWN0J3Mgc2Vzc2lvbiBTdG9yZS5cbiAqXG4gKiBAcGFyYW0gICB7b2JqZWN0fSAgICBjb25uZWN0XG4gKiBAcmV0dXJuICB7RnVuY3Rpb259XG4gKiBAYXBpICAgICBwdWJsaWNcbiAqL1xuZXhwb3J0IGNsYXNzIFNRTGl0ZVN0b3JlIGV4dGVuZHMgc2Vzc2lvbi5TdG9yZSB7XG4gIHJlYWRvbmx5IHRhYmxlITogc3RyaW5nO1xuICByZWFkb25seSBjbGllbnQhOiBldmVudHMuRXZlbnRFbWl0dGVyO1xuICByZWFkb25seSBkYiE6IHNxbGl0ZTMuRGF0YWJhc2U7XG4gIHJlYWRvbmx5IGRiVXJpITogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IENvbm5lY3RTcWxpdGVPcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy50YWJsZSA9IG9wdGlvbnMudGFibGUgfHwgJ3Nlc3Npb25zJztcbiAgICB0aGlzLmRiVXJpID0gb3B0aW9ucy5kYiB8fCB0aGlzLnRhYmxlO1xuICAgIGxldCBkYlBhdGg7XG5cbiAgICBpZiAodGhpcy5kYlVyaS5pbmRleE9mKCc6bWVtb3J5OicpID4gLTEgfHwgdGhpcy5kYlVyaS5pbmRleE9mKCc/bW9kZT1tZW1vcnknKSA+IC0xKSB7XG4gICAgICBkYlBhdGggPSB0aGlzLmRiVXJpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYlBhdGggPSAob3B0aW9ucy5kaXIgfHwgJy4nKSArICcvJyArIHRoaXMuZGJVcmk7XG4gICAgfVxuXG4gICAgdGhpcy5kYiA9IG5ldyBzcWxpdGUzLkRhdGFiYXNlKGRiUGF0aCwgb3B0aW9ucy5tb2RlKTtcbiAgICB0aGlzLmNsaWVudCA9IG5ldyBldmVudHMuRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBjb25zdCBkYk1vZGUgPSBvcHRpb25zLmNvbmN1cnJlbnREYiA/ICdQUkFHTUEgam91cm5hbF9tb2RlID0gd2FsOyAnIDogJyc7XG5cbiAgICB0aGlzLmRiLmV4ZWMoZGJNb2RlICsgYENSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTICR7dGhpcy50YWJsZX0gKHNpZCBQUklNQVJZIEtFWSwgZXhwaXJlZCwgc2VzcylgLCAoZXJyKSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2xpZW50LmVtaXQoJ2Nvbm5lY3QnKTtcblxuICAgICAgdm9pZCB0aGlzLmRiQ2xlYW51cCgpO1xuICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4gdm9pZCB0aGlzLmRiQ2xlYW51cCgpLCBvbmVEYXksIHRoaXMpLnVucmVmKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGV4cGlyZWQgc2Vzc2lvbnMgZnJvbSBkYXRhYmFzZS5cbiAgICogQGFwaSAgICAgcHJpdmF0ZVxuICAgKi9cbiAgZGJDbGVhbnVwKCkge1xuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmRiLnJ1bihgREVMRVRFIEZST00gJHt0aGlzLnRhYmxlfSBXSEVSRSA/ID4gZXhwaXJlZGAsIFtub3ddLCAoZXJyKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRlbXB0IHRvIGZldGNoIHNlc3Npb24gYnkgdGhlIGdpdmVuIHNpZC5cbiAgICpcbiAgICogQHBhcmFtICAge1N0cmluZ30gICAgc2lkXG4gICAqIEBwYXJhbSBmblxuICAgKiBAYXBpICAgICBwdWJsaWNcbiAgICovXG4gIGdldChzaWQ6IHN0cmluZywgZm46IChlcnI6IHVua25vd24sIHJvdz86IFNlc3Npb25EYXRhIHwgbnVsbCB8IHVuZGVmaW5lZCkgPT4gdm9pZCkge1xuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIHRoaXMuZGIuZ2V0KGBTRUxFQ1Qgc2VzcyBGUk9NICR7dGhpcy50YWJsZX0gV0hFUkUgc2lkID0gPyBBTkQgPyA8PSBleHBpcmVkYCwgW3NpZCwgbm93XSwgZnVuY3Rpb24gKGVyciwgcm93KSB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGZuKGVycik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKCFyb3cpIHtcbiAgICAgICAgZm4odW5kZWZpbmVkLCBudWxsKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1hcmd1bWVudFxuICAgICAgZm4odW5kZWZpbmVkLCBKU09OLnBhcnNlKHJvdy5zZXNzKSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ29tbWl0IHRoZSBnaXZlbiBgc2Vzc2Agb2JqZWN0IGFzc29jaWF0ZWQgd2l0aCB0aGUgZ2l2ZW4gYHNpZGAuXG4gICAqXG4gICAqIEBwYXJhbSAgIHtTdHJpbmd9ICAgIHNpZFxuICAgKiBAcGFyYW0gICB7U2Vzc2lvbn0gICBzZXNzXG4gICAqIEBwYXJhbSBmblxuICAgKiBAYXBpICAgICBwdWJsaWNcbiAgICovXG4gIHNldChzaWQ6IHN0cmluZywgc2Vzczogc2Vzc2lvbi5TZXNzaW9uLCBmbjogKGVycj86IEVycm9yKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgY29uc3QgbWF4QWdlID0gc2Vzcy5jb29raWUubWF4QWdlO1xuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIGNvbnN0IGV4cGlyZWQgPSBtYXhBZ2UgPyBub3cgKyBtYXhBZ2UgOiBub3cgKyBvbmVEYXk7XG4gICAgY29uc3Qgc2VyaWFsaXplZFNlc3MgPSBKU09OLnN0cmluZ2lmeShzZXNzKTtcblxuICAgIHRoaXMuZGIuYWxsKGBJTlNFUlQgT1IgUkVQTEFDRSBJTlRPICR7dGhpcy50YWJsZX0gVkFMVUVTICg/LCA/LCA/KWAsIFtzaWQsIGV4cGlyZWQsIHNlcmlhbGl6ZWRTZXNzXSwgZm4pO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgdGhlIHNlc3Npb24gYXNzb2NpYXRlZCB3aXRoIHRoZSBnaXZlbiBgc2lkYC5cbiAgICpcbiAgICogQHBhcmFtICAge1N0cmluZ30gICAgc2lkXG4gICAqIEBwYXJhbSBmblxuICAgKiBAYXBpICAgICBwdWJsaWNcbiAgICovXG4gIGRlc3Ryb3koc2lkOiBzdHJpbmcsIGZuOiAoZXJyPzogRXJyb3IpID0+IHZvaWQpIHtcbiAgICB0aGlzLmRiLnJ1bihgREVMRVRFIEZST00gJHt0aGlzLnRhYmxlfSBXSEVSRSBzaWQgPSA/YCwgW3NpZF0sIChlcnIpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgZm4oZXJyKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBmbigpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoIG51bWJlciBvZiBzZXNzaW9ucy5cbiAgICpcbiAgICogQGFwaSAgICAgcHVibGljXG4gICAqL1xuICBsZW5ndGgoZm46IChlcnI6IEVycm9yIHwgdW5kZWZpbmVkLCBsZW5ndGg6IG51bWJlcikgPT4gdm9pZCkge1xuICAgIHRoaXMuZGIuYWxsKGBTRUxFQ1QgQ09VTlQoKikgQVMgY291bnQgRlJPTSAke3RoaXMudGFibGV9YCwgZnVuY3Rpb24gKGVyciwgcm93cykge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBmbihlcnIsIDApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWFyZ3VtZW50XG4gICAgICBmbih1bmRlZmluZWQsIHJvd3NbMF0uY291bnQpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGFsbCBzZXNzaW9ucy5cbiAgICpcbiAgICogQGFwaSAgICAgcHVibGljXG4gICAqL1xuICBjbGVhcihmbjogKGVycj86IEVycm9yKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5kYi5leGVjKGBERUxFVEUgRlJPTSAke3RoaXMudGFibGV9YCwgZnVuY3Rpb24gKGVycikge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBmbihlcnIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBmbigpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvdWNoIHRoZSBnaXZlbiBzZXNzaW9uIG9iamVjdCBhc3NvY2lhdGVkIHdpdGggdGhlIGdpdmVuIHNlc3Npb24gSUQuXG4gICAqXG4gICAqIEBwYXJhbSAgIHtzdHJpbmd9ICAgIHNpZFxuICAgKiBAcGFyYW0gICB7b2JqZWN0fSAgICBzZXNzaW9uXG4gICAqIEBwYXJhbSBmblxuICAgKiBAcHVibGljXG4gICAqL1xuICB0b3VjaChzaWQ6IHN0cmluZywgc2Vzc2lvbjogc2Vzc2lvbi5TZXNzaW9uLCBmbjogKGVycj86IEVycm9yLCB0b3VjaGVkPzogYm9vbGVhbikgPT4gdm9pZCkge1xuICAgIGlmIChzZXNzaW9uICYmIHNlc3Npb24uY29va2llICYmIHNlc3Npb24uY29va2llLmV4cGlyZXMpIHtcbiAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgY29uc3QgY29va2llRXhwaXJlcyA9IG5ldyBEYXRlKHNlc3Npb24uY29va2llLmV4cGlyZXMpLmdldFRpbWUoKTtcblxuICAgICAgdGhpcy5kYi5ydW4oXG4gICAgICAgIGBVUERBVEUgJHt0aGlzLnRhYmxlfSBTRVQgZXhwaXJlZD0/IFdIRVJFIHNpZCA9ID8gQU5EID8gPD0gZXhwaXJlZGAsXG4gICAgICAgIFtjb29raWVFeHBpcmVzLCBzaWQsIG5vd10sXG4gICAgICAgIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBmbihlcnIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmbih1bmRlZmluZWQsIHRydWUpO1xuICAgICAgICB9XG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZuKHVuZGVmaW5lZCwgdHJ1ZSk7XG4gIH1cbn1cbiJdfQ==