import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, throwError} from 'rxjs';
import {Transfer} from '../api/transfer';
import {environment} from "../../../environments/environment";

@Injectable()
export class TransferService {
    constructor(private http: HttpClient) {
    }

    fetchTransfers() {
        return this.http
            .get<Transfer[]>(`${environment.API_URL}/transfers`)
            .pipe(
                // @ts-ignore
                map(transfers => {
                    const transfersArray: Transfer[] = [];
                    for (const transfer of transfers) {
                        transfersArray.push(transfer);
                    }
                    return transfersArray;
                }),
                catchError(error => {
                    // Send to analytics server
                    return throwError(error);
                })
            );
    }

    addTransfer(transfer: Transfer): any {
        // let newTransfer = {
        //     id: transfer.id,
        //     transaction: transfer.transaction?.id,
        //     reciever: transfer.reciever?.id,
        //     status: transfer.status,
        // };

        return this.http.post<Transfer>(
            `${environment.API_URL}/transfers`,
            transfer)
            .pipe(
                map(transfer => {
                    return transfer;
                }),
                catchError(error => {
                    return throwError(error);
                })
            );
    }

    updateTransfer(transfer: Transfer): any {
        let newTransfer = {};

        return this.http
            .put(
                `${environment.API_URL}/transfers`,
                transfer)
            .pipe(
                map(branch => {
                    return branch;
                }),
                catchError(error => {
                    return throwError(error);
                })
            );
    }

    deleteTransfer(transfer: Transfer) {
        return this.http.delete(
            `${environment.API_URL}/transfers/${transfer.transferId}`,
        );
    }

    deleteSelectedTransfers(transfers: Transfer[]) {
        for (const transfer of transfers) {
            this.http.delete(
                `${environment.API_URL}/transfers/${transfer.transferId}`,
            ).subscribe();
        }
    }

}
