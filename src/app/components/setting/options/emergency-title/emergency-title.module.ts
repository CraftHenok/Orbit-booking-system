import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmergencyTitleRoutingModule} from './emergency-title-routing.module';
import {EmergencyTitleComponent} from './emergency-title.component';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {SettingModule} from '../../setting.module';


@NgModule({
  declarations: [
    EmergencyTitleComponent
  ],
  imports: [
    CommonModule,
    EmergencyTitleRoutingModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    SettingModule
  ]
})
export class EmergencyTitleModule {
}
