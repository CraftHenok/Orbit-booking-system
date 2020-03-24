import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReceptionhomepageRoutingModule} from './receptionhomepage-routing.module';
import {AppointmentsComponent} from '../../show/appointments/appointments.component';
import {CalendarModule} from 'angular-calendar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {ShowDoctorsComponent} from '../../show/appointments/show-doctors/show-doctors.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatRippleModule} from '@angular/material/core';
import {ReceptionhomepageComponent} from './receptionhomepage.component';
import {MatToolbarModule} from '@angular/material/toolbar';


@NgModule({
  declarations: [
    AppointmentsComponent,
    ShowDoctorsComponent,
    ReceptionhomepageComponent
  ],
  imports: [
    CommonModule,
    ReceptionhomepageRoutingModule,
    CalendarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonToggleModule,
    MatTableModule,
    MatRippleModule,
    MatToolbarModule
  ]
})
export class ReceptionhomepageModule {
}
