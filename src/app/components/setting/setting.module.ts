import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SettingRoutingModule} from './setting-routing.module';
import {SettingComponent} from './setting.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    SettingComponent,
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class SettingModule {
}
