import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularyComponent } from './pages/formulary/formulary.component';
import { IndexComponent } from './pages/index/index.component';
import { LocationComponent } from './pages/location/location.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
	{
		path: '',
		component: IndexComponent,
		children: [
			{ path: 'ingresar', component: LoginComponent },
			{ path: 'informacion', component: FormularyComponent },
			{ path: 'ubicacion', component: LocationComponent },
			{ path: 'imagen', component: ProfileComponent },
			{ path: '', redirectTo: 'ingresar', pathMatch: 'full' },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
