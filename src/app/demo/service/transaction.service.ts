import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, throwError} from 'rxjs';
import {Transaction} from '../api/transaction';

@Injectable()
export class TransactionService {
    constructor(private http: HttpClient) {
    }
    fetchTransactions() {
        return this.http
            .get<Transaction[]>('http://localhost:8080/api/transactions')
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

    addTransaction(transaction: Transaction): any {
        return this.http.post<Transaction>(
            'http://localhost:8080/api/transactions',
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
        let newTransaction = {
        };

        return this.http
            .put(
                'http://localhost:8080/api/transactions',
                newTransaction)
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
            `http://localhost:8080/api/transactions/${transaction.id}`,
        );
    }

    deleteSelectedTransactions(transactions: Transaction[]) {
        for (const transaction of transactions) {
            this.http.delete(
                `http://localhost:8080/api/transactions/${transaction.id}`,
            ).subscribe();
        }
    }

}
