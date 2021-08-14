import { IUserDTO } from './IUserDTO';

export const getUserFullName = (user: IUserDTO): string => `${user.firstName} ${user.lastName}`;
