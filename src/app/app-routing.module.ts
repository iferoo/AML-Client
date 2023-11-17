import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AuthGuardService } from './demo/service/auth-guard.service';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: AppLayoutComponent,
                    children: [
                        {
                            path: '',
                            redirectTo: '/dashboard',
                            pathMatch: 'full',
                        },
                        {
                            path: 'dashboard',
                            loadChildren: () =>
                                import(
                                    './demo/components/dashboard/dashboard.module'
                                ).then((m) => m.DashboardModule),
                            canActivate: [AuthGuardService],
                        },
                        {
                            path: 'banks',
                            loadChildren: () =>
                                import(
                                    './demo/components/bank/banks/banks.module'
                                ).then((m) => m.BanksModule),
                            canActivate: [AuthGuardService],
                        },
                        {
                            path: 'branches',
                            loadChildren: () =>
                                import(
                                    './demo/components/bank/branches/branches.module'
                                ).then((m) => m.BranchesModule),
                            canActivate: [AuthGuardService],
                        },
                        {
                            path: 'employees',
                            loadChildren: () =>
                                import(
                                    './demo/components/bank/employees/employees.module'
                                ).then((m) => m.EmployeesModule),
                            canActivate: [AuthGuardService],
                        },
                        {
                            path: 'accounts',
                            loadChildren: () =>
                                import(
                                    './demo/components/bank/accounts/accounts.module'
                                ).then((m) => m.AccountsModule),
                            canActivate: [AuthGuardService],
                        },
                        {
                            path: 'transactions',
                            loadChildren: () =>
                                import(
                                    './demo/components/bank/transactions/transactions.module'
                                ).then((m) => m.TransactionsModule),
                            canActivate: [AuthGuardService],
                        },
                        {
                            path: 'customers',
                            loadChildren: () =>
                                import(
                                    './demo/components/bank/customers/customers.module'
                                ).then((m) => m.CustomersModule),
                            canActivate: [AuthGuardService],
                        },
                        {
                            path: 'transfers',
                            loadChildren: () =>
                                import(
                                    './demo/components/bank/transfers/transfers.module'
                                ).then((m) => m.TransfersModule),
                            canActivate: [AuthGuardService],
                        },
                        {
                            path: 'alerts',
                            loadChildren: () =>
                                import(
                                    './demo/components/bank/alerts/alerts.module'
                                ).then((m) => m.AlertsModule),
                            canActivate: [AuthGuardService],
                        },
                        {
                            path: 'settings',
                            loadChildren: () =>
                                import(
                                    './demo/components/administrator/settings/settings.module'
                                ).then((m) => m.SettingsModule),
                            canActivate: [AuthGuardService],
                        },
                        {
                            path: 'uikit',
                            loadChildren: () =>
                                import(
                                    './demo/components/uikit/uikit.module'
                                ).then((m) => m.UIkitModule),
                            canActivate: [AuthGuardService],
                        },
                        {
                            path: 'utilities',
                            loadChildren: () =>
                                import(
                                    './demo/components/utilities/utilities.module'
                                ).then((m) => m.UtilitiesModule),
                            canActivate: [AuthGuardService],
                        },
                        {
                            path: 'documentation',
                            loadChildren: () =>
                                import(
                                    './demo/components/documentation/documentation.module'
                                ).then((m) => m.DocumentationModule),
                            canActivate: [AuthGuardService],
                        },
                        {
                            path: 'blocks',
                            loadChildren: () =>
                                import(
                                    './demo/components/primeblocks/primeblocks.module'
                                ).then((m) => m.PrimeBlocksModule),
                            canActivate: [AuthGuardService],
                        },
                        {
                            path: 'pages',
                            loadChildren: () =>
                                import(
                                    './demo/components/pages/pages.module'
                                ).then((m) => m.PagesModule),
                            canActivate: [AuthGuardService],
                        },
                    ],
                },
                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./demo/components/auth/auth.module').then(
                            (m) => m.AuthModule,
                        ),
                },
                {
                    path: 'landing',
                    loadChildren: () =>
                        import('./demo/components/landing/landing.module').then(
                            (m) => m.LandingModule,
                        ),
                },
                { path: 'notfound', component: NotfoundComponent },
                { path: '**', redirectTo: '/notfound' },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            },
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
