import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Table} from 'primeng/table';
import {TransferService} from '../../../service/transfer.service';
import {Transfer} from '../../../api/transfer';
import {BranchService} from '../../../service/branch.service';
import {TransactionService} from '../../../service/transaction.service';
import {Transaction} from '../../../api/transaction';
import {AccountService} from '../../../service/account.service';
import {Account} from '../../../api/account';
import {Branch} from '../../../api/branch';

@Component({
    templateUrl: './transfers.component.html',
    providers: [MessageService]
})
export class TransfersComponent implements OnInit {


    transferDialog: boolean = false;

    deleteTransferDialog: boolean = false;

    deleteTransfersDialog: boolean = false;

    transfers: Transfer[] = [];

    transfer: Transfer = {};

    selectedTransfers: Transfer[] = [];
    submitted: boolean = false;

    cols: any[] = [];

    branches: Branch[] = [];
    accounts: Account[] = [];
    methods: any[] = [];
    operations: any[] = [];
    statuses: any[] = [];
    transferStatus: any[] = [];
    transactions: Transaction[] = [];
    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private transferService: TransferService,
        private transactionService: TransactionService,
        private accountService: AccountService,
        private branchService: BranchService,
        private messageService: MessageService,
    ) {
    }

    ngOnInit() {
        this.transferService.fetchTransfers().subscribe(transfers => {
            this.transfers = transfers;
        });

        this.transactionService.fetchTransactions().subscribe(transactions => {
            this.transactions = transactions;
        });

        this.branchService.fetchBranches().subscribe(
            branches => {
                this.branches = branches;
            }
        );

        this.accountService.fetchAccounts().subscribe(
            accounts => {
                this.accounts = accounts;
            }
        );

        this.methods = [
            {
                label: 'TELLER',
                value: 'teller',
                inactive: false
            }
            , {
                label: 'ATM',
                value: 'atm',
                inactive: true
            }];

        this.operations = [
            {label: 'DEPOSITE', value: 'deposite', inactive: false},
            {label: 'WITHDRAW', value: 'withdraw', inactive: true}];

        this.statuses = [
            {label: 'approve', value: 'instock', inactive: false},
            {label: 'pending', value: 'lowstock', inactive: true},
            {label: 'decline', value: 'outofstock', inactive: true}
        ];

        this.cols = [
            {field: 'id', header: 'Id'},
            {field: 'transaction.method', header: 'Method'},
            {field: 'transaction.operation', header: 'Operation'},
            {field: 'transaction.amount', header: 'Amount'},
            {field: 'transaction.account.id', header: 'Sender Id'},
            {field: 'transaction.account.name', header: 'Sender Name'},
            {field: 'reciever.id', header: 'Reciever Id'},
            {field: 'reciever.name', header: 'Reciever Id'},
            {field: 'status', header: 'Status'}
        ];

    }

    openNew() {
        this.transfer = {
            id: 0,
            reciever: {},
            transaction: {
                method: 'teller',
                operation: 'deposite',
                amount: 0,
                date: new Date(),
                account: {}
            },
            status: 'approve'
        };
        this.submitted = false;
        this.transferDialog = true;
    }

    deleteSelectedTransfers() {
        this.deleteTransfersDialog = true;
    }

    editTransfer(transfer: Transfer) {
        this.transfer = {...transfer};
        this.transferDialog = true;
    }

    deleteTransfer(transfer: Transfer) {
        this.deleteTransferDialog = true;
        this.transfer = {...transfer};
    }

    confirmDeleteSelected() {
        this.deleteTransfersDialog = false;
        this.transferService.deleteSelectedTransfers(this.selectedTransfers);
        this.transfers = this.transfers.filter(transfer => !this.selectedTransfers.includes(transfer));
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Transfers Deleted', life: 3000});
        this.selectedTransfers = [];
    }

    confirmDelete() {
        this.deleteTransferDialog = false;
        this.transferService.deleteTransfer(this.transfer).subscribe((transfer: Transfer) => {
        });
        this.transfers = this.transfers.filter(transfer => transfer.id !== this.transfer.id);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Transfer Deleted', life: 3000});
        this.transfer = {};
    }

    hideDialog() {
        this.transferDialog = false;
        this.submitted = false;
    }

    saveTransfer() {
        this.submitted = true;
        // @ts-ignore
        if (this.transfer.transaction?.amount > this.transfer.transaction?.account?.balance) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'There Is No Enough Mony',
                life: 3000
            });
        } else {
            if (this.transfer.transaction!.method! &&
                this.transfer.transaction!.amount! > 0 &&
                this.transfer.transaction!.account!.id &&
                this.transfer.reciever?.id) {

                if (this.transfer.id) {
                    this.transferService.updateTransfer(this.transfer).subscribe((transfer: Transfer) => {
                        this.transfers[this.findIndexById(transfer.id)] = transfer;
                    });
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Transfer Updated',
                        life: 3000
                    });
                } else {

                    // let date = new Date(this.transfer.transaction.date).toISOString();
                    let transaction: Transaction = {
                        ...this.transfer.transaction,
                        // @ts-ignore
                        date: new Date(this.transfer.transaction!.date!).toISOString()
                    };
                    this.transactionService.addTransaction(transaction).subscribe((transaction: Transaction) => {
                        this.setTransaction(transaction);
                    });


                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Transfer Created',
                        life: 3000
                    });
                }
                this.transferDialog = false;
            }
        }
    }

    setTransaction(transaction: Transaction): void {

        this.transfer.transaction = transaction;
        this.transferService.addTransfer(this.transfer).subscribe((transfer: Transfer) => {
            this.transfers.push(transfer);
        });

        this.transfer = {};

    }

    findIndexById(id: number | undefined): number {
        let index = -1;
        for (let i = 0; i < this.transfers.length; i++) {
            // @ts-ignore
            if (this.transfers[i].id === id) {
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
