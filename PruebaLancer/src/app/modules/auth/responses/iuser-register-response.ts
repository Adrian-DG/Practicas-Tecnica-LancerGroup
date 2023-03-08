import { IUser } from '../entities/iuser';

export interface IUserRegisterResponse extends IUser {
	token: string;
	user: IUser;
	code: number;
}
