import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EditDoctorRoutingModule} from './edit-doctor-routing.module';
import {EditpatientComponent} from '../editpatient/editpatient.component';
import {EditdoctorComponent} from './editdoctor.component';
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
    EditdoctorComponent
  ],
  imports: [
    CommonModule,
    EditDoctorRoutingModule,
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
export class EditDoctorModule {
}
