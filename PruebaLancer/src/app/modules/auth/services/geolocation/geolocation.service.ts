import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Storage } from '@ionic/storage-angular';
import { GenericService } from 'src/app/modules/shared/services/generic.service';
import { IIGPSCoordinates } from '../../DTO/igps-coordinates';

@Injectable({
	providedIn: 'root',
})
export class GeolocationService extends GenericService {
	getResource(): string {
		throw new Error('Method not implemented.');
	}

	constructor(
		protected override $http: HttpClient,
		protected override $storage: Storage
	) {
		super($http, $storage);
	}

	async getCurrentPosition(): Promise<void> {
		const { coords } = await Geolocation.getCurrentPosition();
		const { latitude, longitude } = coords;
		console.log(`Coordinates: ${latitude}, ${longitude}`);
		this.$storage.set('latitude', latitude);
		this.storage?.set('longitude', longitude);
	}
}
