import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Table} from 'primeng/table';
import {ProductService} from 'src/app/demo/service/product.service';
import {EmployeeService} from '../../../service/employee.service';
import {Employee} from '../../../api/employee';
import {BranchService} from '../../../service/branch.service';

@Component({
    templateUrl: './customers.component.html',
    providers: [MessageService]
})
export class CustomersComponent implements OnInit {


    employeeDialog: boolean = false;

    deleteEmployeeDialog: boolean = false;

    deleteEmployeesDialog: boolean = false;

    employees: Employee[] = [];

    employee: Employee = {};

    selectedEmployees: Employee[] = [];
    submitted: boolean = false;

    cols: any[] = [];

    branches: any[] = [];


    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private productService: ProductService,
        private employeeService: EmployeeService,
        private messageService: MessageService,
        private branchService: BranchService
    ) {
    }

    ngOnInit() {
        // this.employeeService.getEmployees().then(employees => {
        //     console.log(employees);
        //     this.employees = employees;
        // });

        this.employeeService.fetchEmployees().subscribe(employees => {
            this.employees = employees;
        });
        this.branchService.fetchBranches().subscribe(
            branches => {
                this.branches = branches;
            }
        );

        this.cols = [
            {field: 'id', header: 'Id'},
            {field: 'name', header: 'Name'},
            {field: 'salary', header: 'Salary'},
            {field: 'email', header: 'Email'},
            {field: 'bank.name', header: 'Bank'},
            {field: 'branch.address', header: 'Branch'}
        ];

    }

    openNew() {
        this.employee = {
            id: 0,
            name: '',
            email: '',
            salary: 0,
            bank: {
                id: 1,
                name: 'CIB'
            },
            branch: {}
        };
        this.submitted = false;
        this.employeeDialog = true;
    }

    deleteSelectedEmployees() {
        this.deleteEmployeesDialog = true;
    }

    editEmployee(employee: Employee) {
        this.employee = {...employee};
        this.employeeDialog = true;
    }

    deleteEmployee(employee: Employee) {
        this.deleteEmployeeDialog = true;
        this.employee = {...employee};
    }

    confirmDeleteSelected() {
        this.deleteEmployeesDialog = false;
        this.employeeService.deleteSelectedEmployees(this.selectedEmployees);
        this.employees = this.employees.filter(employee => !this.selectedEmployees.includes(employee));
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Employees Deleted', life: 3000});
        this.selectedEmployees = [];
    }

    confirmDelete() {
        this.deleteEmployeeDialog = false;
        this.employeeService.deleteEmployee(this.employee).subscribe((employee: Employee) => {
        });
        this.employees = this.employees.filter(employee => employee.id !== this.employee.id);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Employee Deleted', life: 3000});
        this.employee = {};
    }

    hideDialog() {
        this.employeeDialog = false;
        this.submitted = false;
    }

    saveEmployee() {
        this.submitted = true;


        if (this.employee.id) {
            this.employeeService.updateEmployee(this.employee).subscribe((employee: Employee) => {
                this.employee = employee;
            });
            this.employees[this.findIndexById(this.employee.id)] = this.employee;
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Employee Updated',
                life: 3000
            });
        } else {
            this.employeeService.addEmployee(this.employee).subscribe((employee: Employee) => {
                this.employee = employee;
            });
            this.employees.push(this.employee);
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Employee Created',
                life: 3000
            });
        }
        this.employeeDialog = false;
        this.employee = {};


    }

    findIndexById(id: number | undefined): number {
        let index = -1;
        for (let i = 0; i < this.employees.length; i++) {
            // @ts-ignore
            if (this.employees[i].id === id) {
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
