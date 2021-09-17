import { Passport } from 'passport';
// import Strategy from 'passport-local';

import { Models } from '../../../common/models';

export default function configurePassport(models: Models) {
  const passport = new Passport();

  // Configure the local strategy for use by Passport.
  //
  // The local strategy requires a `verify` function which receives the credentials
  // (`username` and `password`) submitted by the user.  The function must verify
  // that the password is correct and then invoke `cb` with a user object, which
  // will be set at `req.user` in route handlers after authentication.
  // passport.use(
  //   // @ts-ignore
  //   new Strategy(async (username: string, password: string, done: any) => {})
  // );

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
