import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUserRegister } from '../../DTO/iuser-register';

@Component({
	selector: 'app-formulary',
	templateUrl: './formulary.component.html',
	styleUrls: ['./formulary.component.scss'],
})
export class FormularyComponent implements OnInit {
	constructor(private $fb: FormBuilder, private $router: Router) {}

	registerForm: FormGroup = this.$fb.group({
		name: ['', [Validators.required, Validators.maxLength(30)]],
		lastname: ['', [Validators.required, Validators.maxLength(30)]],
		email: ['', [Validators.required, Validators.email]],
		phoneNumber: [
			'',
			[
				Validators.required,
				Validators.minLength(10),
				Validators.maxLength(10),
				Validators.pattern(/^[0-9]{10}$/),
			],
		],
		password: [
			'',
			[
				Validators.required,
				Validators.minLength(8),
				Validators.maxLength(16),
				Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/),
			],
		],
		confirmPassword: ['', [Validators.required]],
	});

	ngOnInit() {}

	saveUserInfo(): void {
		const { name, lastname, phoneNumber, email, password } =
			this.registerForm.value;

		const userInfo: IUserRegister = {
			userName: `${name}_${lastname}`,
			userPhoneNumber: phoneNumber,
			userEmail: email,
			userPassword: password,
			type: 1,
			userProfilePic: null,
			answer: 'UBER',
		};

		for (const [key, value] of Object.entries(userInfo)) {
			localStorage.setItem(key, value);
		}

		this.$router.navigate(['registro/ubicacion']);
	}
}
