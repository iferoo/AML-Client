import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Login } from '../../../api/auth/login';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent implements OnInit {
    userLogin: Login = {};
    isRemembered: boolean = false;

    constructor(
        public layoutService: LayoutService,
        public authService: AuthService,
        public router: Router,
        private messageService: MessageService,
    ) {}

    ngOnInit(): void {
        console.log(localStorage.getItem('loginUser'));
        // @ts-ignore
        let loginUser: Login = JSON.parse(localStorage.getItem('loginUser'));
        if (loginUser) {
            this.userLogin = loginUser;
            this.isRemembered = true;
        }
        if (this.authService.loginStatus()) {
            this.router.navigate(['/']);
        }
    }

    login() {
        console.info({
            login: this.userLogin,
            isRemembered: this.isRemembered,
        });

        this.authService.login(this.userLogin).subscribe(
            (token: any) => {
                if (token != null) {
                    console.log(token);
                    localStorage.setItem('token', token);
                    if (this.isRemembered) {
                        localStorage.setItem(
                            'loginUser',
                            JSON.stringify(this.userLogin),
                        );
                    }else {
                        localStorage.removeItem('loginUser')
                    }
                    this.router.navigate(['/']);
                }
            },
            (error: any) => {
                console.log(error)
                this.messageService.add({
                    severity: 'error',
                    detail: 'email or password is incorrect',
                });
            },
        );
    }
}
