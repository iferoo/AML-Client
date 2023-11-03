import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements OnInit {
    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.items = [
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
                        icon: 'pi pi-logout',
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
