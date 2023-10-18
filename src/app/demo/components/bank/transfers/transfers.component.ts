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
                inactive: false
            }];

        this.operations = [
            {label: 'TRANSFER', value: 'transfer', inactive: false},
            {label: 'DEPOSIT', value: 'deposit', inactive: false},
            {label: 'WITHDRAW', value: 'withdraw', inactive: false}];

        this.statuses = [
            {label: 'approve', value: 'instock', inactive: false},
            {label: 'pending', value: 'lowstock', inactive: true},
            {label: 'decline', value: 'outofstock', inactive: true}
        ];

        this.cols = [
            {field: 'transferId', header: 'Id'},
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
            transferId: 0,
            reciever: {},
            transaction: {
                method: 'teller',
                operation: 'transfer',
                amount: 0,
                createdDate: null,
                createdTime: null,
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
        this.transfers = this.transfers.filter(transfer => transfer.transferId !== this.transfer.transferId);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Transfer Deleted', life: 3000});
        this.transfer = {};
    }

    hideDialog() {
        this.transferDialog = false;
        this.submitted = false;
    }

    saveTransfer() {
        this.submitted = true;

        if (this.transfer.transaction?.amount! > 5000) {

            //@ts-ignore
            if (this.transfer.transaction?.amount > this.transfer.transaction?.account?.balance &&
                this.transfer.transaction?.operation !== 'deposit') {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'There Is No Enough Mony',
                    life: 3000
                });
            } else {


                let transaction = {
                    ...this.transfer.transaction,
                    createdDate: null,
                    createdTime: null,
                };

                this.transactionService.addTransaction(transaction).subscribe((transaction: Transaction) => {
                    this.addTransfer(transaction);
                });


                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Transfer Created',
                    life: 3000
                });
                this.transferDialog = false;
            }
        }
    }

    addTransfer(transaction: Transaction): void {
        this.transfer.transaction = transaction;

        if (transaction.operation !== 'transfer') {
            this.transfer.reciever = null;
        }

        this.transferService.addTransfer(this.transfer).subscribe((transfer: Transfer) => {
            this.transfers.push(transfer);
        });

        this.transfer = {};
    }

    findIndexById(id: number | undefined): number {
        let index = -1;
        for (let i = 0; i < this.transfers.length; i++) {
            // @ts-ignore
            if (this.transfers[i].transferId === id) {
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
