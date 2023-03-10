import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../../shared/services/generic.service';
import { IUserRegister } from '../../DTO/iuser-register';
import { IUserAuthenticatedResponse } from '../../responses/iuser-authenticated-response';

import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { IUserLogin } from '../../DTO/iuser-login';

@Injectable({
	providedIn: 'root',
})
export class AuthService extends GenericService {
	getResource(): string {
		return 'Auth';
	}

	constructor(
		protected override $http: HttpClient,
		protected override $storage: Storage,
		private $router: Router
	) {
		super($http, $storage);
	}

	async saveToStorage(model: IUserAuthenticatedResponse): Promise<void> {
		const keys = Object.entries(model);
		for (const [key, value] of Object.entries(keys)) {
			let propKey = key;
			let propValue = value;

			if (typeof value === 'object') {
				// If the value for this key is anothe object
				for (const [innerKey, innerValue] of Object.entries(value)) {
					propKey = innerKey;
					propValue = innerValue;
				}
			}

			await this.storage?.set(propKey, propValue);
		}
	}

	loginUser(model: IUserLogin): void {
		this.$http
			.post<IUserAuthenticatedResponse>(
				`${this.endPoint}/Get_ToketLogin`,
				model,
				{ headers: this.getHeaders() }
			)
			.subscribe((response: IUserAuthenticatedResponse) => {
				if (response.code == 1) {
					console.log('El usuario se registrado correctamente');
					this.saveToStorage(response);
					// TODO: navigate to users info
				} else {
					console.log('El usuario no existe !!');
				}
			});
	}

	registerUser(model: IUserRegister): void {
		this.$http
			.post<IUserAuthenticatedResponse>(
				`${this.endPoint}/register`,
				model,
				{ headers: this.getHeaders() }
			)
			.subscribe((response: IUserAuthenticatedResponse) => {
				if (response.code == 1) {
					this.saveToStorage(response);
					this.$router.navigate(['']); // to login page
				} else {
					console.log('El usuario ya existe !!');
				}
			});
	}
}
