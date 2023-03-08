import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';

import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
	declarations: [ToolbarComponent],
	imports: [
		CommonModule,
		IonicModule,
		HttpClientModule,
		IonicStorageModule.forRoot(),
	],
	exports: [ToolbarComponent],
})
export class SharedModule {}
