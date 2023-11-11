import {NgModule} from '@angular/core';
import {SettingsRoutingModule} from './settings-routing.module';
import {SettingsComponent} from './settings.component';
import {FieldsetModule} from "primeng/fieldset";
import {TabViewModule} from "primeng/tabview";

@NgModule({
    imports: [SettingsRoutingModule, FieldsetModule, TabViewModule],
    declarations: [SettingsComponent],
})
export class SettingsModule {}
