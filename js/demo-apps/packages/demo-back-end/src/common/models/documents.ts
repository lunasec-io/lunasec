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
    const insertionPromises: Promise<any>[] = [];
    documentTokens.forEach((documentToken) => {
      insertionPromises.push(db.run('INSERT INTO documents (user_id, token) VALUES (?, ?)', [userId, documentToken]));
    });

    await Promise.all(insertionPromises);
    return;
  }
}
