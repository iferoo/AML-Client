import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, throwError} from 'rxjs';
import {BankCustomer} from '../api/bankCustomer';
import {environment} from "../../../environments/environment";

@Injectable()
export class BankCustomerService {
    constructor(private http: HttpClient) {
    }

    fetchCustomers() {
        return this.http
            .get<BankCustomer[]>(`${environment.API_URL}/customers`)
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
            `${environment.API_URL}/customers`,
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
                `${environment.API_URL}/customers`,
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
            `${environment.API_URL}/customers/${customer.customerId}`,
        );
    }

    deleteSelectedCustomers(customers: BankCustomer[]) {
        for (const customer of customers) {
            this.http.delete(
                `${environment.API_URL}/customers/${customer.customerId}`,
            ).subscribe();
        }
    }

}
