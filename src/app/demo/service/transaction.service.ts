import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, throwError} from 'rxjs';
import {Transaction} from '../api/transaction';
import {environment} from "../../../environments/environment";

@Injectable()
export class TransactionService {
    constructor(private http: HttpClient) {
    }
    fetchTransactions() {
        return this.http
            .get<Transaction[]>(`${environment.API_URL}/transactions`)
            .pipe(
                // @ts-ignore
                map(transactions => {
                    const transactionsArray: Transaction[] = [];
                    for (const transaction of transactions) {
                        transactionsArray.push(transaction);
                    }
                    return transactionsArray;
                }),
                catchError(error => {
                    // Send to analytics server
                    return throwError(error);
                })
            );
    }

    addTransaction(transaction: Transaction | any): any {
        return this.http.post<Transaction>(
            `${environment.API_URL}/transactions`,
            transaction)
            .pipe(
                map(transaction => {
                    return transaction;
                }),
                catchError(error => {
                    return throwError(error);
                })
            );
    }

    updateTransaction(transaction: Transaction): any {
        return this.http
            .put(
                `${environment.API_URL}/transactions`,
                transaction)
            .pipe(
                map(branch => {
                    return branch;
                }),
                catchError(error => {
                    return throwError(error);
                })
            );
    }

    deleteTransaction(transaction: Transaction) {
        return this.http.delete(
            `${environment.API_URL}/transactions/${transaction.id}`,
        );
    }

    deleteSelectedTransactions(transactions: Transaction[]) {
        for (const transaction of transactions) {
            this.http.delete(
                `${environment.API_URL}/transactions/${transaction.id}`,
            ).subscribe();
        }
    }

}
