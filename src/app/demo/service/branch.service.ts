import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Branch} from '../api/branch';
import {catchError, map, throwError} from 'rxjs';

@Injectable()
export class BranchService {
    constructor(private http: HttpClient) {
    }

    fetchBranches() {
        return this.http
            .get<Branch[]>('http://localhost:8080/api/branches')
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
            'http://localhost:8080/api/branches',
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
                'http://localhost:8080/api/branches',
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
            `http://localhost:8080/api/branches/${branch.branchId}`,
        );
    }

    deleteSelectedBranches(branches: Branch[]) {
        for (const branch of branches) {
            this.http.delete(
                `http://localhost:8080/api/branches/${branch.branchId}`,
            ).subscribe();
        }
    }

}
