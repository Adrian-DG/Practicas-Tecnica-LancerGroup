import { HttpClient } from '@angular/common/http';
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

	constructor(protected $http: HttpClient) {
		this.endPoint += `${
			isDevMode() ? Dev.api_url : Prod.api_url
		}/${this.getResource()}`;
	}
}
