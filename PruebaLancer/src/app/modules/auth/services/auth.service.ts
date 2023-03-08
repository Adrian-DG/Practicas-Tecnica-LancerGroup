import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../shared/services/generic.service';
import { IUserRegister } from '../DTO/iuser-register';
import { IUserRegisterResponse } from '../responses/iuser-register-response';

@Injectable({
	providedIn: 'root',
})
export class AuthService extends GenericService {
	getResource(): string {
		return 'Auth';
	}

	constructor(protected override $http: HttpClient) {
		super($http);
	}

	registerUser(model: IUserRegister): void {
		this.$http.post<IUserRegisterResponse>(
			`${this.endPoint}/register`,
			model,
			{ headers: this.getHeaders() }
		);
		// TODO: save positive response using IonicStore
	}
}
