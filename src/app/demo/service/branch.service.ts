import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Branch} from '../api/branch';
import {catchError, map, throwError} from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable()
export class BranchService {
    constructor(private http: HttpClient) {
    }

    fetchBranches() {
        return this.http
            .get<Branch[]>(`${environment.API_URL}/branches`)
            .pipe(
                // @ts-ignore
                map(branches => {
                    const branchesArray: Branch[] = [];
                    for (const branch of branches) {
                        branchesArray.push(branch);
                    }
                    return branchesArray;
                }),
                catchError(error => {
                    // Send to analytics server
                    return throwError(error);
                })
            );
    }

    addBranch(branch: Branch): any {
        return this.http.post<Branch>(
            `${environment.API_URL}/branches`,
            branch)
            .pipe(
                map(branch => {
                    return branch;
                }),
                catchError(error => {
                    return throwError(error);
                })
            );

    }

    updateBranch(branch: Branch): any {
        return this.http
            .put(
                `${environment.API_URL}/branches`,
                branch)
            .pipe(
                map(branch => {
                    return branch;
                }),
                catchError(error => {
                    return throwError(error);
                })
            );
    }

    deleteBranch(branch: Branch) {
        return this.http.delete(
            `${environment.API_URL}/branches/${branch.branchId}`,
        );
    }

    deleteSelectedBranches(branches: Branch[]) {
        for (const branch of branches) {
            this.http.delete(
                `${environment.API_URL}/branches/${branch.branchId}`,
            ).subscribe();
        }
    }

}
