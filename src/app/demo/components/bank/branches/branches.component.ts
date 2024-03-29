import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Table} from 'primeng/table';
import {Branch} from '../../../api/branch';
import {BranchService} from '../../../service/branch.service';
import {EgyptGovernments} from '../../../api/governments';

@Component({
    selector:'app-branches',
    templateUrl: './branches.component.html',
    providers: [MessageService]
})
export class BranchesComponent implements OnInit {

    branchDialog: boolean = false;
    deleteBranchDialog: boolean = false;
    deleteBranchesDialog: boolean = false;
    branches: Branch[] = [];
    branch: Branch = {};
    selectedBranches: Branch[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];

    constructor(private branchService: BranchService, private messageService: MessageService) {
    }

    ngOnInit() {
        this.branchService.fetchBranches().subscribe(branches => {
            this.branches = branches;
        });

        this.cols = [
            {field: 'branchId', header: 'Id'},
            {field: 'address', header: 'Address'},
            {field: 'city', header: 'City'},
            {field: 'bank.name', header: 'Bank'},
        ];

        this.statuses = EgyptGovernments;
    }

    openNew() {
        this.branch = {
            // @ts-ignore
            createdAt: new Date().toISOString(),
            isDeleted: false
        };
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
        for (let branch of this.selectedBranches) {
            this.branchService.deleteBranch(branch).subscribe((branch: Branch) => {
                this.branches[branch.branchId! - 1] = branch;
            });
        }
        // this.branches = this.branches.filter(branches => !this.selectedBranches.includes(branches));
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Branches Deleted', life: 3000});
        this.selectedBranches = [];
    }

    confirmDelete() {
        this.deleteBranchDialog = false;
        this.branchService.deleteBranch(this.branch).subscribe((branch: Branch) => {
            this.branches[branch.branchId! - 1] = branch;
        });
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        this.branch = {};
    }

    hideDialog() {
        this.branchDialog = false;
        this.submitted = false;
    }

    saveBranch() {
        this.submitted = true;

        if (this.branch.address && this.branch.city) {

            if (this.branch.address?.trim()) {
                if (this.branch.branchId) {

                    this.branchService.updateBranch(this.branch).subscribe((branch: Branch) => {
                    });
                    this.branches[this.findIndexById(this.branch.branchId)] = this.branch;

                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Branch Updated',
                        life: 3000
                    });
                } else {

                    this.branch.branchId = 0;

                    this.branch.bank = {
                        bankId: 1,
                        name: 'CIB'
                    };

                    this.branchService.addBranch(this.branch).subscribe((branch: Branch) => {
                        this.branches.push(branch);
                    });

                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Branch Created',
                        life: 3000
                    });
                }
                this.branchDialog = false;
                this.branch = {};
            }
        }
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.branches.length; i++) {
            // @ts-ignore
            if (this.branches[i].branchId === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    onGlobalFilter(table: Table, event: Event) {
        console.log(table);
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
