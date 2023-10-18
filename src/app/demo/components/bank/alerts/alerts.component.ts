import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Table} from 'primeng/table';
import {Alert} from '../../../api/alert';
import {AlertService} from '../../../service/alert.service';


@Component({
    templateUrl: './alerts.component.html',
    providers: [MessageService]
})
export class AlertsComponent implements OnInit {
    alerts: Alert[] = [];
    // alert: Alert = {};
    selectedAlerts: Alert[] = [];
    submitted: boolean = false;
    cols: any[] = [];


    constructor(
        private alertService: AlertService,
    ) {
    }

    ngOnInit() {

        this.alertService.fetchAlerts().subscribe(alerts => {
            this.alerts = alerts;
        });

        this.cols = [
            {field: 'alertId', header: 'Id'},
            {field: 'account.id', header: 'AccountId'},
        ];

    }


    findIndexById(id: number | undefined): number {
        let index = -1;
        for (let i = 0; i < this.alerts.length; i++) {
            if (this.alerts[i].alertId === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
