import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DurationRoutingModule} from './duration-routing.module';
import {DurationComponent} from './duration.component';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    DurationComponent
  ],
  imports: [
    CommonModule,
    DurationRoutingModule,
    MatCardModule,
    MatListModule,
    MatButtonModule
  ]
})
export class DurationModule {
}
