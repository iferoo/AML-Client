import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Login } from '../../api/auth/login';
import { environment } from '../../../../environments/environment';
import { Register } from '../../api/auth/register';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) {}

    login(login: Login): any {
        return this.http
            .post<any>(`${environment.API_URL}/auth/login`, login)
            .pipe(
                map((response) => {
                    return response.token;
                }),
                catchError((error) => {
                    return throwError(error);
                }),
            );
    }
    register(register: Register): any {
        register.groups = new Set<any>();
        return this.http
            .post<any>(`${environment.API_URL}/auth/register`, register)
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
        return !!localStorage.getItem('token');
    }

    getToken(): any {
        return localStorage.getItem('token');
    }
    decodedToken() {
        const helper = new JwtHelperService();
        // @ts-ignore
        const decodedToken = helper.decodeToken(localStorage.getItem('token'));
        return decodedToken;
    }
}
