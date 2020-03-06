import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppointmentTypeRoutingModule} from './appointment-type-routing.module';
import {AppointmentTypeComponent} from './appointment-type.component';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {SettingModule} from '../../setting.module';


@NgModule({
  declarations: [
    AppointmentTypeComponent
  ],
  imports: [
    CommonModule,
    AppointmentTypeRoutingModule,
    MatTableModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    SettingModule
  ]
})
export class AppointmentTypeModule {
}
