import crypto from 'crypto';

import passport from 'passport';
// @ts-ignore
import { Strategy } from 'passport-json';

import { UserModel } from '../../../types';

import { getDb } from './db';

export default async function configurePassport() {
  const db = await getDb();
  // Configure the local strategy for use by Passport.
  //
  // The local strategy requires a `verify` function which receives the credentials
  // (`username` and `password`) submitted by the user.  The function must verify
  // that the password is correct and then invoke `cb` with a user object, which
  // will be set at `req.user` in route handlers after authentication.
  passport.use(
    new Strategy(
      (username: string, password: string, done: (err: null | string | Error, usr?: false | UserModel) => void) => {
        db.get('SELECT rowid AS id, * FROM users WHERE username = ?', [username])
          .catch((err) => done(err, false))
          .then((row) => {
            if (!row) {
              return done('Incorrect username or password.', false);
            }

            crypto.pbkdf2(password, row.salt, 10000, 32, 'sha256', function (err, hashedPassword) {
              if (err) {
                return done(err, false);
              }
              if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
                return done('Incorrect username or password.', false);
              }

              const user = {
                id: row.id.toString(),
                username: row.username,
                display_name: row.display_name,
                ssn_token: row.ssn_token,
              };
              return done(null, user);
            });
          });
      }
    )
  );

  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser(function (user, cb) {
    cb(null, { id: user.id, username: user.username });
  });

  passport.deserializeUser(function (userInfo: { id: string }, cb) {
    db.get('SELECT rowid AS id, username, display_name, ssn_token FROM users WHERE rowid = ?', [userInfo.id])
      .catch((err) => cb(err))
      .then((row) => {
        const user = {
          ...row,
          id: row.id.toString(),
        };
        cb(null, user);
      });
  });
}
