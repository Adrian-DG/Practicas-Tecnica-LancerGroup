import { Component, OnInit } from '@angular/core';
import { IUser } from '../../entities/iuser';
import { AuthService } from '../../services/auth/auth.service';

@Component({
	selector: 'app-user-data',
	templateUrl: './user-data.component.html',
	styleUrls: ['./user-data.component.scss'],
})
export class UserDataComponent implements OnInit {
	userData!: IUser;
	constructor(private _auth: AuthService) {}

	ngOnInit() {
		this._auth
			.getStorageData()
			.then((value: IUser) => (this.userData = value));
	}
}
