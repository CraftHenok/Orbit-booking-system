import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppointmentStatusRoutingModule} from './appointment-status-routing.module';
import {AppointmentStatusComponent} from './appointment-status.component';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    AppointmentStatusComponent
  ],
  imports: [
    CommonModule,
    AppointmentStatusRoutingModule,
    MatTableModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ]
})
export class AppointmentStatusModule {
}
