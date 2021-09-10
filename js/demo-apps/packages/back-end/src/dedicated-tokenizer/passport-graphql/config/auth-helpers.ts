import { AuthenticationError } from 'apollo-server-express';

import { AppContext } from '../graphql/graphql-apollo-server';

export function getUserOrThrow(context: AppContext) {
  const user = context.getUser();
  if (!user) {
    throw new AuthenticationError('User is not logged in');
  }
  return user;
}

// Tell LunaSec how to read a user identifier out of the request object.  Technically any ID will work, but the sessionId is often a good choice.
// If you'd like to allow users to use LunaSec elements without being logged in, consider generating a temporary session for them.
export function readSessionFromRequest(req: Express.Request): Promise<string | null> {
  // LunaSec expects this to return a promise in case we need to do something async
  return new Promise((resolve) => {
    if (req.session.id) {
      return resolve(req.session.id);
    }
    return resolve(null); // LunaSec Elements will not work in this case
  });
}
