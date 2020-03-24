import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminhomepageRoutingModule} from './adminhomepage-routing.module';
import {AdminhomepageComponent} from './adminhomepage.component';


@NgModule({
  declarations: [
    AdminhomepageComponent
  ],
  imports: [
    CommonModule,
    AdminhomepageRoutingModule
  ]
})
export class AdminhomepageModule {
}
