import { NextFunction, Request, Response } from 'express';
export declare function ensureLoggedIn(req: Request, res: Response, next: NextFunction): void;
export declare function lunaSecSessionIdProvider(req: Request): Promise<string | null>;
//# sourceMappingURL=auth-helpers.d.ts.map