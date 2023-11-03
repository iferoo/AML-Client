import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Login } from '../api/auth/login';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) {}

    login(login: Login): any {
        return this.http
            .post<any>('http://localhost:8080/api/v1/auth/login', login)
            .pipe(
                map((response) => {
                    return response.token;
                }),
                catchError((error) => {
                    return throwError(error);
                }),
            );
    }

    loginStatus(): boolean {
        // console.log(!!localStorage.getItem('token'))
        return !!localStorage.getItem('token');
    }
}
