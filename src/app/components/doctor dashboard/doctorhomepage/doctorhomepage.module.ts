import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DoctorhomepageRoutingModule} from './doctorhomepage-routing.module';
import {DoctorhomepageComponent} from './doctorhomepage.component';


@NgModule({
  declarations: [
    DoctorhomepageComponent
  ],
  imports: [
    CommonModule,
    DoctorhomepageRoutingModule
  ]
})
export class DoctorhomepageModule {
}
