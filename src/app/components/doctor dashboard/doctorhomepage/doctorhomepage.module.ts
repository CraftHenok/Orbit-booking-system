import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DoctorhomepageRoutingModule} from './doctorhomepage-routing.module';
import {DoctorhomepageComponent} from './doctorhomepage.component';
import {NavigationModule} from '../../navigation/navigation.module';


@NgModule({
  declarations: [
    DoctorhomepageComponent
  ],
  imports: [
    CommonModule,
    DoctorhomepageRoutingModule,
    NavigationModule
  ]
})
export class DoctorhomepageModule {
}
