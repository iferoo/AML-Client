import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { Bank } from '../api/bank';
import {environment} from "../../../environments/environment";

@Injectable()
export class BankService {
    constructor(private http: HttpClient) {}

    fetchBanks() {
        return this.http.get<Bank[]>(`${environment.API_URL}/banks`).pipe(
            map((banks) => {
                const banksArray: Bank[] = [];
                for (const bank of banks) {
                    banksArray.push(bank);
                }
                return banksArray;
            }),
            catchError((error) => {
                // Send to analytics server
                return throwError(error);
            }),
        );
    }

    addBank(bank: Bank): any {
        return this.http
            .post<Bank>(`${environment.API_URL}/banks`, bank)
            .pipe(
                map((bank) => {
                    return bank;
                }),
                catchError((error) => {
                    return throwError(error);
                }),
            );
    }

    updateBank(bank: Bank): any {
        return this.http.put(`${environment.API_URL}/banks`, bank).pipe(
            map((bank) => {
                return bank;
            }),
            catchError((error) => {
                return throwError(error);
            }),
        );
    }

    deleteBank(bank: Bank) {
        return this.http.delete(
            `${environment.API_URL}/banks/${bank.bankId}`,
        );
    }

    deleteSelectedBanks(banks: Bank[]) {
        for (const bank of banks) {
            this.http
                .delete(`${environment.API_URL}/banks/${bank.bankId}`)
                .subscribe();
        }
    }
}
