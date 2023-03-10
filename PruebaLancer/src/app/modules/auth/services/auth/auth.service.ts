import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../../shared/services/generic.service';
import { IUserRegister } from '../../DTO/iuser-register';
import { IUserAuthenticatedResponse } from '../../responses/iuser-authenticated-response';

import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { IUserLogin } from '../../DTO/iuser-login';
import { IUser } from '../../entities/iuser';

@Injectable({
	providedIn: 'root',
})
export class AuthService extends GenericService {
	userInfoTemp!: IUserRegister;

	getResource(): string {
		return 'Auth';
	}

	constructor(
		protected override $http: HttpClient,
		protected override $storage: Storage,
		private $router: Router
	) {
		super($http, $storage);
		console.log(this.endPoint);
	}

	async getStorageData(): Promise<IUser> {
		const customerName = await this._storage?.get('customerName');
		const phoneNumber = await this._storage?.get('phoneNumber');
		const userEmail = await this._storage?.get('userEmail');
		const profilePic = await this._storage?.get('profilePic');

		await Promise.all([customerName, phoneNumber, userEmail, profilePic]);

		const userData: IUser = {
			userId: null,
			customerName: customerName,
			profilePic: profilePic,
			userEmail: userEmail,
			phoneNumber: phoneNumber,
			ReservationHistory: [],
			FutureReservations: [],
			FavoritesServices: [],
			PayMethods: [],
		};

		return userData;
	}

	async saveToStorage(model: Object): Promise<void> {
		const keys = Object.entries(model);
		console.log(keys);
		for (const [key, value] of Object.entries(keys)) {
			let propKey = value[0];
			let propValue = value[1];

			if (typeof value[1] === 'object') {
				// If the value for this key is anothe object
				for (const [innerKey, innerValue] of Object.entries(value)) {
					propKey = innerValue[0];
					propValue = innerValue[1];
				}
			}

			await this._storage?.set(propKey, propValue);
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
					console.log('El usuario se ha validado correctamente');
					this.saveToStorage(response);
					this.$router.navigate(['registro/profile']);
				} else {
					console.log('El usuario no existe !!');
				}
			});
	}

	registerUser(): void {
		this.$http
			.post<IUserAuthenticatedResponse>(
				`${this.endPoint}/Register`,
				this.userInfoTemp,
				{ headers: this.getHeaders() }
			)
			// .post<IUserAuthenticatedResponse>(
			// 	`${this.endPoint}/Register`,
			// 	this.userInfoTemp,
			// 	{ headers: this.getHeaders() }
			// )
			.subscribe((response: IUserAuthenticatedResponse) => {
				if (response.code == 1) {
					console.log('El usuario se registro de forma exitosa !!');
					// this.saveToStorage(response);
					this.$router.navigate(['']); // to login page
				} else {
					console.log('El usuario ya existe !!');
				}
			});
	}
}
