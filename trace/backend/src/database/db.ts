import config from 'config';
import pgp from 'pg-promise';

const dbConfig = config.get('db');

// @ts-ignore
export const db = pgp(dbConfig);
