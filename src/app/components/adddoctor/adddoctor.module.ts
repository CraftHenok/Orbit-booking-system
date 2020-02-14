import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdddoctorRoutingModule} from './adddoctor-routing.module';
import {AdddoctorComponent} from './adddoctor.component';


@NgModule({
  declarations: [
    AdddoctorComponent
  ],
  imports: [
    CommonModule,
    AdddoctorRoutingModule
  ]
})
export class AdddoctorModule {
}
