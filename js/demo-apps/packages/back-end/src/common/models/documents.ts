import { getDb } from '../database/db';

export class DocumentMethods {
  static async getUserDocuments(userId: string) {
    const db = await getDb();
    return db.all('SELECT token FROM documents WHERE user_id = ?', [userId]);
  }

  static async setUserDocuments(userId: string, documentTokens: string[]) {
    const db = await getDb();
    await db.run('DELETE FROM documents WHERE user_id = (?)', userId); // clear out any old documents
    const insertionPromises: Promise<any>[] = [];
    documentTokens.forEach((documentToken) => {
      insertionPromises.push(db.run('INSERT INTO documents (user_id, token) VALUES (?, ?)', [userId, documentToken]));
    });

    await Promise.all(insertionPromises);
    return;
  }
}
