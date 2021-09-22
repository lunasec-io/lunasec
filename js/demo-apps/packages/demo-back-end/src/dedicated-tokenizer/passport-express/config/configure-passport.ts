import { Buffer } from 'buffer';
import crypto from 'crypto';

import { Passport } from 'passport';
// @ts-ignore
import { Strategy } from 'passport-json';

import { Models, UserModel } from '../../../common/models';

function comparePassword(passwordToCheck: string, storedPasswordHash: string, salt: string): Promise<boolean | Error> {
  return new Promise((resolve, _reject) => {
    crypto.pbkdf2(passwordToCheck, salt, 10000, 32, 'sha256', function (err, reqPassHash) {
      if (err) {
        return resolve(err);
      }

      const passwordCorrect = crypto.timingSafeEqual(Buffer.from(storedPasswordHash), reqPassHash);
      resolve(passwordCorrect);
    });
  });
}

export function configurePassport(models: Models) {
  const passport = new Passport();
  // Configure the local strategy for use by Passport.
  //
  // The local strategy requires a `verify` function which receives the credentials
  // (`username` and `password`) submitted by the user.  The function must verify
  // that the password is correct and then invoke `cb` with a user object, which
  // will be set at `req.user` in route handlers after authentication.
  passport.use(
    new Strategy(async function login(
      username: string,
      password: string,
      done: (err: null | string | Error, usr?: false | UserModel) => void
    ) {
      const userRecord = await models.user.getUserWithPasswordHash(username).catch((err) => done(err, false));

      if (!userRecord) {
        return done('Incorrect username or password.', false);
      }

      const passwordCorrect = await comparePassword(password, userRecord.hashed_password, userRecord.salt);
      if (passwordCorrect instanceof Error) {
        return done(passwordCorrect, false);
      }
      if (!passwordCorrect) {
        return done('Incorrect username or password.', false);
      }

      const user = {
        id: userRecord.id.toString(),
        username: userRecord.username,
        ssn_token: userRecord.ssn_token,
      };
      return done(null, user);
    })
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
  // TODO: Generate session IDs, dont use user IDs like this

  passport.deserializeUser(async function (userInfo: { id: string }, cb) {
    try {
      const user = await models.user.getUser(userInfo.id);
      cb(null, user);
    } catch (e) {
      cb(e);
    }
  });
  return passport;
}
