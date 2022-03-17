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
import { Database } from 'sqlite';
import sqlite3 from 'sqlite3';

export class DocumentMethods {
  db: Database<sqlite3.Database, sqlite3.Statement>;

  constructor(db: Database<sqlite3.Database, sqlite3.Statement>) {
    this.db = db;
  }
  async getUserDocuments(userId: string) {
    return this.db.all<Array<{ token: string }>>('SELECT token FROM documents WHERE user_id = ?', [userId]);
  }

  async setUserDocuments(userId: string, documentTokens: string[]) {
    const db = this.db;
    await db.run('DELETE FROM documents WHERE user_id = (?)', userId); // clear out any old documents
    const insertionPromises: Promise<unknown>[] = [];
    documentTokens.forEach((documentToken) => {
      insertionPromises.push(db.run('INSERT INTO documents (user_id, token) VALUES (?, ?)', [userId, documentToken]));
    });

    await Promise.all(insertionPromises);
    return;
  }
}
