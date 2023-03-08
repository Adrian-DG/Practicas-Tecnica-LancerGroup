import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
	declarations: [],
	imports: [CommonModule, AuthRoutingModule, HttpClientModule, SharedModule],
})
export class AuthModule {}
