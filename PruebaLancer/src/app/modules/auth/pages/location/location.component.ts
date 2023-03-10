import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IIGPSCoordinates } from '../../DTO/igps-coordinates';
import { GeolocationService } from '../../services/geolocation/geolocation.service';

@Component({
	selector: 'app-location',
	templateUrl: './location.component.html',
	styleUrls: ['./location.component.scss'],
})
export class LocationComponent {
	constructor(private _gps: GeolocationService, private $router: Router) {}

	getLocation(): void {
		this._gps.getCurrentPosition().then(() => {
			this.$router.navigate(['registro/imagen']);
		});
	}
}
