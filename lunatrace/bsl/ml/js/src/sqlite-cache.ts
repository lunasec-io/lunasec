import sqlite3 from 'sqlite3';

sqlite3.verbose();

import {open, Database} from 'sqlite';

export class SqliteCache {
    private db!: Database<sqlite3.Database, sqlite3.Statement>;
    private readonly dbPath: string;

    constructor(dbPath: string) {
        if (!dbPath) {
            throw new Error('Must pass DB');
        }

        this.dbPath = dbPath;
    }

    async init() {
        this.db = await open({
            filename: this.dbPath,
            driver: sqlite3.Database
        });

        await this.db.exec('CREATE TABLE if not exists cache (\n' +
            'id INTEGER PRIMARY KEY AUTOINCREMENT,\n' +
            'key TEXT NOT NULL,\n' +
            'value TEXT NOT NULL,\n' +
            'timestamp DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL\n' +
            ');');
    }

    async checkCache<T>(key: string, hours = 0): Promise<T | null> {
        let query = 'SELECT value FROM cache WHERE key = :key';

        if (hours > 0) {
            query = query + ` AND timestamp >= datetime(strftime('%s', 'now') - (60 * 60 * ${hours}), 'unixepoch')`;
        }

        const result = await this.db.get(query, {
            ':key': key
        });

        if (result) {
            return JSON.parse(result.value) as T;
        }

        return null;
    }

    async addToCache<T>(key: string, value: T) {
        await this.db.run(
            'INSERT INTO cache (key, value) VALUES (:key, :value)',
            {
                ':key': key,
                ':value': JSON.stringify(value)
            }
        );
    }
}
