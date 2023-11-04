import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { Router } from '@angular/router';
import { AuthService } from '../demo/service/auth/auth.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements OnInit {
    name!: string;
    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.name =
            this.authService.decodedToken().firstname.toUpperCase() +
            ' ' +
            this.authService.decodedToken().lastname.toUpperCase();

        this.items = [
            {
                label: this.name,
            },
            {
                label: 'Options',
                items: [
                    {
                        label: 'Profile',
                        icon: 'pi pi-user',
                        command: () => {
                            // this.update();
                        },
                    },
                    {
                        label: 'Log Out',
                        icon: 'pi pi-arrow-left',
                        command: () => {
                            this.logout();
                        },
                    },
                ],
            },
        ];
    }
    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/auth/login']);
    }
}
