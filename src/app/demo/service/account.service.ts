import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, throwError} from 'rxjs';
import {Account} from '../api/account';

@Injectable()
export class AccountService {
    constructor(private http: HttpClient) {
    }
    fetchAccounts() {
        return this.http
            .get<Account[]>('http://localhost:8080/api/accounts')
            .pipe(
                // @ts-ignore
                map(accounts => {
                    const accountsArray: Account[] = [];
                    for (const account of accounts) {
                        accountsArray.push(account);
                    }
                    return accountsArray;
                }),
                catchError(error => {
                    // Send to analytics server
                    return throwError(error);
                })
            );
    }

    addAccount(account: Account): any {
        let newAccount = {
        };

        return this.http.post<Account>(
            'http://localhost:8080/api/accounts',
            newAccount)
            .pipe(
                map(account => {
                    return account;
                }),
                catchError(error => {
                    return throwError(error);
                })
            );
    }

    updateAccount(account: Account): any {
        let newAccount = {
        };

        return this.http
            .put(
                'http://localhost:8080/api/accounts',
                newAccount)
            .pipe(
                map(branch => {
                    return branch;
                }),
                catchError(error => {
                    return throwError(error);
                })
            );
    }

    deleteAccount(account: Account) {
        return this.http.delete(
            `http://localhost:8080/api/accounts/${account.id}`,
        );
    }

    deleteSelectedAccounts(accounts: Account[]) {
        for (const account of accounts) {
            this.http.delete(
                `http://localhost:8080/api/accounts/${account.id}`,
            ).subscribe();
        }
    }

}
