import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { IndexComponent } from './pages/index/index.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormularyComponent } from './pages/formulary/formulary.component';
import { LocationComponent } from './pages/location/location.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
	declarations: [
		IndexComponent,
		FormularyComponent,
		LocationComponent,
		ProfileComponent,
	],
	imports: [
		CommonModule,
		AuthRoutingModule,
		IonicModule,
		HttpClientModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
	],
})
export class AuthModule {}
