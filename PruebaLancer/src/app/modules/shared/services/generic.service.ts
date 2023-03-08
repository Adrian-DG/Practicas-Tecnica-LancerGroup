import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';

import { environment as Dev } from 'src/environments/environment';
import { environment as Prod } from 'src/environments/environment.prod';

@Injectable({
	providedIn: 'root',
})
export abstract class GenericService {
	protected endPoint!: string;

	// Refers to controller name on backend
	abstract getResource(): string;

	protected getHeaders(): HttpHeaders {
		const api_key: string = isDevMode() ? Dev.api_key : Prod.api_key;
		return new HttpHeaders().set('x-api-key', api_key).set('Country', 'RD');
	}

	constructor(protected $http: HttpClient) {
		this.endPoint += `${
			isDevMode() ? Dev.api_url : Prod.api_url
		}/${this.getResource()}`;
	}
}
