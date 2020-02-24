import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AddpatientRoutingModule} from './addpatient-routing.module';
import {AddpatientComponent} from './addpatient.component';
import {MatStepperModule} from '@angular/material/stepper';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {OwlDateTimeModule} from 'ng-pick-datetime';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AddpatientComponent
  ],
  imports: [
    CommonModule,
    AddpatientRoutingModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatAutocompleteModule,
    OwlDateTimeModule,
    MatSnackBarModule
  ]
})
export class AddpatientModule {
}
