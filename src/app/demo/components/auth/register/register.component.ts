import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Register } from '../../../api/auth/register';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
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
export class RegisterComponent implements OnInit {
    userRegister: Register = {};

    constructor(
        public layoutService: LayoutService,
        public authService: AuthService,
        public router: Router,
    ) {}

    ngOnInit(): void {}

    register() {
        console.info({
            register: this.userRegister,
        });

        this.authService.register(this.userRegister).subscribe((token: any) => {
            if (token != null) {
                console.log(token);
                localStorage.setItem('token', token);
                this.router.navigate(['/']);
            }
        });
    }
}
