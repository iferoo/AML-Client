import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Branch} from '../api/branch';
import {catchError, map, throwError} from 'rxjs';
import {Bank} from '../api/bank';
import {Employee} from '../api/employee';

@Injectable()
export class BankService {
    constructor(private http: HttpClient) {
    }

    fetchBanks() {
        return this.http
            .get<Bank[]>('http://localhost:8080/api/banks')
            .pipe(
                map(banks => {
                    const banksArray: Bank[] = [];
                    for (const bank of banks) {
                        banksArray.push(bank);
                    }
                    return banksArray;
                }),
                catchError(error => {
                    // Send to analytics server
                    return throwError(error);
                })
            );
    }
    addBank(bank: Bank): any {
        return this.http.post<Bank>(
            'http://localhost:8080/api/banks',
            bank)
            .pipe(
                map(bank => {
                    return bank;
                }),
                catchError(error => {
                    return throwError(error);
                })
            );
    }

    updateBank(bank: Bank): any {
        return this.http
            .put(
                'http://localhost:8080/api/banks',
                bank)
            .pipe(
                map(bank => {
                    return bank;
                }),
                catchError(error => {
                    return throwError(error);
                })
            );
    }

    deleteBank(bank: Bank) {
        return this.http.delete(
            `http://localhost:8080/api/banks/${bank.id}`,
        );
    }

    deleteSelectedBanks(banks: Bank[]) {
        for (const bank of banks) {
            this.http.delete(
                `http://localhost:8080/api/banks/${bank.id}`,
            ).subscribe();
        }
    }

}