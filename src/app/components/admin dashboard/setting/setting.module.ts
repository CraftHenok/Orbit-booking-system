import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SettingRoutingModule} from './setting-routing.module';
import {SettingComponent} from './setting.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {AddComponent} from './options/add/add.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {AppointmentStatusComponent} from './options/appointment-status/appointment-status.component';
import {AppointmentTypeComponent} from './options/appointment-type/appointment-type.component';
import {DurationComponent} from './options/duration/duration.component';
import {EmergencyTitleComponent} from './options/emergency-title/emergency-title.component';
import {PatientTitleComponent} from './options/patient-title/patient-title.component';
import {MatListModule} from '@angular/material/list';


@NgModule({
  declarations: [
    SettingComponent,
    AddComponent,
    AppointmentStatusComponent,
    AppointmentTypeComponent,
    DurationComponent,
    EmergencyTitleComponent,
    PatientTitleComponent
  ],
  entryComponents: [
    AddComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    MatListModule
  ]
})
export class SettingModule {
}
