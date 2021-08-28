import { UserModel } from './types';

declare global {
  namespace Express {
    type User = UserModel;
    interface Request {
      user: UserModel;
    }
  }
}
