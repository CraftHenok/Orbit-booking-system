import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DoctorsRoutingModule} from './doctors-routing.module';
import {DoctorsComponent} from './doctors.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {NumberToBoolean} from '../../customPipes/numberToBoolean/numberToBoolean';
import {NumberToBooleanModule} from '../../customPipes/numberToBoolean/number-to-boolean.module';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    DoctorsComponent
  ],
  imports: [
    CommonModule,
    DoctorsRoutingModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatPaginatorModule,
    MatButtonModule,
    NumberToBooleanModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class DoctorsModule {
}
