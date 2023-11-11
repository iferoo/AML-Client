import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';


@Component({
    templateUrl: './settings.component.html',
    providers: [MessageService]
})
export class SettingsComponent implements OnInit {


    constructor() {
    }

    ngOnInit() {

    }

}
