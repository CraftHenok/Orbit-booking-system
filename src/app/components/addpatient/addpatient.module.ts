import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AddpatientRoutingModule} from './addpatient-routing.module';
import {AddpatientComponent} from './addpatient.component';


@NgModule({
  declarations: [
    AddpatientComponent
  ],
  imports: [
    CommonModule,
    AddpatientRoutingModule
  ]
})
export class AddpatientModule { }
