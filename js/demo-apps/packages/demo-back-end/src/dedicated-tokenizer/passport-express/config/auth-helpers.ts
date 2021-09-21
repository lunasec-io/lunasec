import { NextFunction, Request, Response } from 'express';

export function ensureLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    return next();
  }
  return res.json({
    success: false,
    error: 'user is not logged in',
  });
}

// Tell LunaSec how to read a user identifier out of the request object.  Technically any ID will work, but the sessionId is often a good choice.
// If you'd like to allow users to use LunaSec elements without being logged in, consider generating a temporary session for them.
export function lunaSecSessionIdProvider(req: Request): Promise<string | null> {
  // LunaSec expects this to return a promise in case we need to do something async
  return new Promise((resolve) => {
    if (req.session.id) {
      return resolve(req.session.id);
    }
    return resolve(null); // LunaSec Elements will not work in this case
  });
}
