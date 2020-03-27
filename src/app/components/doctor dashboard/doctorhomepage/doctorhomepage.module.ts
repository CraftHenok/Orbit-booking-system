import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DoctorhomepageRoutingModule} from './doctorhomepage-routing.module';
import {DoctorhomepageComponent} from './doctorhomepage.component';
import {NavigationModule} from '../../navigation/navigation.module';
import {DoctorsappointmentComponent} from '../doctorsappointment/doctorsappointment.component';
import {CalendarModule} from 'angular-calendar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    DoctorhomepageComponent,
    DoctorsappointmentComponent
  ],
  imports: [
    CommonModule,
    DoctorhomepageRoutingModule,
    NavigationModule,
    CalendarModule,
    MatButtonToggleModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class DoctorhomepageModule {
}
