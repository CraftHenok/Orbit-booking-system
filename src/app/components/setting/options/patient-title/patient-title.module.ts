import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PatientTitleRoutingModule} from './patient-title-routing.module';
import {PatientsComponent} from '../../../show/patients/patients.component';
import {PatientTitleComponent} from './patient-title.component';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    PatientTitleComponent
  ],
  imports: [
    CommonModule,
    PatientTitleRoutingModule,
    MatCardModule,
    MatListModule,
    MatButtonModule
  ]
})
export class PatientTitleModule {
}
