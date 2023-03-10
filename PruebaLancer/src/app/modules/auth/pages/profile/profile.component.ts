import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { AuthService } from '../../services/auth/auth.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
	imageUrl: string = '';

	didImageChange: boolean = false;

	constructor(private _auth: AuthService) {}

	ngOnInit() {}

	private saveToBase64(imageBase64: string | undefined): void {
		if (imageBase64) {
			this._auth.userInfoTemp.userProfilePic = imageBase64;
		}
	}

	async getPicture() {
		const image = await Camera.getPhoto({
			quality: 90,
			allowEditing: true,
			resultType: CameraResultType.Uri,
		});

		this.saveToBase64(image.base64String);
		this.imageUrl = image.webPath ?? '';
		this.didImageChange = true;
	}

	completeRegistration(): void {
		this._auth.registerUser();
	}
}
