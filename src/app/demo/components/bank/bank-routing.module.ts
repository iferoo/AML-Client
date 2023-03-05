import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        {path: '', loadChildren: () => import('./banks/banks.module').then(m => m.BanksModule)},
        {path: 'branches', loadChildren: () => import('./branches/branches.module').then(m => m.BranchesModule)},
        {path: 'employees', loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule)},
        {path: 'accounts', loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule)},
        {
            path: 'transactions',
            loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsModule)
        },
        {path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)},
        {path: 'transfers', loadChildren: () => import('./transfers/transfers.module').then(m => m.TransfersModule)},
        {path: 'alerts', loadChildren: () => import('./alerts/alerts.module').then(m => m.AlertsModule)},
        // {
        //     path: 'customers', children: []
        // },
        {path: '**', redirectTo: '/notfound'}
    ])],
    exports: [RouterModule]
})
export class BankRoutingModule {
}
