import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Storage } from '@ionic/storage-angular';
import { GenericService } from 'src/app/modules/shared/services/generic.service';
import { IIGPSCoordinates } from '../../DTO/igps-coordinates';
import { AuthService } from '../auth/auth.service';

@Injectable({
	providedIn: 'root',
})
export class GeolocationService {
	constructor(private _auth: AuthService) {}

	async getCurrentPosition(): Promise<void> {
		const { coords } = await Geolocation.getCurrentPosition();
		const { latitude, longitude } = coords;
		console.log(`Coordinates: ${latitude}, ${longitude}`);
		const coordinates: IIGPSCoordinates = {
			latitude: latitude,
			longitude: longitude,
		};
		this._auth.saveLocationToStorage(coordinates);
	}
}
