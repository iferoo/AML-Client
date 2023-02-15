import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Table} from 'primeng/table';
import {Bank} from '../../../api/bank';
import {BankService} from '../../../service/bank.service';


@Component({
    templateUrl: './banks.component.html',
    providers: [MessageService]
})
export class BanksComponent implements OnInit {


    bankDialog: boolean = false;

    deleteBankDialog: boolean = false;

    deleteBanksDialog: boolean = false;

    banks: Bank[] = [];

    bank: Bank = {};

    selectedBanks: Bank[] = [];
    submitted: boolean = false;

    cols: any[] = [];

    branches: any[] = [];


    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private bankService: BankService,
        private messageService: MessageService,
    ) {
    }

    ngOnInit() {
        // this.bankService.getEmployees().then(banks => {
        //     console.log(banks);
        //     this.banks = banks;
        // });

        this.bankService.fetchBanks().subscribe(banks => {
            this.banks = banks;
        });

        this.cols = [
            {field: 'id', header: 'Id'},
            {field: 'name', header: 'Name'},
        ];

    }

    openNew() {
        this.bank = {};
        this.submitted = false;
        this.bankDialog = true;
    }

    deleteSelectedBanks() {
        this.deleteBanksDialog = true;
    }

    editBank(bank: Bank) {
        this.bank = {...bank};
        this.bankDialog = true;
    }

    deleteEmployee(bank: Bank) {
        this.deleteBankDialog = true;
        this.bank = {...bank};
    }

    confirmDeleteSelected() {
        this.deleteBanksDialog = false;
        this.bankService.deleteSelectedBanks(this.selectedBanks);
        this.banks = this.banks.filter(bank => !this.selectedBanks.includes(bank));
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Banks Deleted', life: 3000});
        this.selectedBanks = [];
    }

    confirmDelete() {
        this.deleteBankDialog = false;
        this.bankService.deleteBank(this.bank).subscribe((bank: Bank) => {
        });
        this.banks = this.banks.filter(bank => bank.id !== this.bank.id);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Bank Deleted', life: 3000});
        this.bank = {};
    }

    hideDialog() {
        this.bankDialog = false;
        this.submitted = false;
    }

    saveEmployee() {
        this.submitted = true;

        if (this.bank.id) {

            this.bankService.updateBank(this.bank).subscribe((bank: Bank) => {
                this.banks[this.findIndexById(bank.id)] = bank;
            });

            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Bank Updated',
                life: 3000
            });

        } else {

            this.bankService.addBank(this.bank).subscribe((bank: Bank) => {
                this.banks.push(bank);
            });

            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Bank Created',
                life: 3000
            });
        }
        this.bankDialog = false;
        this.bank = {};


    }

    findIndexById(id: number | undefined): number {
        let index = -1;
        for (let i = 0; i < this.banks.length; i++) {
            if (this.banks[i].id === id) {
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
