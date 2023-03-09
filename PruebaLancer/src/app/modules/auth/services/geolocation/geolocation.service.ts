import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { IIGPSCoordinates } from '../../DTO/igps-coordinates';

@Injectable({
	providedIn: 'root',
})
export class GeolocationService {
	constructor() {}

	async getCurrentPosition(): Promise<IIGPSCoordinates> {
		const { coords } = await Geolocation.getCurrentPosition();
		const { latitude, longitude } = coords;
		return { latitude, longitude };
	}
}
