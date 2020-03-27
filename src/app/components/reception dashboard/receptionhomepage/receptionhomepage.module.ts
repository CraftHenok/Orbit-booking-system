import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReceptionhomepageRoutingModule} from './receptionhomepage-routing.module';
import {CalendarModule} from 'angular-calendar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatRippleModule} from '@angular/material/core';
import {ReceptionhomepageComponent} from './receptionhomepage.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AppointmentsComponent} from '../appointments/appointments.component';
import {ShowDoctorsComponent} from '../appointments/show-doctors/show-doctors.component';
import {NavigationModule} from '../../navigation/navigation.module';


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
    MatToolbarModule,
    NavigationModule
  ]
})
export class ReceptionhomepageModule {
}
