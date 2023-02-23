import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Product} from '../../api/product';
import {ProductService} from '../../service/product.service';
import {Subscription} from 'rxjs';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {BranchService} from '../../service/branch.service';
import {Branch} from '../../api/branch';
import {AccountService} from '../../service/account.service';
import {Account} from '../../api/account';
import {TransferService} from '../../service/transfer.service';
import {EmployeeService} from '../../service/employee.service';
import {Transfer} from '../../api/transfer';
import {Employee} from '../../api/employee';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;
    transfers: Transfer[] = [];
    branches: Branch[] = [];
    accounts: Account[] = [];
    employees: Employee[] = [];
    transfer: Transfer = {};

    constructor(
        private transferService: TransferService,
        private branchService: BranchService,
        private accountService: AccountService,
        private employeeService: EmployeeService,
        private productService: ProductService,
        public layoutService: LayoutService
    ) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.initChart();

        this.productService.getProductsSmall().then(data => this.products = data);

        this.transferService.fetchTransfers().subscribe(transfers => {
            this.transfers = transfers;
            // this.transfer = transfers[transfers.length - 1];
        });

        this.branchService.fetchBranches().subscribe(branches => {
            this.branches = branches;
        });

        this.accountService.fetchAccounts().subscribe(accounts => {
            this.accounts = accounts;
        });

        this.employeeService.fetchEmployees().subscribe(employees => {
            this.employees = employees;
        });

        this.items = [
            {label: 'Add New', icon: 'pi pi-fw pi-plus'},
            {label: 'Remove', icon: 'pi pi-fw pi-minus'}
        ];
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                // {
                //     label: 'First Dataset',
                //     data: [65, 59, 80, 81, 56, 55, 40],
                //     fill: false,
                //     backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                //     borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                //     tension: .4
                // },
                {
                    label: 'Transfers',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
