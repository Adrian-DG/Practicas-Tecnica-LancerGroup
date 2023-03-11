import { IUser } from '../entities/iuser';

export interface IUserAuthenticatedResponse {
	token: string;
	User: IUser;
	code: number;
}
