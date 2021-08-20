import {UserModel} from '../shared/types';

declare global {
    namespace Express {
        interface User extends UserModel {
        }
        interface Request {
            user?: UserModel;
        }
    }
}