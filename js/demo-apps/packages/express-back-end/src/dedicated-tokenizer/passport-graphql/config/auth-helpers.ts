import { NextFunction, Request, Response } from 'express';

export function ensureLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    next();
  } else {
    res.json({
      success: false,
      error: 'user is not logged in',
    });
  }
}

// Tell LunaSec how to read a user identifier out of the request object.  Can use the session ID or the User's ID if desired.
export function lunaSecSessionIdProvider(req: Request): Promise<string | null> {
  // LunaSec expects this to return a promise in case we need to do something async
  return new Promise((resolve) => {
    if (req.user) {
      resolve(req.user.id);
    }
    resolve(null);
  });
}
