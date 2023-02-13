import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Table} from 'primeng/table';
import {Branch} from '../../../api/branch';
import {BranchService} from '../../../service/branch.service';

@Component({
    templateUrl: './branches.component.html',
    providers: [MessageService]
})
export class BranchesComponent implements OnInit {

    branchDialog: boolean = false;

    deleteBranchDialog: boolean = false;

    deleteBranchesDialog: boolean = false;

    //changed
    branches: Branch[] = [];
    branch: Branch = {};

    selectedBranches: Branch[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private branchService: BranchService, private messageService: MessageService) {
    }

    ngOnInit() {
        this.branchService.getBranches().then(data => this.branches = data);

        this.cols = [
            {field: 'id', header: 'Id'},
            {field: 'address', header: 'Address'},
            {field: 'city', header: 'City'},
            {field: 'bank_id', header: 'Bank Id'},
        ];

        this.statuses = [
            {label: 'ASWAN', value: 'aswan'},
            {label: 'CAIRO', value: 'cairo'},
            {label: 'ALEX', value: 'alex'},
        ];
    }

    openNew() {
        this.branch = {};
        this.submitted = false;
        this.branchDialog = true;
    }

    deleteSelectedBranches() {
        this.deleteBranchesDialog = true;
    }

    editBranch(branch: Branch) {
        this.branch = {...branch};
        this.branchDialog = true;
    }

    deleteBranch(branch: Branch) {
        this.deleteBranchDialog = true;
        this.branch = {...branch};
    }

    confirmDeleteSelected() {
        this.deleteBranchesDialog = false;
        this.branches = this.branches.filter(val => !this.selectedBranches.includes(val));
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Branches Deleted', life: 3000});
        this.selectedBranches = [];
    }

    confirmDelete() {
        this.deleteBranchDialog = false;
        this.branches = this.branches.filter(val => val.id !== this.branch.id);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        this.branch = {};
    }

    hideDialog() {
        this.branchDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        // this.submitted = true;
        //
        // if (this.branch.address?.trim()) {
        //     if (this.branch.id) {
        //         // @ts-ignore
        //         this.branch.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
        //         this.products[this.findIndexById(this.product.id)] = this.product;
        //         this.messageService.add({
        //             severity: 'success',
        //             summary: 'Successful',
        //             detail: 'Product Updated',
        //             life: 3000
        //         });
        //     } else {
        //         this.product.id = this.createId();
        //         this.product.code = this.createId();
        //         this.product.image = 'product-placeholder.svg';
        //         // @ts-ignore
        //         this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
        //         this.products.push(this.product);
        //         this.messageService.add({
        //             severity: 'success',
        //             summary: 'Successful',
        //             detail: 'Product Created',
        //             life: 3000
        //         });
        //     }
        //
        //     this.products = [...this.products];
        //     this.productDialog = false;
        //     this.product = {};
        // }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.branches.length; i++) {
            if (this.branches[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
