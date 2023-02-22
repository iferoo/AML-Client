import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, throwError} from 'rxjs';
import {Employee} from '../api/employee';

@Injectable()
export class EmployeeService {
    constructor(private http: HttpClient) {
    }
    fetchEmployees() {
        return this.http
            .get<Employee[]>('http://localhost:8080/api/employees')
            .pipe(
                // @ts-ignore
                map(employees => {
                    const employeesArray: Employee[] = [];
                    for (const employee of employees) {
                        employeesArray.push(employee);
                    }
                    return employeesArray;
                }),
                catchError(error => {
                    // Send to analytics server
                    return throwError(error);
                })
            );
    }

    addEmployee(employee: Employee): any {
        return this.http.post<Employee>(
            'http://localhost:8080/api/employees',
            employee)
            .pipe(
                map(employee => {
                    return employee;
                }),
                catchError(error => {
                    return throwError(error);
                })
            );
    }

    updateEmployee(employee: Employee): any {
        return this.http
            .put(
                'http://localhost:8080/api/employees',
                employee)
            .pipe(
                map(branch => {
                    return branch;
                }),
                catchError(error => {
                    return throwError(error);
                })
            );
    }

    deleteEmployee(employee: Employee) {
        return this.http.delete(
            `http://localhost:8080/api/employees/${employee.id}`,
        );
    }

    deleteSelectedEmployees(employees: Employee[]) {
        for (const employee of employees) {
            this.http.delete(
                `http://localhost:8080/api/employees/${employee.id}`,
            ).subscribe();
        }
    }

}
