import sqlite3 from 'sqlite3';

export const db = new sqlite3.Database('db.sqlite3');
