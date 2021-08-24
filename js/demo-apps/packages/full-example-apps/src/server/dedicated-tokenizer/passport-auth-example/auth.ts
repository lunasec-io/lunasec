import { NextFunction, Request, Response } from 'express';

function loggedIn(req: Request) {
  return req.user !== undefined;
}

export function ensureLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (loggedIn(req)) {
    next();
  } else {
    res.json({
      success: false,
      error: 'user is not logged in',
    });
  }
}

// TODO (cthompson) comment about what this does
export async function lunaSecSessionIdProvider(req: Request) {
  if (loggedIn(req)) {
    return req.user.id;
  }
  return null;
}
