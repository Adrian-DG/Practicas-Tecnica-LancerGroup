import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/modules/auth/entities/iuser';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
	userData!: IUser;

	constructor(private _auth: AuthService) {}

	ngOnInit() {
		this._auth.getStorageData().then((value: IUser) => {
			this.userData = value;
		});
	}
}
