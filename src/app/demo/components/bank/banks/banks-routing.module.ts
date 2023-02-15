import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BanksComponent } from './banks.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: BanksComponent }
	])],
	exports: [RouterModule]
})
export class BanksRoutingModule { }
