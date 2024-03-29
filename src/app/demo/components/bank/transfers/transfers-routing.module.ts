import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TransfersComponent } from './transfers.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: TransfersComponent }
	])],
	exports: [RouterModule]
})
export class TransfersRoutingModule { }
