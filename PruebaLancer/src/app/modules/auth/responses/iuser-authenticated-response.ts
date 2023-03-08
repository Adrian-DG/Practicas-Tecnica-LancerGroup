import { IUser } from '../entities/iuser';

export interface IUserAuthenticatedResponse extends IUser {
	token: string;
	user: IUser;
	code: number;
}
