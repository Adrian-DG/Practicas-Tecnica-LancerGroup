import { Component, OnInit } from '@angular/core';
import { IUserLogin } from '../../DTO/iuser-login';
import { AuthService } from '../../services/auth/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	usernameInput = '';
	passwordInput = '';

	constructor(private _auth: AuthService) {}

	ngOnInit() {}

	login(): void {
		const model: IUserLogin = {
			userEmail: this.usernameInput,
			userPassword: this.passwordInput,
		};
		this._auth.loginUser(model);
	}
}
