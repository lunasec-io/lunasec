import crypto from 'crypto';

import passport from 'passport';
import { Strategy } from 'passport-json';

import { UserModel } from '../../../../shared/types';
import { db } from '../db';

export default function initAuth() {
  // Configure the local strategy for use by Passport.
  //
  // The local strategy requires a `verify` function which receives the credentials
  // (`username` and `password`) submitted by the user.  The function must verify
  // that the password is correct and then invoke `cb` with a user object, which
  // will be set at `req.user` in route handlers after authentication.
  passport.use(
    new Strategy((username, password, cb) => {
      db.get('SELECT rowid AS id, * FROM users WHERE username = ?', [username], function (err, row) {
        if (err) {
          return cb(err, false);
        }
        if (!row) {
          return cb('Incorrect username or password.', false);
        }

        crypto.pbkdf2(password, row.salt, 10000, 32, 'sha256', function (err, hashedPassword) {
          if (err) {
            return cb(err, false);
          }
          if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
            return cb('Incorrect username or password.', false);
          }

          const user = {
            id: row.id.toString(),
            username: row.username,
            displayName: row.name,
          };
          return cb(null, user);
        });
      });
    }),
  );

  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser(function (user: UserModel, cb) {
    process.nextTick(function () {
      cb(null, { id: user.id, username: user.username });
    });
  });

  passport.deserializeUser(function (user: UserModel, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
}
