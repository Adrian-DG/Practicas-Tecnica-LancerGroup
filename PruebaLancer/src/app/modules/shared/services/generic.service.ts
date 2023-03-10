import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';

import { environment as Dev } from 'src/environments/environment';
import { environment as Prod } from 'src/environments/environment.prod';

import { Storage } from '@ionic/storage-angular';

@Injectable({
	providedIn: 'root',
})
export abstract class GenericService {
	protected endPoint!: string;
	protected storage: Storage | null = null;

	// Refers to controller name on backend
	abstract getResource(): string;

	protected getHeaders(): HttpHeaders {
		const environment = isDevMode() ? Dev : Prod;
		const { api_key, country } = environment;
		return new HttpHeaders()
			.set('x-api-key', api_key)
			.set('Country', country);
	}

	constructor(protected $http: HttpClient, protected $storage: Storage) {
		this.endPoint += `${
			isDevMode() ? Dev.api_url : Prod.api_url
		}/${this.getResource()}`;

		this.initStorage();
	}

	private async initStorage(): Promise<void> {
		this.storage = await this.$storage.create();
	}
}
