import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Table} from 'primeng/table';
import {Customer} from '../../../api/customer';
import {BranchService} from '../../../service/branch.service';
import {BankCustomerService} from '../../../service/bankCustomer.service';
import {BankCustomer} from '../../../api/bankCustomer';

@Component({
    templateUrl: './customers.component.html',
    providers: [MessageService]
})
export class CustomersComponent implements OnInit {


    customerDialog: boolean = false;

    deleteCustomerDialog: boolean = false;

    deleteCustomersDialog: boolean = false;

    customers: BankCustomer[] = [];

    customer: BankCustomer = {};

    selectedCustomers: BankCustomer[] = [];
    submitted: boolean = false;

    cols: any[] = [];

    branches: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private customerService: BankCustomerService,
        private branchService: BranchService,
        private messageService: MessageService,
    ) {
    }

    ngOnInit() {
        this.customerService.fetchCustomers().subscribe(customers => {
            this.customers = customers;
        });

        this.branchService.fetchBranches().subscribe(
            branches => {
                this.branches = branches;
            }
        );

        this.cols = [
            {field: 'id', header: 'Id'},
            {field: 'name', header: 'Name'},
            {field: 'address', header: 'Address'},
            {field: 'email', header: 'Email'},
        ];

    }

    openNew() {
        this.customer = {
        };
        this.submitted = false;
        this.customerDialog = true;
    }

    deleteSelectedCustomers() {
        this.deleteCustomersDialog = true;
    }

    editCustomer(customer: Customer) {
        this.customer = {...customer};
        this.customerDialog = true;
    }

    deleteCustomer(customer: Customer) {
        this.deleteCustomerDialog = true;
        this.customer = {...customer};
    }

    confirmDeleteSelected() {
        this.deleteCustomersDialog = false;
        this.customerService.deleteSelectedCustomers(this.selectedCustomers);
        this.customers = this.customers.filter(customer => !this.selectedCustomers.includes(customer));
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Customers Deleted', life: 3000});
        this.selectedCustomers = [];
    }

    confirmDelete() {
        this.deleteCustomerDialog = false;
        this.customerService.deleteCustomer(this.customer).subscribe((customer: Customer) => {
        });
        this.customers = this.customers.filter(customer => customer.id !== this.customer.id);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Customer Deleted', life: 3000});
        this.customer = {};
    }

    hideDialog() {
        this.customerDialog = false;
        this.submitted = false;
    }

    saveCustomer() {
        this.submitted = true;


        if (this.customer.id) {
            this.customerService.updateCustomer(this.customer).subscribe((customer: Customer) => {
                this.customer = customer;
            });
            this.customers[this.findIndexById(this.customer.id)] = this.customer;
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Customer Updated',
                life: 3000
            });
        } else {
            this.customerService.addCustomer(this.customer).subscribe((customer: Customer) => {
                this.customer = customer;
            });
            this.customers.push(this.customer);
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Customer Created',
                life: 3000
            });
        }
        this.customerDialog = false;
        this.customer = {};


    }

    findIndexById(id: number | undefined): number {
        let index = -1;
        for (let i = 0; i < this.customers.length; i++) {
            // @ts-ignore
            if (this.customers[i].id === id) {
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
