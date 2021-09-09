import crypto from 'crypto';

import { getDb } from '../database/db';

export interface UserModel {
  id: string;
  username: string;
  ssn_token?: string;
}

export interface UserWithPasswordHash extends UserModel {
  salt: string;
  hashed_password: string;
}

export class UserMethods {
  static async setSsn(id: string, ssnToken: string) {
    const db = await getDb();
    await db.run('UPDATE users SET ssn_token = ? WHERE rowid = ?', [ssnToken, id]);
    return;
  }

  static async getUser(id: string): Promise<UserModel | null> {
    const db = await getDb();
    const row = await db.get<UserModel>('SELECT rowid AS id, username, ssn_token FROM users WHERE rowid = ?', [id]);

    if (!row) {
      return null;
    }
    return {
      ...row,
      id: row.id.toString(),
    };
  }

  // just used for login with passport
  static async getUserWithPasswordHash(username: string) {
    const db = await getDb();
    return db.get<UserWithPasswordHash>('SELECT rowid AS id, * FROM users WHERE username = ?', [username]);
  }

  static async createNewUser(userFields: { password: string; username: string }): Promise<UserModel> {
    const db = await getDb();
    const salt = crypto.randomBytes(16);
    return new Promise((resolve) => {
      crypto.pbkdf2(userFields.password, salt, 10000, 32, 'sha256', async function (err, hashedPassword) {
        if (err) {
          throw err;
        }

        const insertedUser = await db.run('INSERT INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
          userFields.username,
          hashedPassword,
          salt,
        ]);

        if (!insertedUser.lastID) {
          throw new Error('db error');
        }
        resolve({
          id: insertedUser.lastID.toString(),
          username: userFields.username,
        });
      });
    });
  }
}
