import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EditpatientRoutingModule} from './editpatient-routing.module';
import {EditpatientComponent} from './editpatient.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {OwlDateTimeModule} from 'ng-pick-datetime';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    EditpatientComponent
  ],
  imports: [
    CommonModule,
    EditpatientRoutingModule,
    MatStepperModule,
    MatFormFieldModule,
    MatSelectModule,
    OwlDateTimeModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule
  ]
})
export class EditpatientModule {
}
