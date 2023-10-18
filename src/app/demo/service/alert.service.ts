import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, throwError} from 'rxjs';
import {Alert} from '../api/alert';

@Injectable()
export class AlertService {
    constructor(private http: HttpClient) {
    }

    fetchAlerts() {
        return this.http
            .get<Alert[]>('http://localhost:8080/api/alerts')
            .pipe(
                // @ts-ignore
                map(alerts => {
                    const alertsArray: Alert[] = [];
                    for (const alert of alerts) {
                        alertsArray.push(alert);
                    }
                    return alertsArray;
                }),
                catchError(error => {
                    // Send to analytics server
                    return throwError(error);
                })
            );
    }

    addAlert(alert: Alert): any {
        // let newAlert = {
        //     id: alert.id,
        //     transaction: alert.transaction?.id,
        //     reciever: alert.reciever?.id,
        //     status: alert.status,
        // };

        return this.http.post<Alert>(
            'http://localhost:8080/api/alerts',
            alert)
            .pipe(
                map(alert => {
                    return alert;
                }),
                catchError(error => {
                    return throwError(error);
                })
            );
    }

    updateAlert(alert: Alert): any {
        let newAlert = {};

        return this.http
            .put(
                'http://localhost:8080/api/alerts',
                alert)
            .pipe(
                map(branch => {
                    return branch;
                }),
                catchError(error => {
                    return throwError(error);
                })
            );
    }

    deleteAlert(alert: Alert) {
        return this.http.delete(
            `http://localhost:8080/api/alerts/${alert.alertId}`,
        );
    }

    deleteSelectedAlerts(alerts: Alert[]) {
        for (const alert of alerts) {
            this.http.delete(
                `http://localhost:8080/api/alerts/${alert.alertId}`,
            ).subscribe();
        }
    }

}
