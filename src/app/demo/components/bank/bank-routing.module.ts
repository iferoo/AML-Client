import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        {path: 'branches', loadChildren: () => import('./branches/branches.module').then(m => m.BranchesModule)},
        {path: 'employees', loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule)},
        {path: 'transactions', loadChildren: () => import('./branches/branches.module').then(m => m.BranchesModule)},
        {
            path: 'customers', children: [
                {
                    path: 'accounts',
                    loadChildren: () => import('./branches/branches.module').then(m => m.BranchesModule)
                },
                {
                    path: 'transfers',
                    loadChildren: () => import('./branches/branches.module').then(m => m.BranchesModule)
                },
            ]
        },
        {path: '**', redirectTo: '/notfound'}
    ])],
    exports: [RouterModule]
})
export class BankRoutingModule {
}
