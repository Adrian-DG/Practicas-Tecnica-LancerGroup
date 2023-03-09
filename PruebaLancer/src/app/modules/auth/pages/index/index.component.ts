import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
	allowBackButton: boolean = false;
	constructor(private $router: Router) {}

	ngOnInit() {
		this.$router.navigateByUrl('/registro/informacion');
	}
}
