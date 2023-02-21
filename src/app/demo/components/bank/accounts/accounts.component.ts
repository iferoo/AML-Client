import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Table} from 'primeng/table';
import {AccountService} from '../../../service/account.service';
import {Account} from '../../../api/account';
import {BranchService} from '../../../service/branch.service';

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

    branches: any[] = [];


    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private accountService: AccountService,
        private branchService: BranchService,
        private messageService: MessageService,
    ) {
    }

    ngOnInit() {
        this.accountService.fetchAccounts().subscribe(accounts => {
            console.log(accounts);
            this.accounts = accounts;
        });
        this.branchService.fetchBranches().subscribe(
            branches => {
                this.branches = branches;
            }
        );

        this.cols = [
            {field: 'id', header: 'Id'},
            {field: 'type', header: 'Type'},
            {field: 'balance', header: 'Balance'},
            {field: 'branch.address', header: 'Branch'},
            {field: 'employee.name', header: 'Employee'},
            {field: 'customer.name', header: 'Customer'}
        ];

    }

    openNew() {
        this.account = {};
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
        this.accountService.deleteSelectedAccounts(this.selectedAccounts);
        this.accounts = this.accounts.filter(account => !this.selectedAccounts.includes(account));
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Accounts Deleted', life: 3000});
        this.selectedAccounts = [];
    }

    confirmDelete() {
        this.deleteAccountDialog = false;
        this.accountService.deleteAccount(this.account).subscribe((account: Account) => {
        });
        this.accounts = this.accounts.filter(account => account.id !== this.account.id);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Account Deleted', life: 3000});
        this.account = {};
    }

    hideDialog() {
        this.accountDialog = false;
        this.submitted = false;
    }

    saveAccount() {
        this.submitted = true;


        if (this.account.id) {
            this.accountService.updateAccount(this.account).subscribe((account: Account) => {
                this.account = account;
            });
            this.accounts[this.findIndexById(this.account.id)] = this.account;
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Account Updated',
                life: 3000
            });
        } else {
            this.accountService.addAccount(this.account).subscribe((account: Account) => {
                this.account = account;
            });
            this.accounts.push(this.account);
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

    findIndexById(id: number | undefined): number {
        let index = -1;
        for (let i = 0; i < this.accounts.length; i++) {
            // @ts-ignore
            if (this.accounts[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
