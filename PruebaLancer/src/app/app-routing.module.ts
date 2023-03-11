import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'usuario',
		loadChildren: () =>
			import('./modules/users/users.module').then((m) => m.UsersModule),
		// TODO: implement Guard
	},
	{
		path: 'registro',
		loadChildren: () =>
			import('./modules/auth/auth.module').then((m) => m.AuthModule),
	},
	{ path: '', redirectTo: 'registro', pathMatch: 'full' },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
