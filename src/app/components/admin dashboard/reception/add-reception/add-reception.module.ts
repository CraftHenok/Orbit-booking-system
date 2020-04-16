import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AddReceptionRoutingModule} from './add-reception-routing.module';
import {AddReceptionComponent} from './add-reception.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NgxSpinnerModule} from 'ngx-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AddReceptionComponent
  ],
  imports: [
    CommonModule,
    AddReceptionRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    NgxSpinnerModule,
    MatSnackBarModule
  ]
})
export class AddReceptionModule {
}
