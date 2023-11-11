import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        {path: 'bank', loadChildren: () => import('./banks/banks.module').then(m => m.BanksModule)},

    ])],
    exports: [RouterModule]
})
export class BankRoutingModule {
}
