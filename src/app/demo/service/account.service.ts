import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, throwError} from 'rxjs';
import {Account} from '../api/account';
import {environment} from "../../../environments/environment";

@Injectable()
export class AccountService {
    constructor(private http: HttpClient) {
    }

    fetchAccounts() {
        return this.http
            .get<Account[]>(`${environment.API_URL}/accounts`)
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
        return this.http.post<Account>(
            `${environment.API_URL}/accounts`,
            account)
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
        return this.http
            .put(
                `${environment.API_URL}/accounts`,
                account)
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
            `${environment.API_URL}/accounts/${account.accountId}`,
        );
    }

    deleteSelectedAccounts(accounts: Account[]) {
        for (const account of accounts) {
            this.http.delete(
                `${environment.API_URL}/accounts/${account.accountId}`,
            ).subscribe();
        }
    }

}
