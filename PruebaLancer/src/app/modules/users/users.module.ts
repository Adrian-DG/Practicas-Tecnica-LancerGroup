import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { AuthModule } from '../auth/auth.module';
import { IonicModule } from '@ionic/angular';
import { ProfileComponent } from './pages/profile/profile.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [ProfileComponent],
	imports: [
		CommonModule,
		UsersRoutingModule,
		IonicModule,
		AuthModule,
		SharedModule,
	],
})
export class UsersModule {}
