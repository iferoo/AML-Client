import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, throwError} from 'rxjs';
import {BankCustomer} from '../api/bankCustomer';

@Injectable()
export class BankCustomerService {
    constructor(private http: HttpClient) {
    }

    fetchCustomers() {
        return this.http
            .get<BankCustomer[]>('http://localhost:8080/api/customers')
            .pipe(
                // @ts-ignore
                map(customers => {
                    const customersArray: BankCustomer[] = [];
                    for (const customer of customers) {
                        customersArray.push(customer);
                    }
                    return customersArray;
                }),
                catchError(error => {
                    // Send to analytics server
                    return throwError(error);
                })
            );
    }

    addCustomer(customer: BankCustomer): any {
        return this.http.post<BankCustomer>(
            'http://localhost:8080/api/customers',
            customer)
            .pipe(
                map(customer => {
                    return customer;
                }),
                catchError(error => {
                    return throwError(error);
                })
            );
    }

    updateCustomer(customer: BankCustomer): any {
        return this.http
            .put(
                'http://localhost:8080/api/customers',
                customer)
            .pipe(
                map(branch => {
                    return branch;
                }),
                catchError(error => {
                    return throwError(error);
                })
            );
    }

    deleteCustomer(customer: BankCustomer) {
        return this.http.delete(
            `http://localhost:8080/api/customers/${customer.id}`,
        );
    }

    deleteSelectedCustomers(customers: BankCustomer[]) {
        for (const customer of customers) {
            this.http.delete(
                `http://localhost:8080/api/customers/${customer.id}`,
            ).subscribe();
        }
    }

}
