import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from '../../../shared/services/generic.service';
import { IUserRegister } from '../../DTO/iuser-register';
import { IUserAuthenticatedResponse } from '../../responses/iuser-authenticated-response';

import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { IUserLogin } from '../../DTO/iuser-login';
import { IUser } from '../../entities/iuser';
import { IIGPSCoordinates } from '../../DTO/igps-coordinates';

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
	}

	async getStorageData(): Promise<IUser> {
		const custumerName = await this._storage?.get('custumerName');
		const phoneNumber = await this._storage?.get('phoneNumber');
		const userEmail = await this._storage?.get('userEmail');
		const profilePic = await this._storage?.get('profilePic');
		const status = await this._storage?.get('status');

		await Promise.all([
			custumerName,
			phoneNumber,
			userEmail,
			profilePic,
			status,
		]);

		const userData: IUser = {
			userId: null,
			custumerName: custumerName,
			profilePic: profilePic,
			userEmail: userEmail,
			phoneNumber: phoneNumber,
			ReservationHistory: [],
			FutureReservations: [],
			FavoritesServices: [],
			PayMethods: [],
			status: status,
		};

		return userData;
	}

	// async saveToStorage(model: Object): Promise<void> {
	// 	const keys = Object.entries(model);
	// 	console.log(keys);
	// 	for (const [key, value] of Object.entries(keys)) {
	// 		let propKey = key;
	// 		let propValue = value[1];

	// 		if (typeof value === 'object') {
	// 			// If the value for this key is another object
	// 			for (const [innerKey, innerValue] of Object.entries(value)) {
	// 				propKey = innerKey;
	// 				propValue = innerValue;
	// 			}
	// 		}

	// 		console.log(`${propKey} : ${propValue}`);
	// 		await this._storage?.set(propKey, propValue);
	// 	}
	// }

	public async saveLocationToStorage(model: IIGPSCoordinates): Promise<void> {
		await Promise.all([
			this._storage?.set('latitude', model.latitude),
			this._storage?.set('longitude', model.longitude),
		]);
	}

	private async saveLoginToStorage(
		model: IUserAuthenticatedResponse
	): Promise<void> {
		console.log('Saved info');
		await Promise.all([
			this._storage?.set('token', model.token),
			this._storage?.set('custumerName', model.User.custumerName),
			this._storage?.set('userEmail', model.User.userEmail),
			this._storage?.set('phoneNumber', model.User.phoneNumber),
			this._storage?.set('status', model.User.status),
		]);
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
					console.log(response);
					this.saveLoginToStorage(response);
					this.$router.navigate(['usuario/perfil']);
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
			.subscribe((response: IUserAuthenticatedResponse) => {
				if (response.code == 1) {
					console.log('El usuario se registro de forma exitosa !!');
					this.$router.navigate(['']); // to login page
				} else {
					console.log('El usuario ya existe !!');
				}
			});
	}
}
