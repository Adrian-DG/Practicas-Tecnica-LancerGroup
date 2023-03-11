import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { IndexComponent } from './pages/index/index.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormularyComponent } from './pages/formulary/formulary.component';
import { LocationComponent } from './pages/location/location.component';
import { ProfileComponent } from './pages/profile/profile.component';

// Enable camera view on browser throught pwa-elements
import { enableProdMode, isDevMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
	declarations: [
		IndexComponent,
		LoginComponent,
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

if (!isDevMode()) {
	enableProdMode();
}

platformBrowserDynamic()
	.bootstrapModule(AuthModule)
	.catch((err) => console.log(err));

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);
