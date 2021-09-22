import crypto from 'crypto';

import { Database } from 'sqlite';
import sqlite3 from 'sqlite3';

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
  db: Database<sqlite3.Database, sqlite3.Statement>;

  constructor(db: Database<sqlite3.Database, sqlite3.Statement>) {
    this.db = db;
  }

  async setSsn(id: string, ssnToken: string) {
    await this.db.run('UPDATE users SET ssn_token = ? WHERE rowid = ?', [ssnToken, id]);
    return;
  }

  async getUser(id: string): Promise<UserModel | null> {
    const row = await this.db.get<UserModel>('SELECT rowid AS id, username, ssn_token FROM users WHERE rowid = ?', [
      id,
    ]);
    if (!row) {
      return null;
    }
    return {
      ...row,
      id: row.id.toString(),
    };
  }

  // just used for login with passport
  async getUserWithPasswordHash(username: string) {
    return this.db.get<UserWithPasswordHash>('SELECT rowid AS id, * FROM users WHERE username = ?', [username]);
  }

  async createNewUser(userFields: { password: string; username: string }): Promise<UserModel> {
    const db = this.db;
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
