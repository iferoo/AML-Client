import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Branch} from '../api/branch';

@Injectable()
export class BranchService {
    constructor(private http: HttpClient) {
    }

    getBranches() {
        return this.http.get<any>('assets/demo/data/branches.json')
            .toPromise()
            .then(res => res.data as Branch[])
            .then(data => data);
    }
}
