import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Table} from 'primeng/table';
import {AccountService} from '../../../service/account.service';
import {Account} from '../../../api/account';
import {BranchService} from '../../../service/branch.service';
import {BankCustomerService} from '../../../service/bankCustomer.service';
import {BankCustomer} from '../../../api/bankCustomer';
import {Branch} from '../../../api/branch';
import {EmployeeService} from '../../../service/employee.service';
import {Employee} from '../../../api/employee';

@Component({
    templateUrl: './accounts.component.html',
    providers: [MessageService]
})
export class AccountsComponent implements OnInit {

    accountDialog: boolean = false;
    deleteAccountDialog: boolean = false;
    deleteAccountsDialog: boolean = false;
    accounts: Account[] = [];
    account: Account = {};
    selectedAccounts: Account[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    branches: Branch[] = [];
    customers: BankCustomer[] = [];
    employees: Employee[] = [];
    accountTypes: string[] = [];
    rowsPerPageOptions = [5, 10, 20];
    isEdit: boolean = true;

    constructor(
        private accountService: AccountService,
        private branchService: BranchService,
        private bankCustomerService: BankCustomerService,
        private employeeService: EmployeeService,
        private messageService: MessageService,
    ) {
    }

    ngOnInit() {
        this.accountService.fetchAccounts().subscribe(accounts => {
            this.accounts = accounts;
        });

        this.branchService.fetchBranches().subscribe(branches => {
            this.branches = branches;
        });

        this.bankCustomerService.fetchCustomers().subscribe(customers => {
            this.customers = customers;
        });

        this.employeeService.fetchEmployees().subscribe(employees => {
            this.employees = employees;
        });

        this.accountTypes = ['Saving', 'Current'];

        this.cols = [
            {field: 'accountId', header: 'Id'},
            {field: 'type', header: 'Type'},
            {field: 'balance', header: 'Balance'},
            {field: 'branch.address', header: 'Branch'},
            {field: 'employee.name', header: 'Employee'},
            {field: 'customer.name', header: 'Customer'}
        ];
    }

    openNew() {
        this.account = {
            accountId: 0,
            branch: {},
            balance: 0,
            isDeleted: false,
            createdAt: new Date().toISOString(),
        };
        this.isEdit = false;
        this.submitted = false;
        this.accountDialog = true;
    }

    deleteSelectedAccounts() {
        this.deleteAccountsDialog = true;
    }

    editAccount(account: Account) {
        this.account = {...account};
        this.accountDialog = true;
    }

    deleteAccount(account: Account) {
        this.deleteAccountDialog = true;
        this.account = {...account};
    }

    confirmDeleteSelected() {
        this.deleteAccountsDialog = false;
        for (let account of this.selectedAccounts) {
            this.accountService.deleteAccount(account).subscribe((account: Account) => {
                this.accounts[account.accountId! - 1] = account;
            });
        }
        // this.accountService.deleteSelectedAccounts(this.selectedAccounts);
        // this.accounts = this.accounts.filter(account => !this.selectedAccounts.includes(account));
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Accounts Deleted', life: 3000});
        this.selectedAccounts = [];
    }

    confirmDelete() {
        this.deleteAccountDialog = false;
        this.accountService.deleteAccount(this.account).subscribe((account: Account) => {
            this.accounts[account.accountId! - 1] = account;
        });
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Account Deleted', life: 3000});
        this.account = {};
    }

    hideDialog() {
        this.accountDialog = false;
        this.submitted = false;
    }

    saveAccount() {
        this.submitted = true;
        // @ts-ignore
        if (this.account.type && this.account.balance > 0 && this.account.customer?.customerId && this.account.branch?.branchId && this.account.employee?.employeeId) {
            if (this.account.accountId) {

                this.accountService.updateAccount(this.account).subscribe((account: Account) => {
                    this.accounts[this.findIndexById(account.accountId)] = account;
                });

                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Account Updated',
                    life: 3000
                });

            } else {

                this.accountService.addAccount(this.account).subscribe((account: Account) => {
                    this.accounts.push(account);
                });

                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Account Created',
                    life: 3000
                });
            }
            this.accountDialog = false;
            this.account = {};
        }
    }

    findIndexById(id: number | undefined): number {
        let index = -1;
        for (let i = 0; i < this.accounts.length; i++) {
            // @ts-ignore
            if (this.accounts[i].accountId === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    filterEmployees(branch: Branch) {
        // @ts-ignore
        let filteredEmployees = this.employees.filter((employee: Employee) => {
            if (employee.branch?.branchId === branch.branchId) {
                return employee;
            }
        });
        return filteredEmployees;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
