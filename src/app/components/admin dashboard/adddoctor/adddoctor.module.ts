import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdddoctorRoutingModule} from './adddoctor-routing.module';
import {AdddoctorComponent} from './adddoctor.component';
import {MatStepperModule} from '@angular/material/stepper';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NgxSpinnerModule} from 'ngx-spinner';


@NgModule({
  declarations: [
    AdddoctorComponent
  ],
  imports: [
    CommonModule,
    AdddoctorRoutingModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatSnackBarModule,
    NgxSpinnerModule
  ]
})
export class AdddoctorModule {
}
