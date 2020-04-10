import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EditReceptionRoutingModule} from './edit-reception-routing.module';
import {EditReceptionComponent} from './edit-reception.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    EditReceptionComponent
  ],
  imports: [
    CommonModule,
    EditReceptionRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class EditReceptionModule {
}
