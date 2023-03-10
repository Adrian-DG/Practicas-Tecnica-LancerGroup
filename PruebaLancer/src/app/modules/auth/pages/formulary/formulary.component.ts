import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';
import { IUserRegister } from '../../DTO/iuser-register';
import { AuthService } from '../../services/auth/auth.service';

@Component({
	selector: 'app-formulary',
	templateUrl: './formulary.component.html',
	styleUrls: ['./formulary.component.scss'],
})
export class FormularyComponent implements OnInit {
	constructor(
		private $fb: FormBuilder,
		private $router: Router,
		private _auth: AuthService
	) {}

	registerForm!: FormGroup;

	ngOnInit() {
		this.registerForm = this.$fb.group({
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

		// validate user
		const confirmPasswordInput = this.registerForm.get('confirmPassword');

		confirmPasswordInput?.valueChanges.subscribe((value) => {
			const password = this.registerForm.get('password')?.value;
			if (password !== value) {
				confirmPasswordInput?.setErrors({ mismatch: true });
			} else {
				confirmPasswordInput?.setErrors(null);
			}
		});
	}

	saveUserInfo(): void {
		// TODO: save to LocalStorage
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

		this._auth.userInfoTemp = userInfo;

		this.$router.navigate(['registro/ubicacion']);
	}
}
